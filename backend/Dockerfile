FROM python:3

USER root

RUN apt-get update && \
    apt-get install apache2 -y

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
