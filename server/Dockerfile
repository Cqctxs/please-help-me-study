# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

RUN curl -sSL https://sdk.cloud.google.com | bash

ENV PATH $PATH:/root/google-cloud-sdk/bin

RUN gcloud auth activate-service-account lostcactus@please-help-me-study.iam.gserviceaccount.com --key-file=/app/sa-private-key.json

RUN gcloud config set project please-help-me-study

# Starting our application
CMD [ "node", "index.js", "--host", "0.0.0.0", "--port", "3000"]