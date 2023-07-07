# =================== base stage ===================
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# =================== production stage ===================
FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . ./
CMD ["node", "app.js"]

# =================== development stage ===================
FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . ./
CMD ["nodemon", "app.js"]
