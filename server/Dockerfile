FROM node:12

EXPOSE 8000

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install

CMD ["node", "index.js"]
