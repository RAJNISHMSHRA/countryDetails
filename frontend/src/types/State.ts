// src/types/State.ts

import { Country } from './Country';

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
