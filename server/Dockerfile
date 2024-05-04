# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production

# Copying all the files in our project
COPY . ./

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "index.js", "--host", "0.0.0.0", "--port", "3000"]
