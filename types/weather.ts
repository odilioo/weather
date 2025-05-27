export interface WeatherResponse {
    name: string;
    main: {
      temp: number;
      feels_like: number;
    };
    weather: {
      description: string;
      icon?: string; // optional now
    }[];
    wind?: {
      speed: number;
    };
    sys?: {
      country: string;
    };
  }