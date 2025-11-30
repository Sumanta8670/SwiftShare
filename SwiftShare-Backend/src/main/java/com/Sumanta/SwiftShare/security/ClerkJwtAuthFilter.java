package com.Sumanta.SwiftShare.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    private final ClerkJwksProvider jwksProvider;

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip authentication for webhook endpoints
        if (request.getRequestURI().contains("/webhooks") || request.getRequestURI().contains("/public") || request.getRequestURI().contains("/download")) {
            log.debug("Skipping JWT authentication for webhook endpoint: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return; // ✅ ADDED RETURN STATEMENT
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Authorization header missing or invalid for URI: {}", request.getRequestURI());
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Authorization header missing/invalid");
            return;
        }

        try {
            String token = authHeader.substring(7);
            String[] chunks = token.split("\\.");
            if (chunks.length < 3) {
                log.error("Invalid JWT token format");
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid JWT token format");
                return;
            }

            String headerJson = new String(Base64.getUrlDecoder().decode(chunks[0]));
            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);

            if (!headerNode.has("kid")) {
                log.error("Token header is missing kid");
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token header is missing kid");
                return;
            }

            String kid = headerNode.get("kid").asText();
            PublicKey publicKey = jwksProvider.getPublicKey(kid);

            Claims claims = Jwts.parser()
                    .setSigningKey(publicKey)
                    .setAllowedClockSkewSeconds(60)
                    .requireIssuer(clerkIssuer)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String clerkId = claims.getSubject();
            log.debug("Successfully authenticated user with clerkId: {}", clerkId);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            clerkId,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
                    );

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT authentication failed: ", e);
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid JWT token: " + e.getMessage());
        }
    }
}