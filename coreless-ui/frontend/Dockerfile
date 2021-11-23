FROM quay.io/bitnami/node

RUN cd /home
RUN mkdir coreless-ui
WORKDIR /home/coreless-ui 
ADD . /home/coreless-ui/
CMD ["npm", "start"]