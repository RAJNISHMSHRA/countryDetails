import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Country } from '../types/Country';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (
        <StyledCard>
            <StyledCardContent>
                <StyledTitle variant="h5">{country.name.common}</StyledTitle>
                <StyledFlag src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                <StyledTypography variant="body2">Region: {country.region}</StyledTypography>
                <StyledTypography variant="body2">Capital: {country.capital}</StyledTypography>
                <StyledTypography variant="body2">Population: {country.population}</StyledTypography>
                <StyledTypography variant="body2">Timezones: {country.timezones.join(', ')}</StyledTypography>
                <StyledLink to={`/country/${country.cca3}`}>View Details</StyledLink>
            </StyledCardContent>
        </StyledCard>
    );
};

// Styled Components
const StyledCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    margin: 16px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        max-width: 100%;
        margin: 8px;
    }
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 600px) {
        padding: 8px;
    }
`;

const StyledTitle = styled(Typography)`
    margin-bottom: 16px;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 1.2rem;
        margin-bottom: 8px;
    }
`;

const StyledFlag = styled.img`
    width: 100px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;

    @media (max-width: 600px) {
        width: 80px;
        margin-bottom: 8px;
    }
`;

const StyledTypography = styled(Typography)`
    margin-bottom: 8px;

    @media (max-width: 600px) {
        font-size: 0.9rem;
        margin-bottom: 4px;
    }
`;

const StyledLink = styled(Link)`
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #1976d2;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #115293;
    }

    @media (max-width: 600px) {
        margin-top: 8px;
        padding: 6px 12px;
    }
`;

export default CountryCard;
