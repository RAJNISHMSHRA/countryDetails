import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import cors from 'cors';
import { Country } from './types/type';

dotenv.config();

const app = express();

// Create a cache instance (1-hour cache)
const cache = new NodeCache({ stdTTL: 3600 });

app.use(cors());

// REST Countries API base URL
const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';

// Middleware to handle errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Middleware for simple caching
const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    res.json(cachedResponse);
  } else {
    next();
  }
};



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

app.get('/search', cacheMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { key} = req.query;
  const { data } = await axios.get(`${REST_COUNTRIES_API}/all`);
  console.log(req.query,'req.query')
  
  const filteredData = filterBySearchKey(data, key);
  console.log(filteredData,'req.query')
  cache.set(req.originalUrl, filteredData); 
  res.json(filteredData);
}));

app.get('/countries/search', cacheMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { name, capital, region, timezone } = req.query;
  const { data } = await axios.get(`${REST_COUNTRIES_API}/all`);

 
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
}));

// GET /countries: Fetch a list of all countries
app.get('/countries', cacheMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { data } = await axios.get(`${REST_COUNTRIES_API}/all`);
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
}));

// GET /countries/:code: Fetch detailed information about a single country by its country code
app.get('/countries/:code', cacheMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.params;
  const { data } = await axios.get(`${REST_COUNTRIES_API}/alpha/${code}`);
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
}));

// GET /countries/region/:region: Filter countries by region
app.get('/countries/region/:region', cacheMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { region } = req.params;
  const { data } = await axios.get(`${REST_COUNTRIES_API}/region/${region}`);
  cache.set(req.originalUrl, data); // Cache the response
  res.json(data);
}));

// GET /countries/search: Search for a country by name, capital, region, or timezone


// Global error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
