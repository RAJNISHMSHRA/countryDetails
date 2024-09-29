import express from 'express';
import cors from 'cors';
import {
  getCountries,
  searchCountries,
  getCountryByCode,
  getCountriesByRegion,
  errorHandler,
  filterBySearchGlobal
} from './v1/controller/countryController';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', filterBySearchGlobal);
app.get('/countries', getCountries);
app.get('/countries/search', searchCountries);
app.get('/countries/:code', getCountryByCode);
app.get('/countries/region/:region', getCountriesByRegion);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
