# 도서관 프로젝트

## Get Started

### Postman API 문서

- [API 문서 바로가기](https://documenter.getpostman.com/view/17715275/UyxhnSnN)

### 프로젝트 실행 (개발 모드 실행)

1. docker 실행

- ~/internship/docker 경로로 이동
- docker-compose.yml 실행 ($ docker-compose up -d --build)

2. dev.env 파일 설정

- ~/internship/backend/hareem/.env.example을 복사
- ~/hareem/dev.env 생성
- dev.env 내부 환경 변수를 상황에 맞게 수정
  - 현재 22/05/18 기준 dev.env 환경은 아래와 같습니다

    ```
      // dev.env
      PORT=3001

      DB_USERNAME="intern"
      DB_PASSWORD="intern"
      DB_NAME="intern"
      DB_HOST="127.0.0.1"
      DB_PORT=6432
      DB_DIALECT="postgres"

      JWT_ACCESS_TOKEN_SECRET_KEY="intern_access"
      JWT_ACCESS_TOKEN_EXPIRES_IN=600000
      JWT_REFRESH_TOKEN_SECRET_KEY="intern_refresh"
      JWT_REFRESH_TOKEN_EXPIRES_IN=1200000
    ```

3. npm 패키지 설치

- ~internship/backend/hareem 이동
- 패키지 설치 ($ npm install)

4. 서버 실행

- $ npm run start:dev

### docker-compose 를 활용한 프로젝트 실행

1. postgres 실행

- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build internship-postgres

2. sequelize-cli를 사용해 schema생성 및 table migrate

- ~/internship/backend/hareem 경로로 이동
- $ npx sequelize-cli db:create
- $ npx sequelize-cli db:migrate

3. 나머지 컨테이너 실행

- ~/internship/docker 경로로 이동
- $ docker-compose up -d --build
