FROM node:16
WORKDIR /app
ARG ENV
ADD package.json /app
RUN npm install
ADD . /app

RUN mv $ENV.env .env

RUN npx next build
RUN rm -f .env.local
EXPOSE 80
CMD ["npx", "next", "start", "-p","80"]
