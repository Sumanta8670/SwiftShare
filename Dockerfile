FROM eclipse-temurin:21-jre
WORKDIR /app
COPY SwiftShare-Backend/target/SwiftShare-0.0.1-SNAPSHOT.jar swiftshare.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "swiftshare.jar"]