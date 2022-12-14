FROM python:3

USER root

RUN mkdir -p /home/guest/authentication/backend
WORKDIR /home/guest/authentication/backend

RUN apt-get update && \
    apt-get install apache2 -y

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

# RUN pip install pyOpenSSL --upgrade
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# RUN cd /home/guest/authentication/backend && \
#     alembic upgrade head
