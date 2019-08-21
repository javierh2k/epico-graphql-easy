FROM node:10-alpine
RUN apk --update --no-cache add python make g++ tzdata bash \
    && cp /usr/share/zoneinfo/America/Bogota /etc/localtime \
    && echo "America/Bogota" > /etc/timezone \
    && apk del tzdata

WORKDIR    /app
COPY       package.json .
COPY       package-lock.json .
RUN        npm ci
COPY       . .

COPY .env.example .env

COPY wait.sh /
RUN ["chmod", "+x", "/wait.sh"]
CMD /wait.sh db:3306 -- npm start
