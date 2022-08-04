FROM node:16-alpine

WORKDIR /app

COPY app/package.json .
COPY app/package-lock.json .
COPY app/tsconfig.json .

RUN npm i

RUN npm install --dev tsconfig-paths tscpaths

COPY app/src/ src/

ENV NODE_PATH=./build

RUN npm run build

CMD ["npm", "start"]