FROM eclipse-temurin:21-jre
WORKDIR /app
ENTRYPOINT ["top", "-b"]