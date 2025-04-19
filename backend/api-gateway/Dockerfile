FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Copy the fat jar produced by Maven/Gradle
COPY target/api-gateway-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
