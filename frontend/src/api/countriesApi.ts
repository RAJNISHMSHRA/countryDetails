import axios from 'axios';
import { Country } from '../types/Country';

const apiUrl = process.env.REACT_APP_API_URL;

const API_URL = `${apiUrl}/countries`; 

interface CountrySearchParams {
    name?: string;
    capital?: string;
    region?: string;
    timezone?: string;
}



export const fetchAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
    try {
        const response = await axios.get(`${API_URL}/${code}`); // Use backticks for template literal
        return response.data;
    } catch (error) {
        console.error(`Error fetching country by code ${code}:`, error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const searchBykey = async (params: CountrySearchParams): Promise<Country[]> => {
    try {
        // const response = await axios.get(`${API_URL}/search?name=${name}`); // Use backticks
        const response = await axios.get<Country[]>(`http://localhost:5000/search`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching country by key:`, error);
        throw error; // Rethrow the error for further handling if needed
    }
};
export const fetchDataFilter = async (params: CountrySearchParams): Promise<Country[]> => {
    try {
        const response = await axios.get<Country[]>('http://localhost:5000/countries/search', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
    try {
        const response = await axios.get(`${API_URL}/region/${region}`); // Use backticks
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by region ${region}:`, error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const fetchCountriesByTimezone = async (params: any): Promise<Country[]> => {
    try {
        // const response = await axios.get(`${API_URL}/search?timezone=${timezone}`); // Use backticks
        const response = await axios.get<Country[]>(`http://localhost:5000/search`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by timezone ${params.key}:`, error);
        throw error; // Rethrow the error for further handling if needed
    }
};
