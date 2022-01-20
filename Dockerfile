ARG TAG=16-alpine
FROM node:$TAG

WORKDIR /app

CMD ["run build"]

ENTRYPOINT ["yarn"]