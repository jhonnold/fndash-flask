FROM python:3.6
LABEL maintainer "Jay Honnold <jayhonnold@gmail.com>"

WORKDIR /usr/share/fn-dash

ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .