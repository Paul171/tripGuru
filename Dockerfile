FROM node:9
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN rm -rf node_modeules/
# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN echo $NODE_ENV
EXPOSE 8000
CMD ["yarn", "start"]