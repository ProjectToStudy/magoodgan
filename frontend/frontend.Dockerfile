FROM node:16

COPY . /nextjs
WORKDIR /nextjs

ENV NEXT_PUBLIC_API_URL=https://magoodgan.cf/api/v1/

RUN npm install

EXPOSE 3000

CMD npm run dev
