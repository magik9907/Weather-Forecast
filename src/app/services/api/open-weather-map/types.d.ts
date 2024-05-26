
export interface GeolocationResponse {
  name: string;
  state: string;
  lon: number;
  lat: number;
  country: string;
}

// Response container 5 days of forecast step by 3 hour
export interface Forecast5DaysResponse {
  cod: string;
  cnt: number;
  list: Forecast5Days[];
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    sunrise: number; // seconds from 01-01-1970
    sunset: number;
  };
}

export interface Forecast5Days {
  dt: number; // seconds from 01-01-1970
  dt_txt: string; // format "2024-05-25 00:00:00"
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
}

// Response container 5 days of forecast step by 24 hour
// skipped information about current|minutely(1h)|hourly(48h)
export interface Forecast8DaysResponse {
  lat: number;
  lon: number;
  timezone: string; //text name of timezone
  timezone_offset: number; //in seconds
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: number;
    pop: number;
    uvi: number;
  }>;
}
