FROM nginx
COPY public /usr/share/nginx/html

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install http-server -g

RUN npm install && npm run build

CMD http-server ./dist
