import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Country } from '../types/Country';
import { Link } from 'react-router-dom';

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '700px',
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '80%', sm: '60%' }, 
                    height: 'auto',
                    objectFit: 'contain',
                    mb: 2, 
                }}
                image={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
            />
            <CardContent
            component="div"
                sx={{
                    p: 2, 
                    gap: 1,
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 1,
                    }}
                >
                    {country.name.common}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontStyle: 'italic',
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    Official Name: {country.name.official}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    Region: {country.region}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    Capital: {country.capital}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    Population: {country.population.toLocaleString()}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    Timezones: {country.timezones.join(', ')}
                </Typography>
                <Link
                    to={`/country/${country.cca3}`}
                    style={{
                        textDecoration: 'none',
                        color: '#0073e6',
                        fontWeight: 'bold',
                        marginTop: '10px',
                    }}
                >
                    View Details
                </Link>
            </CardContent>
        </Card>
    );
};

export default CountryCard;
