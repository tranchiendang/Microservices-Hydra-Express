FROM node:9
# Create app directory
WORKDIR /usr/src/service-app
# Independent adding package.json to leverage docker cache layer
COPY package*.json ./
# Install dependency
RUN npm install
# Bundle service app source code
COPY . .
# Expose service app port
EXPOSE 3000
# Runtime
CMD ["npm", "start"]
