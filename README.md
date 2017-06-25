# appimoo

> A cross-platform, minimalistic anime wallpaper app with cleverness baked in.

## Build Setup

``` bash
# install dependencies
npm install

# create environment config file
cp example.env .env

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run eslint
npm run lint:js

# run stylelint
npm run lint:scss

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Notes
Before each push make sure to run `npm run lint` at the minimum, ideally `npm run test`, and fix up any errors/warnings encountered.
