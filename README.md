# '이문세의 마굿간' 개발 프로젝트

## 프로젝트 개요

### 프로젝트 기간

- 2022.06 ~

### 프로젝트 목적

- 팬클럽 플랫폼 리뉴얼

### 프로젝트 참여자

- Frontend: [김시아](https://github.com/kim-sia)
- Backend: [정미리](https://github.com/jeongmiri)
- Designer: 전한얼

## 개발환경

### 기술 스택

- Python: 3.9.11
- Node: 16
- Framework: Django, Next.js
- Django의 경우, 패키지 관리 도구로 [poetry](https://python-poetry.org/) 를 사용합니다.

### 프로젝트 구성

1. Django
   1. 파이썬 3.9.11 환경 구성 (poetry, pyenv, virtualenv, ...)
      - pycharm에서 poetry를 지원합니다.
   2. 패키지 설치 (`poetry install`)

2. Next.js
   1. 패키지 설치 (`npm intall`, `yarn install`)

### 프로젝트 실행
- `docker compose up`을 입력하여 서버가 정상적으로 구동되는지 확인 바랍니다.
    - dashboard의 Containers/App에서 `magoodgan`이 생성됐는지 확인해 주세요.
    - dashboard의 Images에서 `django` 및 `next`, `nginx`가 생성됐는지 확인해 주세요.
