# 도서관 관리 토이 프로젝트

인턴 과정을 진행하며 개발했던 도서관 관리 토이 프로젝트 결과물 입니다.

## About The Project

도서관 관리 관련 REST API 및 Graphql 기반의 서버를 개발했습니다.

Koa로 REST API를 구현했으며, Apollo-Server로 Graphql을 개발했습니다.

Kafka를 사용하여 비동기 요청에 대해(메일 전송) 처리했습니다.

## ERD 구성

dbdiagram.io으로 ERD를 작성했습니다.

[ERD 링크](https://dbdiagram.io/d/62677d8595e7f23c61716ec0)


# 도서관 관리 서비스 백엔드 프로젝트 

|👉 목차||
|---|---|
|[1. 기술 스택](#기술-스택)| 해당 프로젝트에서 사용된 기술 스택 |
|[2. 도서관 관리 서비스 개요](##도서관-관리-서비스-개요)| 서비스에 대한 간략한 설명|
|[3. 제공 기능 상세](#제공-기능-)| 제공하는 기능에 대한 상세 내역 및 API 문서|
|[4. 구현 과정](#구현-과정)| 모델링, 고민했던 포인트|

# 기술 스택
<div align=center> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/koa-33333D?style=for-the-badge&logo=koa&logoColor=white">
  <img src="https://img.shields.io/badge/apollo-graphql-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white">
  <br>  

  <img src="https://img.shields.io/badge/postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=white"> 
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/apachekafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"> 
  <br>
</div>

# 도서관 관리 서비스 개요

오프라인으로 운영되는 도서관의 관리 서비스 백엔드 프로젝트입니다.

해당 서비스에서 제공하는 기능은 간략하게 다음과 같습니다.
- 도서관 이용자에 대한 관리
- 도서관 내 도서 정보에 대한 관리
- 도서 대여 및 예약에 대한 관리

# 제공 기능 상세

## 인증
  - 로그인 (access/refresh token 발급)
  - 토큰 재발급(access token 재발급)
  - 로그아웃 (refresh token 삭제)

## 사용자

  - 회원 정보 생성 (회원 가입)
  - 회원 정보 가져오기
  - 회원 정보 (목록) 가져오기
  - 회원 정보 수정
  - 회원 정보 삭제

## 도서

  - 도서 정보 생성
  - 도서 정보 가져오기
  - 도서 정보 (목록) 가져오기
  - 도서 정보 수정
  - 도서 정보 삭제

## 대여

  - 도서 대여 정보 생성 (대여, 연장, 반납)
  - 도서 대여 정보 가져오기
  - 도서 대여 정보 (목록) 가져오기
  - 도서 대여 정보 수정
  - 도서 대여 정보 삭제

## 예약

  - 도서 예약 정보 생성
  - 도서 예약 정보 가져오기
  - 도서 예약 정보 (목록) 가져오기
  - 도서 예약 정보 수정
  - 도서 예약 정보 삭제

## 메일 전송
  - 도서 대여시, 예정 반납일 메일 안내
  - 도서 연장시, 예정 반납일 메일 안내

## API 명세서

Postman을 사용하여 제작한 API Docs

[👉 Swagger Docs 바로가기](https://app.swaggerhub.com/apis-docs/preonboarding/blog-api-service/1.0)

# 구현 과정 

## 환경 세팅

### 모델링

> 데이터베이스는 AWS LightSail로 생성했습니다.(RDS, PostgreSQL) 

![모델링](https://user-images.githubusercontent.com/63445753/188299953-62432aae-8f5d-4876-8b26-0169015c05cf.png) 

### 폴더 구조
```
project/
├─ src/
│  ├─ users/
│  ├─ posts/
│  ├─ auth/
│  ├─ statistics/
│  ├─ commons/
│  ├─ database/
│  ├─ filters/
│  ├─ interceptors/
│  ├─ redis/
├─ app.controller.ts
├─ app.module.ts
├─ app.service.ts
├─ main.ts
```

- users, posts, auth, statistics 폴더를 다누고, DTO 및 Entity를 작성하여 테이블 생성  
각 폴더에 module, controller, service, dto, entity 가 정의되어 있음  
각 module Emfdmf app.module에서 통합  
  
- commons : 모든 서비스에서 공용으로 사용하는 decorator, enum 등을 저장

- filters: 예외 필터 적용

- interceptors: response type 적용

- redis: cache memory 연결

