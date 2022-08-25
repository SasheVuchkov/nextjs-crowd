FROM node:latest

WORKDIR /nextjs-crowd

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install
RUN npm run build-job
RUN npm run build

CMD npm run combo-start