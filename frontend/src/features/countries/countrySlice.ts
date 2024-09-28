import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchAllCountries,
    fetchCountryByCode,
    fetchDataFilter,
    fetchCountriesByRegion,
    fetchCountriesByTimezone,
    searchBykey
} from '../../api/countriesApi';
import { Country } from '../../types/Country';

interface CountryState {
    countries: Country[];
    selectedCountry: Country | null;
    loading: boolean;
    error: string | null;
    searched:string;
    searchedAll:string;
    allCountry:Country[],

}

const initialState: CountryState = {
    countries: [],
    allCountry:[],
    selectedCountry: null,
    loading: false,
    error: null,
    searched:'',
    searchedAll:''
};

// Async thunks
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    return await fetchAllCountries();
});

  
export const fetchCountry = createAsyncThunk('countries/fetchCountry', async (code: string) => {
    return await fetchCountryByCode(code);
});

export const searchDataFilter = createAsyncThunk('countries/searchCountryByName', async (param: any) => {
    return await fetchDataFilter(param)
  
});

export const searchCountriesByRegion = createAsyncThunk('countries/fetchCountriesByRegion', async (region: string) => {
    return await fetchCountriesByRegion(region);
});

export const searchCountriesByTimezone = createAsyncThunk('countries/fetchCountriesByTimezone', async (timezone: { keyname: string | undefined }) => {
    return await fetchCountriesByTimezone(timezone);
});
export const searchAllByKey = createAsyncThunk('countries/searchAllByKey', async (key: any) => {
    return await searchBykey(key);
});

// Create slice
const countrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        clearCountries: (state) => {
            state.countries = [];
        },
        searchCountry: (state,action) => {
            state.searched = action.payload;
        },
        searchAllName: (state,action) => {
            state.searchedAll = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.allCountry = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch countries';
            })
            .addCase(fetchCountry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCountry = action.payload;
            })
            .addCase(fetchCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch country';
            })
            .addCase(searchDataFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchDataFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(searchDataFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search country';
            })
            .addCase(searchCountriesByRegion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCountriesByRegion.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(searchCountriesByRegion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch countries by region';
            })
            .addCase(searchAllByKey.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchAllByKey.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(searchAllByKey.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to Search data by key'
            })
            .addCase(searchCountriesByTimezone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCountriesByTimezone.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
                if (action.payload.length === 0) {
                    state.error = 'No countries found for the selected timezone.';
                } else {
                    state.error = null;
                }
            })
            .addCase(searchCountriesByTimezone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch countries by timezone';
            });
    },
});

export const { clearCountries,searchCountry,searchAllName } = countrySlice.actions;

export default countrySlice.reducer;
