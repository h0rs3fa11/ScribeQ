# ScribeQ

A full-stack blog platform

tech stack: NodeJS, Express, MongoDB, React, Redux, Bootstrap

## package

```
cd client/ && npm install && cd ../server && npm install
```

## env

Create a `.env` file inside `server/`, with the following environment variables:
```
PORT=XXXX
TEST_MONGODB_URI=XXX
MONGODB_URI=PRODUCTION_URL
SECRET=XXX
```

## build

```
npm run build:ui
npm run start
```

## dev mode

server:

```
cd server
npm run dev
```

front end:
```
cd client
npm run dev
```

## tests
