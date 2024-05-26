# WeatherForecast

## Requirements

- **API KEY** from https://openweathermap.org (One Call API 3.0 subscription)
- [Docker](https://www.docker.com) or [NodeJS](https://nodejs.org/en)

## Run with NodeJS
1. Install NodeJS
2. In [./src/env/env.dev.ts](./src/env/env.dev.ts) replace `<API_KEY>` with your api key from https://openweathermap.org
3. From root folder of project run command in terminal: `npm install`
4. Run command `npm run start` for start a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Run in docker
1. Install docker
2. In [./src/env/env.prod.ts](./src/env/env.prod.ts) replace `<API_KEY>` with your api key from https://openweathermap.org
3. From root folder run command in terminal: `docker compose up`
4. After completing step 3, site should be avalaible: http://localhost