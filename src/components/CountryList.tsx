import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: "5vh",
  },
});

const CountryList = () => {
  const [countryList, setCountryList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchCountryList = async () => {
      const countryListFromAPI = await axios(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;population;region;flag"
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
          {countryList.map((country: Country, index: number) => (
            <Grid key={index} item xs={3}>
              <CountryCard key={index} country={country} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default CountryList;
