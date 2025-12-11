FROM node:20-alpine

RUN npm install -g pnpm serve

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

