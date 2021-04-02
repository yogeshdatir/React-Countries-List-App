export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  subregion: string;
  borders: Country[];
  nativeName: string;
  currencies: Currency[];
  languages: Language[];
  topLevelDomain: string;
  alpha3Code: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}