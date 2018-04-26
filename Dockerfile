FROM node:9
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN rm -rf node_modeules/
RUN npm i -g yarn
RUN yarn install
CMD ["yarn", "start"]