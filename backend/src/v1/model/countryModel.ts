export interface Country {
    name: {
        common: string;
        official: string;
    };
    population: number;
    languages: { [key: string]: string };
    capital?: string[];
    region: string;
    timezones?: string[];
}
