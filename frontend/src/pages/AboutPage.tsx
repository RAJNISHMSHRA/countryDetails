import React, { useEffect, useState } from 'react';
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
  const [chartWidth, setChartWidth] = useState<string>('100%');
  const [chartHeight, setChartHeight] = useState<string>('400px');

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setChartHeight('300px');  
      } else {
        setChartHeight('400px');  
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();  

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const languages = data.flatMap(country => Object.values(country.languages || {}));
  const languageCounts = languages.reduce((acc: { [key: string]: number }, lang: string) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const languageData: (string | number)[][] = [["Language", "Count"], ...Object.entries(languageCounts).sort(([, a], [, b]) => b - a).slice(0, 10).map(([key, value]) => [key, value])];
  const populationData: (string | number)[][] = [["Country", "Population"], ...data.sort((a, b) => b.population - a.population).slice(0, 10).map(country => [country.name.common, country.population])];

  if (!data.length) {
    return <div>No country data available.</div>;
  }

  const barChartOptions = {
    title: 'Top 10 Countries by Population',
    chartArea: { width: window.innerWidth < 600 ? '70%' : '50%' }, 
    hAxis: {
      title: 'Total Population',
      minValue: 0,
      textStyle: {
        fontSize: window.innerWidth < 600 ? 10 : 12,  
      }
    },
    vAxis: {
      title: 'Country',
      textStyle: {
        fontSize: window.innerWidth < 600 ? 10 : 12,  
      }
    },
    legend: { position: 'none' }

  };

  const pieChartOptions = {
    title: 'Top 10 Languages Spoken in Countries',
    is3D: true,
    legend: {
      textStyle: {
        fontSize: window.innerWidth < 600 ? 10 : 12 
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>About Countries</h1>

      <h2>Top 10 Population by Country</h2>
      <Chart
        chartType="Bar"
        width={chartWidth}
        height={chartHeight}
        data={populationData}
        options={barChartOptions}
      />

      <h2>Top 10 Languages Spoken in world</h2>
      <Chart
        chartType="PieChart"
        width={chartWidth}
        height={chartHeight}
        data={languageData}
        options={pieChartOptions}
      />
    </div>
  );
};

export default AboutComponent;
