FROM node:16

COPY . /nextjs
WORKDIR /nextjs

RUN npm install

CMD npm run dev