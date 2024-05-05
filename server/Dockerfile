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

RUN apt-get -y update; apt-get -y install curl

# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-cli -y


# RUN /root/google-cloud-sdk/bin/gcloud auth activate-service-account lostcactus@please-help-me-study.iam.gserviceaccount.com --key-file=/sa-private-key.json && \
#     /root/google-cloud-sdk/bin/gcloud config set project please-help-me-study

# Starting our application
CMD [ "node", "index.js", "--host", "0.0.0.0", "--port", "3000"]