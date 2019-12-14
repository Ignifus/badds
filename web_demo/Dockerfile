FROM python:3.7

WORKDIR /usr/src/web

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED 1

ENTRYPOINT ["./entrypoint.sh"]
