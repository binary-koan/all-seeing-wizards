# Run in context .. (base directory)
FROM node:10
ADD . /code
WORKDIR /code
RUN yarn install
WORKDIR /code/api
CMD ["yarn", "start"]
EXPOSE 3000
