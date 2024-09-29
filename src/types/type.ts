// src/types/Country.ts

export interface Currency {
    name: string;
    symbol: string;
  }
  
  export interface Language {
    name: string;
    nativeName: string;
  }
  
  export interface Flag {
    png: string;
    svg: string;
  }
  
  export interface Country {
    name: {
      common: string;
      official: string;
    };
    cca3: string; // Country code
    region: string;
    subregion: string;
    population: number;
    capital:string;
    flags: Flag;
    currencies: Record<string, Currency>;
    languages: Record<string, Language>;
    timezones: string[];
    // Add other fields as necessary
  }

  
  