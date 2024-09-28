import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../store/store";
import { fetchCountry} from "../features/countries/countrySlice";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, Box } from "@mui/material";
import Loader from "../components/Loader";
import MapView from "../components/MapView";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const StyledCard = styled(Card)`
  margin: 20px auto;
  max-width: 1200px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InfoWrapper = styled.div`
  max-width: 60%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const MapWrapper = styled.div`
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const BorderSpan = styled.span`
  padding: 8px;
  background: #f2f2f2;
  width: auto;
  border: 1px solid blue;
  color: black;
  border-radius: 5%;
  margin: 5px 8px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background: #e0e0e0;
  }
`;

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle navigation
  const { selectedCountry, loading, error } = useSelector(
    (state: any) => state.countries
  );

  useEffect(() => {
    if (code) {
      dispatch(fetchCountry(code));
    }
  }, [dispatch, code]);

  // Function to handle span click and navigate to the border country
  const handleBorderClick = (borderCode: string) => {
    navigate(`/country/${borderCode}`);
  };

  return (
    <Container>
      {loading && <Loader />}
      {error && <Typography color="error">{error}</Typography>}
      {selectedCountry && (
        <StyledCard>
          <CardContent>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              Detailed View of {selectedCountry[0].name.official}
            </Typography>
            <ContentWrapper>
              <InfoWrapper>
                <Typography variant="h4">
                  {selectedCountry[0].name.official}
                </Typography>
                <img
                  src={selectedCountry[0].flags.svg}
                  alt={`Flag of ${selectedCountry[0].name.official}`}
                  width="150"
                  style={{ margin: "10px 0" }}
                />
           
                <Typography component='div'><Box fontWeight='700' display='inline'>Population: </Box>  {selectedCountry[0].population}</Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Region: </Box>  {selectedCountry[0].region}</Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Capital:  </Box> {selectedCountry[0].capital && selectedCountry[0].capital[0]}</Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Currencies: </Box> {Object.values(selectedCountry[0].currencies)
                    .map((currency: any) => currency.name)
                    .join(", ")}
                    </Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Languages:  </Box> {Object.values(selectedCountry[0].languages).join(", ")}</Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Timezones:  </Box>  {selectedCountry[0].timezones.join(", ")}</Typography>
                <Typography component='div'><Box fontWeight='700' display='inline'> Borders:  </Box>  {selectedCountry[0].borders? selectedCountry[0].borders.map((item: string, key: number) => (
                        <BorderSpan key={key} onClick={() => handleBorderClick(item)}>
                          {item}
                        </BorderSpan>
                      ))
                    : "No border countries"}</Typography>

              </InfoWrapper>
              <MapWrapper>
                <MapView
                  latitude={selectedCountry[0].latlng[0]}
                  longitude={selectedCountry[0].latlng[1]}
                />
              </MapWrapper>
            </ContentWrapper>
          </CardContent>
        </StyledCard>
      )}
    </Container>
  );
};

export default CountryDetail;
