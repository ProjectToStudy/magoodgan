### 컨벤션 및 제한사항

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
   1. 

### Docker 세팅
1. `docker for Mac`을 설치합니다.
   - `docker version` 및 `docker-compose version` 입력하여 정상적으로 설치됐는지 확인합니다.
   - 보통 `docker for Mac` 설치 시, `docker-compose`까지 같이 설치되지만, 혹시 누락됐을 경우 추가 설치가 필요합니다.
2. `docker compose up`을 입력하여 서버가 정상적으로 구동되는지 확인 바랍니다.
    - dashboard의 Containers/App에서 `magoodgan`이 생성됐는지 확인해 주세요.
    - dashboard의 Images에서 `magoodgan_django` 및 `magoodgan_next.js`가 생성됐는지 확인해 주세요.

### 주의 사항
1. `Django`의 경우, 필요한 라이브러리는 자유롭게 설치해 주세요. 단, 모든 dependency는 `poetry`로 관리해야 합니다.
2. 항상 `commit` 전에 `docker-compose up`을 입력하여 서버가 정상적으로 구동되는지 확인해 주세요.