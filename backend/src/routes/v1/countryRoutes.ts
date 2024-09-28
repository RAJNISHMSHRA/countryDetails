import { Router } from 'express';
import {
    searchCountries,
    getCountries,
    getCountryByCode,
    getCountriesByRegion
} from '../../v1/controller/countryController'; 

const router = Router();

// Define the routes with versioning
router.get('/search', searchCountries);
router.get('/', getCountries);
router.get('/:code', getCountryByCode);
router.get('/region/:region', getCountriesByRegion);

export default router;
