FROM node:20.13.1-alpine

WORKDIR /front-end
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]