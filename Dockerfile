FROM node:18-alpine

COPY . .

RUN npm install && npm run build

EXPOSE 1234

ENV PORT=1234

CMD ["npm", "run", "start"]
