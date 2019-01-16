FROM python:3.6
LABEL maintainer "Jay Honnold <jayhonnold@gmail.com>"

RUN apt-get update && \
    apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install nodejs -y && \
    node -v && npm -v
RUN npm install -g postcss-cli autoprefixer

WORKDIR /usr/share/fn-dash

ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN /bin/sh util/download-foundation.sh