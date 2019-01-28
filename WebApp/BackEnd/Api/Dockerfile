FROM alpine:3.8

WORKDIR /app/Api/

ADD . /app/Api/

RUN apk add --update nodejs nodejs-npm python make g++ && npm install

EXPOSE 8081

CMD ["npm", "start"]