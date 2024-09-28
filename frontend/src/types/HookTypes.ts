import { Country } from "./Country";

export type UseFetchCountriesReturnType = {
    countries: Country[];
    loading: boolean;
    error: string | null;
  };
  