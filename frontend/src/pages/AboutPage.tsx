// src/About.tsx
import React from 'react';
import { Chart } from 'react-google-charts';

interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  languages: { [key: string]: string };
}

const AboutComponent: React.FC = () => {

  const countriesData: Country[] = [
    {
      name: {
        common: "Liechtenstein",
        official: "Principality of Liechtenstein"
      },
      population: 38137,
      languages: {
        deu: "German"
      }
    },
    {
      name: {
        common: "Switzerland",
        official: "Swiss Confederation"
      },
      population: 8654622,
      languages: {
        deu: "German",
        fra: "French",
        ita: "Italian"
      }
    },
    {
      name: {
        common: "Germany",
        official: "Federal Republic of Germany"
      },
      population: 83783942,
      languages: {
        deu: "German"
      }
    },
  ];

  
  const languages = countriesData.flatMap(country => Object.values(country.languages));
  const languageCounts = languages.reduce((acc: { [key: string]: number }, lang: string) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const languageData: (string | number)[][] = [["Language", "Count"], ...Object.entries(languageCounts).map(([key, value]) => [key, value])];


  const populationData: (string | number)[][] = [["Country", "Population"], ...countriesData.map(country => [country.name.common, country.population])];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>About Countries</h1>

      <h2>Population by Country</h2>
      <Chart
        chartType="Bar"  // Correctly using lowercase for the chart type
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
        chartType="PieChart"  // Ensure the correct chart type
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
