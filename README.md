![logo](https://image.ibb.co/g69ZDx/682111_cloud_512x512.png)

# 5-Day Weather Forecast

A simple application to display 5-day weather forecast of a city using the OpenWeatherMap API. .

### Demo

https://weather-try-app.netlify.app/

## Pre-requisites

- Node.js 9.8.0 and above

## Run

```
git clone
cd WeatherApp
npm i
```

## Start the dev server

```

npm run start:dev

```

## Build

```

npm run build

```

#### Notes:

- Unit testing can be done manually by executing the above command.
- It will be done automatically prior committing the updates to the repo as a pre-commit hook.

### TODOs

- [ ] Provide an option for user to choose location of their choice by Name, Lat/Long etc
- [ ] Unit testing
- [ ] Identify and address edgecases.
- [ ] Revisit the code to improve performance. Such as sorting, looping, searching etc.
- [ ] Detect location automatically
- [ ] Display hourly forecasts.
- [ ] Add an option to choose Units in either Metric or Imperial.
- [ ] Fix lint issues and config the eslintrc to support "no-vars-used" for Imports
- [ ] Better and more functional UI
- [ ] Prevent fetching new data on every refresh by caching the data for a set duration of session.

### Tech Stack

- React.js
- JavaScript (ES6)
- HTML5
- css
