FROM node

LABEL version="1.0"
LABEL description="This is the base docker image for nodejs react application."
LABEL maintainer = ["ishishov@redhat.com"]

WORKDIR /app

ENV PORT=8080 \
    SERVICE_HOST="192.168.49.2" \
    SERVICE_PORT="32384"

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["node", "server/index.js"]