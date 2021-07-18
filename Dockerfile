FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --force
COPY . /usr/src/app
EXPOSE 3000
RUN npm run-script build
RUN npm install -g serve
CMD ["serve","-s","build"]