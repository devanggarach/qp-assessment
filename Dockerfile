FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3900

RUN npx prisma generate
RUN npm run build
CMD ["npm", "run", "start:prod"]
