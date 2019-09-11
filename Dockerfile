#############
### build ###
#############

# base image
FROM node:12.2.0 as build

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

# add app
COPY . /app

# run tests
RUN node_modules/.bin/ng lint
RUN node_modules/.bin/ng test --watch=false --browsers=ChromeHeadlessNoSandbox

# generate build
RUN ng build --prod

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy artifact build from the 'build environment'
COPY --from=build /app/dist/mastermind /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
