import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: "5vh",
  },
});

const CountryList = () => {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const classes = useStyles();

  useEffect(() => {
    const fetchCountryList = async () => {
      const countryListFromAPI = await axios(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;population;region;flag;subregion;borders;nativeName;currencies;languages;topLevelDomain;numericCode;"
      );
      setCountryList(countryListFromAPI.data);
    };
    fetchCountryList();
    return () => {};
  }, []);
  return (
    <Container className={classes.containerStyle}>
      <Container>
        <Grid container spacing={4}>
          {selectedCountry ? (
            <CountryDetails
              country={selectedCountry}
              goBack={setSelectedCountry}
            />
          ) : (
            countryList.map((country: Country, index: number) => (
              <Grid
                key={index}
                item
                xs={3}
                onClick={() => setSelectedCountry(country)}
              >
                <CountryCard country={country} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default CountryList;
