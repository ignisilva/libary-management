# internship

Barogo internship project

### Docker 설치

- 현재(2020-07-23 기준) Production에서 사용하고 있는 Docker engine의 버전은 `v18.09.9` 입니다.
- 따라서 로컬에서 개발할 때에도 동일한 버전을 설치하는 것을 권장합니다.
- 위 내용은 이전에 작성된 내용으로 현재 사내에서 docker destop 유료정책에 대하여 알아보고 따로공유드리겠습니다.
- [최신 Docker Desktop Download](https://download.docker.com/mac/stable/Docker.dmg)
- [Docker engine Release Note](https://docs.docker.com/engine/release-notes/18.09/)

### Docker Compose 설치
운영 환경과는 별개로 로컬 개발 환경의 편의성을 위해 Docker Compose 설치를 권장한다.

> To run Compose as a non-root user, see [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

#### On macOS

> On desktop systems like Docker Desktop for Mac and Windows, Docker Compose is included as part of those desktop installs.

##### Alternative Install Options
```bash
brew install docker docker-compose
```

#### On Linux

> On Linux systems, first install the Docker Engine for your OS as described on the Get Docker page, then come back here for instructions on installing Compose on Linux systems.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

### Docker container 실행

소스를 받은 위치에서 다음을 실행

```bash
cd docker
docker-compose up -d --build

#  application 를 제외한 db 등 infra 만 올려야 되는 경우
docker-compose up -d --build kafka postgres

#  특정 container stop
docker-compose rm --stop auth
```

> [Docker kafka 관련 이슈] ~~`docker stop $(docker ps -a -q)`~~ 명령어 사용시 간헐적으로 kafka container 로드 안 되는 현상

  - 문제확인

    1. `zookeeper`와 `kafka` 간의 타이밍 문제가 발생하여 간혹 kafka container가 로드 되지 못 하는 현상 발생
    2. 기존 실행 되어 있던 container를 재빌드 하거나, stop후 재빌드 하면 간간히 발생함. `docker stop`명령어 사용 시

  - 해결방안:
    관련 내용 : https://github.com/wurstmeister/kafka-docker/issues/389
    - 관련된 내용이 있지만 현실적으로 좋은 방안이 아니어서 배제.
    - `docker stop` 대신  `docker-compose rm -svf`  명령어를 사용하여 container를 내리면 문제 발생하지 않음.
    - `kafka`와 `zookeeper`를 계속 재빌드 하지 않고 필요한 컴포넌트 만 빌드해서 올리면 문제 발생하지 않음.
    - 모든 이미지 삭제 후 처음부터 재빌드 해도 문제 발생하지 않음.

  - 결론 :
    - 뚜렷한 해결 방안이 없는 것으로 판단.
    - `docker stop`  명령어를 사용하지 않으면 전체적으로 실행되는데 이상 없어 보임. 해당 명령어를 사용하지 않는 것으로 결론

  ```bash
  # docker container를 내리는 방법은 여러가지가있으나, 어차피 재빌드를 할생각이라면

  docker-compose rm -svf  # 이 방법을 사용하는 편이 좋음(docker-compose에 작성된 container 전체 삭제)
  docker-compose up -d --build mobileapiredoc mobileapi    # 혹은 이렇게 특정 컴포넌트 만 재빌드 한다면 해당 이슈 발생하지 않음.
  ```


