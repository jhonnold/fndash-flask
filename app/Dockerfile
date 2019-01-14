FROM python:3.7.1
LABEL maintainer "Jay Honnold <jayhonnold@gmail.com>"

RUN apt-get update

WORKDIR /usr/share/fn-dash/app
ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .