# Build Step
FROM maven:3.9.7-amazoncorretto-17 AS build
WORKDIR /server
COPY pom.xml .
RUN mvn dependency:resolve
COPY src ./src
RUN mvn clean install -DskipTests

# Runtime Step
FROM amazoncorretto:17-alpine3.17
LABEL MAINTAINER="aleo62"
WORKDIR /usr/src/app
COPY --from=build /server/target/*.jar /usr/src/app/server.jar

ENTRYPOINT ["java", "-Dfile.encoding=UTF-8", "-jar", "/usr/src/app/server.jar"]
