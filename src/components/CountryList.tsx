import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Select,
  Box,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: "5vh",
  },
  grids: {
    flexGrow: 1,
    margin: "10px 5px",
    maxWidth: "24%",
  },
  formControlStyle: {
    marginBottom: "2%",
  },
  formStyle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "0 10px",
  },
});

interface inputStateDesign {
  name: string;
  region: string;
}

const CountryList = () => {
  const emptyInputState = {
    name: "",
    region: "",
  };
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [inputState, setInputState] = useState<inputStateDesign>(
    emptyInputState
  );
  const [apiQuery, setApiQuery] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchCountryList = async () => {
      setLoading(true);
      const countryListFromAPI = await axios(
        "https://restcountries.eu/rest/v2/all"
      );
      setCountryList(countryListFromAPI.data);
      setLoading(false);
    };
    const fetchFilteredCountryList = async () => {
      setLoading(true);
      const filteredCountryListFromAPI = await axios(
        `https://restcountries.eu/rest/v2/${apiQuery}`
      );
      setCountryList(filteredCountryListFromAPI.data);
      setLoading(false);
    };
    if (inputState.name === "" && inputState.region === "") {
      fetchCountryList();
    } else {
      fetchFilteredCountryList();
    }
    return () => {};
  }, [inputState, apiQuery]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof inputState;
    setInputState({
      ...inputState,
      [name]: event.target.value,
    });
    setApiQuery(`${name}/${event.target.value}`);
  };

  return (
    <Container className={classes.containerStyle}>
      <Container>
        {loading ? (
          `Loading...`
        ) : (
          <Grid container spacing={4}>
            {selectedCountry ? (
              <CountryDetails
                country={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                countryList={countryList}
              />
            ) : (
              <Grid container direction="column">
                <Box className={classes.formStyle}>
                  <FormControl
                    className={classes.formControlStyle}
                    variant="outlined"
                    style={{
                      width: "35%",
                    }}
                  >
                    <OutlinedInput
                      name="name"
                      id="outlined-adornment-amount"
                      type="text"
                      placeholder="Search for a country..."
                      value={inputState.name}
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl
                    className={classes.formControlStyle}
                    variant="outlined"
                    style={{
                      minWidth: "20%",
                    }}
                  >
                    <InputLabel htmlFor="outlined-filter-by-region-native-simple">
                      Filter by Region
                    </InputLabel>
                    <Select
                      native
                      value={inputState.region}
                      onChange={handleChange}
                      label="Filter by Region"
                      inputProps={{
                        name: "region",
                        id: "outlined-filter-by-region-native-simple",
                      }}
                      placeholder="Filter by Region"
                    >
                      <option aria-label="None" value="" />
                      <option value="Africa">Africa</option>
                      <option value="Americas">Americas</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                    </Select>
                  </FormControl>
                </Box>
                <Grid container direction="row">
                  {countryList.map((country: Country, index: number) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      md={3}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.grids}
                      onClick={() => setSelectedCountry(country)}
                    >
                      <CountryCard country={country} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default CountryList;
