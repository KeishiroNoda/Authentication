FROM node:18-alpine

WORKDIR /home/guest/authentication/frontend

COPY . .
RUN yarn install \
    && yarn build \
    && npm install -g serve

CMD ["bash"]