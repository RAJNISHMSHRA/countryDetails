import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from '../store/store'; 
import { searchAllByKey, searchAllName, searchCountry } from '../features/countries/countrySlice';

interface SearchBarProps {
    onSearch?: (name: string) => void;
    label: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ label }) => {
    const dispatch = useDispatch();
    const { searched, searchedAll } = useSelector((state: any) => state.countries);

    const handleChange = (val: string) => {
        if (label === 'Global Search') {
            const param={key:val}
            dispatch(searchAllName(val));
            dispatch(searchAllByKey(param))
        } else if (label === 'Search by country') {
            dispatch(searchCountry(val));
        }
    };

    // Determine the value based on the label
    const value = label === 'Global Search' ? searchedAll : 
                  label === 'Search by country' ? searched : '';

    return (
        <div>
            <TextField
                variant="outlined"
                label={label}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                fullWidth // Makes the TextField take full width
            />
        </div>
    );
};

export default SearchBar;
