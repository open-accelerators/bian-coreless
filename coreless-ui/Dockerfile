FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for nodejs react application."
LABEL maintainer = ["ishishov@redhat.com"]

WORKDIR /app

ENV PORT=0 \
    CO_SERVICE_HOST= \
    CO_SERVICE_PORT= \
    PRP_SERVICE_HOST= \
    PRP_SERVICE_PORT=

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY ["./frontend/package.json", "./frontend/package-lock.json", "./frontend"]

RUN npm --prefix ./frontend install

COPY . .

RUN npm --prefix ./frontend run build

EXPOSE ${PORT}

CMD ["node", "server/index.js"]