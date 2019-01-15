FROM python:3.7.1
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

RUN cd app/static && \
    curl https://codeload.github.com/zurb/foundation-sites/tar.gz/v6.5.1 | tar xvz && \
    cd ../..