FROM python:3.9

COPY . /backend
WORKDIR /backend

RUN pip install poetry

RUN poetry install --only main

EXPOSE 8000

CMD python3 manage.py collectstatic
CMD poetry run gunicorn --bind 0.0.0.0:8000 config.wsgi:application