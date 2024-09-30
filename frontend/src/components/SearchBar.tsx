import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from '../store/store'; 
import { searchAllByKey, searchAllName, searchCountry } from '../features/countries/countrySlice';

interface SearchBarProps {
    label: string;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ label, onKeyDown }) => {
    const dispatch = useDispatch();
    const { searched, searchedAll } = useSelector((state: any) => state.countries);

    const handleChange = (val: string) => {
        if (label === 'Global Search') {
            const param = { key: val };
            dispatch(searchAllName(val));
            dispatch(searchAllByKey(param));
        } else if (label === 'Search by country') {
            dispatch(searchCountry(val));
        }
    };

    const value = label === 'Global Search' 
        ? searchedAll 
        : label === 'Search by country' 
        ? searched 
        : '';

    return (
        <div>
            <TextField
                variant="outlined"
                label={label}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={onKeyDown}
                fullWidth 
            />
        </div>
    );
};

export default SearchBar;
