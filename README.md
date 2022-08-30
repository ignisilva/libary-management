# 도서관 관리 토이 프로젝트

인턴 과정을 진행하며 개발했던 도서관 관리 토이 프로젝트 결과물 입니다.

## About The Project

도서관 관리 관련 REST API 및 Graphql 기반의 서버를 개발했습니다.

Koa로 REST API를 구현했으며, Apollo-Server로 Graphql을 개발했습니다.

Kafka를 사용하여 비동기 요청에 대해(메일 전송) 처리했습니다.

## 서비스 구성

제공하는 도서관 관리 기능은 아래와 같습니다.

- 인증

  - 로그인 (access/refresh token 발급)
  - 토큰 재발급(access token 재발급)
  - 로그아웃 (refresh token 삭제)

- 사용자

  - 회원 정보 생성 (회원 가입)
  - 회원 정보 가져오기
  - 회원 정보 (목록) 가져오기
  - 회원 정보 수정
  - 회원 정보 삭제

- 도서

  - 도서 정보 생성
  - 도서 정보 가져오기
  - 도서 정보 (목록) 가져오기
  - 도서 정보 수정
  - 도서 정보 삭제

- 대여

  - 도서 대여 정보 생성 (대여, 연장, 반납)
  - 도서 대여 정보 가져오기
  - 도서 대여 정보 (목록) 가져오기
  - 도서 대여 정보 수정
  - 도서 대여 정보 삭제

- 예약

  - 도서 예약 정보 생성
  - 도서 예약 정보 가져오기
  - 도서 예약 정보 (목록) 가져오기
  - 도서 예약 정보 수정
  - 도서 예약 정보 삭제

- 메일 전송
  - 도서 대여시, 예정 반납일 메일 안내
  - 도서 연장시, 예정 반납일 메일 안내

## ERD 구성

dbdiagram.io으로 ERD를 작성했습니다.

[ERD 링크](https://dbdiagram.io/d/62677d8595e7f23c61716ec0)

## 기술 스택

- Javascript
- Koa
- Apollo-Server
- Sequelize
- PostgreSQL
- Kafka
- Docker
- CloudERD
- Postman
