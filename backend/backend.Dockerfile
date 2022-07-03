FROM python:3.9

COPY . /backend
WORKDIR /backend

RUN pip install poetry

RUN poetry install --no-dev

CMD poetry run python manage.py runserver 0.0.0.0:8000