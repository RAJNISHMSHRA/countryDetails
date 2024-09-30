import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "../store/store";
import {
  fetchCountries,
  searchCountry,
  searchDataFilter,
  searchAllName,
} from "../features/countries/countrySlice";
import CountryCard from "../components/CountryCard";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import Loaders from "../components/Loaders";
import { Box } from "@mui/system";
import { motion } from "framer-motion"; // Import motion

interface State extends SnackbarOrigin {
  open: boolean;
}

// Styled Components
const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FilterSection = styled(motion.section)` // Wrap with motion
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterFormControl = styled(FormControl)`
  min-width: 22%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const CountryGrid = styled(motion.section)` // Wrap with motion
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  padding-bottom: 20px;
`;

const CountryList: React.FC = () => {
  const dispatch = useDispatch();
  const { countries, allCountry, searched, loading, error } = useSelector(
    (state: any) => state.countries
  );

  const [filters, setFilters] = useState<any>({
    name: searched,
    region: [],
    timezone: [],
  });
  const [timeZones, setTimeZones] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [snackbar, setSnakBar] = React.useState<State>({
    open: error && error.length > 0,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = snackbar;
  const handleClose = () => {
    setSnakBar({ ...snackbar, open: false });
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countriesPerPage] = useState<number>(5);
  const [visibleCountries, setVisibleCountries] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (allCountry.length > 0) {
      const uniqueTimeZones = extractTimezones(allCountry);
      const uniqueRegions = extractRegions(allCountry);
      setFilters((prev: any) => ({
        ...prev,
        timezone: uniqueTimeZones,
        region: uniqueRegions,
      }));
    }
  }, [countries, allCountry]);

  useEffect(() => {
    setVisibleCountries(
      countries && countries.length
        ? countries.slice(0, currentPage * countriesPerPage)
        : allCountry.slice(0, currentPage * countriesPerPage)
    );
  }, [countries, allCountry, currentPage, countriesPerPage]);

  const extractTimezones = (countriesData: any[]) => {
    const timezonesSet = new Set();
    countriesData.forEach((country) => {
      if (country.timezones) {
        country.timezones.forEach((timezone: any) =>
          timezonesSet.add(timezone)
        );
      }
    });
    return Array.from(timezonesSet).sort();
  };

  const extractRegions = (countriesData: any[]) => {
    const regionSet = new Set<string>();
    countriesData.forEach((country) => {
      if (
        country &&
        typeof country.region === "string" &&
        country.region.trim() !== ""
      ) {
        regionSet.add(country.region);
      }
    });
    return Array.from(regionSet).sort();
  };

  const handleSearch = () => {
    const params = {
      name: searched,
      region: selectedRegion,
      timezone: timeZones,
    };
    dispatch(searchDataFilter(params));
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    const region = event.target.value as string;
    setSelectedRegion(region);
  };

  const handleTimezoneChange = (event: SelectChangeEvent<string>) => {
    const timezone = event.target.value as string;
    setTimeZones(timezone);
  };

  const clearFilters = () => {
    setSelectedRegion("");
    setTimeZones("");
    dispatch(searchCountry(""));
    dispatch(fetchCountries());
    dispatch(searchAllName(""));
    dispatch(searchDataFilter(""));
  };

  const loadMoreCountries = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      loadMoreCountries();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();  // Trigger search on Enter key press
    }
  };

  return (
    <Container>
      <Typography
        variant="h1"
        gutterBottom
        textAlign="center"
        style={{ marginBottom: 40, marginTop: 40 }}
        tabIndex={0}
      >
        Country List
      </Typography>
      <FilterSection
        initial={{ opacity: 0, y: -20 }}  // Initial state
        animate={{ opacity: 1, y: 0 }}    // Animate to this state
        transition={{ duration: 0.5 }}      // Transition duration
        aria-label="Filter section"
      >
        <FilterGroup>
          <SearchBar
            label="Global Search"
            aria-label="Global Search"
            onKeyDown={handleKeyDown}  
          />
          <SearchBar
            label="Search by country"
            aria-label="Search by country"
            onKeyDown={handleKeyDown} 
          />
          <FilterFormControl style={{ minWidth: "22%" }}>
            <InputLabel id="region-select-label">Filter by Region</InputLabel>
            <Select
              labelId="region-select-label"
              value={selectedRegion}
              onChange={handleRegionChange}
              aria-label="Filter by Region"
              onKeyDown={handleKeyDown}  
            >
              <MenuItem value="">All</MenuItem>
              {filters.region.map((item: string, key: number) => (
                <MenuItem value={item} key={key}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FilterFormControl>
          <FilterFormControl style={{ minWidth: "22%" }}>
            <InputLabel id="timezone-select-label">
              Filter by Timezone
            </InputLabel>
            <Select
              labelId="timezone-select-label"
              value={timeZones}
              onChange={handleTimezoneChange}
              aria-label="Filter by Timezone"
              onKeyDown={handleKeyDown}  // Listen for "Enter" key
            >
              <MenuItem value="">All Timezones</MenuItem>
              {filters.timezone.map((item: string, key: number) => (
                <MenuItem value={item} key={key}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FilterFormControl>
          <Button
            onClick={handleSearch}
            variant="contained"
            color="primary"
            aria-label="Apply Filters"
          >
            Apply
          </Button>
          <Button
            onClick={clearFilters}
            variant="contained"
            color="warning"
            aria-label="Clear Filters"
          >
            Clear
          </Button>
        </FilterGroup>
      </FilterSection>

      {/* Animated Country Grid */}
      <CountryGrid
        initial={{ opacity: 0 }} // Initial state
        animate={{ opacity: 1 }} // Animate to this state
        transition={{ duration: 0.5 }} // Transition duration
      >
        {loading && <Loaders />}
        {visibleCountries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 20 }} // Initial state for each card
            animate={{ opacity: 1, y: 0 }}   // Animate to this state
            transition={{ duration: 0.3, delay: index * 0.1 }} // Animate each card with delay
          >
            <CountryCard country={country} />
          </motion.div>
        ))}
      </CountryGrid>

      <LoadMoreButtonWrapper>
        <Button onClick={loadMoreCountries} variant="contained">
          Load More
        </Button>
      </LoadMoreButtonWrapper>

      {/* Snackbar for error messages */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar.open}
        onClose={handleClose}
        message={error}
        action={
          <Button color="inherit" onClick={handleClose}>
            <CancelIcon />
          </Button>
        }
      />
    </Container>
  );
};

export default CountryList;
