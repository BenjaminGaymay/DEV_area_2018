FROM phpmyadmin/phpmyadmin

WORKDIR /app/Api

ADD . /app/Api

RUN apk add --update nodejs nodejs-npm && npm i --only=prod

EXPOSE 8080

CMD npm run start