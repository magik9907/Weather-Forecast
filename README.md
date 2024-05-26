# WeatherForecast

## Requirements

- **API KEY** from https://openweathermap.org
- [Docker](https://www.docker.com) or [NodeJS](https://nodejs.org/en)

## Run as development server
1. Install NodeJS
2. In [./src/env/env.dev.ts](./src/env/env.dev.ts) replace `<API_KEY>` with your api key from https://openweathermap.org
3. From root folder of project run in terminal: `npm install`
4. Run `npm run start` for start a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Run in docker
1. Install docker
2. In file `docker-compose.yml` replace `<API_KEY>` (environment section) with your api key from https://openweathermap.org
3. From root folder run command in terminal: `docker compose up`