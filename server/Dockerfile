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

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg && apt-get update -y && apt-get install google-cloud-sdk -y

# Starting our application
CMD [ "node", "index.js", "--host", "0.0.0.0", "--port", "3000"]