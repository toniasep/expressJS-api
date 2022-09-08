FROM node:18.7.0
RUN mkdir app/
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3030
CMD node .
