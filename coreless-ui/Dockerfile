FROM node

LABEL version="1.0"
LABEL description="This is the base docker image for nodejs react application."
LABEL maintainer = ["ishishov@redhat.com"]

WORKDIR /app

ENV PORT=0 \
    SERVICE_HOST= \
    SERVICE_PORT=

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["node", "server/index.js"]