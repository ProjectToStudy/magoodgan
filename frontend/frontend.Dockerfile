FROM node:16

COPY . /nextjs
WORKDIR /nextjs

RUN npm install

EXPOSE 3000

CMD npm run dev