FROM node:14.17

# Create app directory
WORKDIR /usr/src/app

# copy deps
COPY package.json yarn.lock ./

# install deps
RUN yarn install

# copy app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev" ]
