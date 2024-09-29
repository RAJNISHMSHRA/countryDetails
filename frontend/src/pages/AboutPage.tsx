
import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from "../store/store";

interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  languages: { [key: string]: string };
}

const AboutComponent: React.FC = () => {
  const { allCountry } = useSelector((state: any) => state.countries);
  const [data, setData] = React.useState<Country[]>([]);

  const extractCountryData = (data: Country[]): Country[] => {
    return Array.isArray(data) ? data.map((country) => ({
      name: {
        common: country.name.common,
        official: country.name.official
      },
      population: country.population,
      languages: country.languages
    })) : [];
  };

  useEffect(() => {
    const formattedData = extractCountryData(allCountry || []);
    setData(formattedData);
  }, [allCountry]);

  const languages = data.flatMap(country => Object.values(country.languages || {}));
  const languageCounts = languages.reduce((acc: { [key: string]: number }, lang: string) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const languageData: (string | number)[][] = [["Language", "Count"], ...Object.entries(languageCounts).map(([key, value]) => [key, value])];
  const populationData: (string | number)[][] = [["Country", "Population"], ...data.map(country => [country.name.common, country.population])];

  if (!data.length) {
    return <div>No country data available.</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>About Countries</h1>

      <h2>Population by Country</h2>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={populationData}
        options={{
          title: 'Population by Country',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Population',
            minValue: 0,
          },
          vAxis: {
            title: 'Country',
          },
        }}
      />

      <h2>Languages Spoken</h2>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={languageData}
        options={{
          title: 'Languages Spoken in Countries',
          is3D: true,
        }}
      />
    </div>
  );
};

export default AboutComponent;
