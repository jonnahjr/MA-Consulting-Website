FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --silent || true
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/index.js"]
