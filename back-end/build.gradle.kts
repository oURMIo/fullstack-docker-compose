import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.3.0-SNAPSHOT"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
}

group = "com.home"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
    maven { url = uri("https://repo.spring.io/snapshot") }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.2.5")
    implementation("org.springframework.boot:spring-boot-devtools:3.2.5")

    implementation("com.h2database:h2:2.2.224")
    implementation("mysql:mysql-connector-java:8.0.33")
    implementation("javax.persistence:javax.persistence-api:2.2")
    implementation("org.springframework:spring-tx:6.1.6")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.24")

    implementation("org.slf4j:slf4j-api:2.0.13")
    implementation("io.github.microutils:kotlin-logging:3.0.5")

    testImplementation("org.springframework.boot:spring-boot-starter-test:3.2.5")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "21"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
