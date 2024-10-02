
FROM node:18


WORKDIR /user


COPY package*.json ./


COPY prisma ./prisma
RUN npx prisma generate


COPY . .


EXPOSE 9000

CMD ["npm", "run", "dev"]
