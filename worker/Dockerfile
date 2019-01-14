FROM python:3.7.1
LABEL maintainer "Jack Sommer <jack.somm1@gmail.com>"

RUN apt-get update

WORKDIR /usr/share/fn-dash/worker
ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .