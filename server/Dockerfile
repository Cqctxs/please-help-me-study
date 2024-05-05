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

RUN apt install curl

# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

# Installing the package
RUN mkdir -p /usr/local/gcloud \
  && tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz \
  && /usr/local/gcloud/google-cloud-sdk/install.sh

# Adding the package path to local
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

# RUN /root/google-cloud-sdk/bin/gcloud auth activate-service-account lostcactus@please-help-me-study.iam.gserviceaccount.com --key-file=/sa-private-key.json && \
#     /root/google-cloud-sdk/bin/gcloud config set project please-help-me-study

# Starting our application
CMD [ "node", "index.js", "--host", "0.0.0.0", "--port", "3000"]