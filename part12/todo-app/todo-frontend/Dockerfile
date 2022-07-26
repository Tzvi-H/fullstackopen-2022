FROM node:16-alpine AS test-stage

WORKDIR /usr/src/app
COPY . .
RUN npm install && CI=true npm run test

FROM test-stage as build-stage
COPY . .
ENV REACT_APP_BACKEND_URL=http://localhost:3001/
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
