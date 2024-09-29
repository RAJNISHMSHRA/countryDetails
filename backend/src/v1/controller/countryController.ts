import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import { Country } from '../../types/type'

// Create a cache instance (1-hour cache)
const cache = new NodeCache({ stdTTL: 3600 });

// Middleware to handle asynchronous route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

// Function to search for a key in an object
function searchKeyInObject(obj: any, searchKey: string): boolean {
  // Check if the object itself matches the key-value
  if (typeof obj === "string" && obj.toLowerCase().includes(searchKey.toLowerCase())) {
    return true;
  }

  // If it's an array, check each element
  if (Array.isArray(obj)) {
    return obj.some((item) => searchKeyInObject(item, searchKey));
  }

  // If it's an object, recursively check its values
  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).some((value) => searchKeyInObject(value, searchKey));
  }

  // No match found
  return false;
}
function filterBySearchKey(array: Country[], searchKey: any): Country[] {
    return array.filter((item) => searchKeyInObject(item, searchKey));
  }

// Function to filter countries based on search key
export const filterBySearchGlobal = async (req: Request, res: Response): Promise<void> => {
   
        const { key} = req.query;
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        console.log(req.query,'req.query')
        
        const filteredData = filterBySearchKey(data, key);
        console.log(filteredData,'req.query')
        cache.set(req.originalUrl, filteredData); 
        res.json(filteredData);
      
  };
  

// GET /countries: Fetch a list of all countries
export const getCountries = asyncHandler(async (req: Request, res: Response) => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all');
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
});

// GET /countries/search: Search for countries by various parameters
export const searchCountries = asyncHandler(async (req: Request, res: Response) => {
  const { name, capital, region, timezone } = req.query;
  const { data } = await axios.get('https://restcountries.com/v3.1/all');

  // Filter data based on query parameters
  const filteredData = data.filter((country: any) => {
    return (
      (!name || country.name.common.toLowerCase().includes((name as string).toLowerCase())) &&
      (!capital || (country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase()))) &&
      (!region || country.region.toLowerCase() === (region as string).toLowerCase()) &&
      (!timezone || country.timezones && country.timezones.includes(timezone as string))
    );
  });

  cache.set(req.originalUrl, filteredData); // Cache the response
  res.json(filteredData);
});

// GET /countries/:code: Fetch detailed information about a single country by its country code
export const getCountryByCode = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.params;
  const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
});

// GET /countries/region/:region: Filter countries by region
export const getCountriesByRegion = asyncHandler(async (req: Request, res: Response) => {
  const { region } = req.params;
  const { data } = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
});

// Global error handler middleware (optional, could be defined in your main server file)
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};
