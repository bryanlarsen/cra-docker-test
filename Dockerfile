# pull official base image
FROM node:10-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["sh", "-c", "echo '34.69.6.250 mythreekit.com' >> /etc/hosts && echo '34.69.6.250 clara.io' >> /etc/hosts && yarn start"]
