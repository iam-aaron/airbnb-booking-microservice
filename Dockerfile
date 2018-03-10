FROM node:latest
ADD . /app
WORKDIR /app
RUN npm install
EXPOSE 3003
CMD [ "npm", "start"]