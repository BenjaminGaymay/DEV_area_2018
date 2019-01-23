FROM alpine:3.8

WORKDIR /app/Client

ADD . /app/Client/

RUN apk add --update nodejs nodejs-npm python make g++ && npm install

EXPOSE 8081

CMD ["npm", "start"]