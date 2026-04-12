# RescuePaws

# Project Overview

RescuePaws is a full-stack microservices-based platform designed to manage stray dog reporting, tracking, and rescue operations.

It enables users to:

Report stray dogs with location + images
View all reported dogs in real time
Update dog status (found / picked up)
Authenticate securely using JWT
Access system through a centralized API Gateway

The system is fully containerized using Docker and designed with scalable microservices architecture.

## System Architecture

``` 

                    ┌────────────────────┐
                    │   Next.js Frontend │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │   NGINX Proxy      │
                    │ Load Balancer + RL │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  API Gateway       │
                    │ Spring Cloud GW    │
                    └──────  ─┬────────────┘
                              |
                ┌───────────────────────────────┐
                ▼                               ▼
         ┌────────────────┐           ┌────────────────┐
         │ Auth Service   │           │ Dog Service    │
         └──────┬─────────┘           └──────┬─────────┘
                ▼                            ▼
              auth_db                  dog_service_db

               └────── MySQL (Docker Volume) ──────┘


```




---

### Frontend (Next.js)

- User interface built with Next.js + React
- Communicates with backend via API Gateway
- Runs on:
http://localhost:3000

---

###  NGINX

- Reverse proxy for routing requests
- Load balancing between API Gateway instances
- Simple rate limiting for API protection

---

###  API Gateway (Spring Cloud Gateway)

- Single entry point for all backend services
- Routes requests:

/auth/**      → Auth Service  
/api/dogs/**  → Dog Service  

- Handles:
  - JWT authentication validation
  - Request routing
  - User context propagation via headers

---

###  Auth Service (Spring Boot)

- User authentication & registration
- JWT token generation & validation
- Database: auth_db (MySQL)

---

###  Dog Service (Spring Boot)

- Dog reporting system (CRUD operations)
- Image upload support (Cloudinary)
- Database: dog_service (MySQL)

---

### Database (MySQL - Docker)

- MySQL 8 running in Docker containers
- Persistent storage using Docker volumes
- Each service has its own database

---

## ⚙️ Tech Stack

### Frontend
- Next.js
- react-toastify (notifications)
- React Query (Cash)

### Backend
- Spring Boot 
- Spring Cloud Gateway
- Spring Security + JWT
- Hibernate / JPA

### Database
- MySQL 8

### DevOps
- Docker
- Docker Compose
- NGINX (Load Balancer + Rate Limiting)

---

##  Features

- Microservices architecture
- JWT authentication & security
- API Gateway routing
- NGINX reverse proxy
- Load balancing support
- Simple Rate limiting protection
- Dockerized system
- Image upload (Cloudinary)
- Scalable backend design


# ⚙️ Environment Configuration

### api-gateway

```
spring.datasource.url=jdbc:mysql://mysql:3306/auth_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}

```


### auth-service

```
spring.datasource.url=jdbc:mysql://mysql:3306/auth_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}

```


### dog_service

```

spring.datasource.url=jdbc:mysql://mysql:3306/dog_service?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC

jwt.secret=${JWT_SECRET}

cloudinary.cloud_url=${CLOUDINARY_URL}
cloudinary.cloud_name=${CLOUDINARY_NAME}
cloudinary.api_key=${CLOUDINARY_KEY}
cloudinary.api_secret=${CLOUDINARY_SECRET}

```


## Docker Setup

### Run Project

```
docker-compose up --build

```


### Stop Project

```
docker-compose down

```


### Reset Everything
```
docker-compose down -v

```


<img width="1792" height="592" alt="Gemini_Generated_Image_ar2y52ar2y52ar2y" src="https://github.com/user-attachments/assets/f9c8452f-7dc3-434c-9161-cce2c3f41c6c" />










