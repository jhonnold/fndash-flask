FROM python:3.6
LABEL maintainer "Jay Honnold <jayhonnold@gmail.com>"

WORKDIR /usr/share/fn-dash

RUN apt-get update && \
    apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install nodejs -y && \
    npm install -g yarn

ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN cd app/web && \
    yarn && \
    yarn build && \
    cd ../..