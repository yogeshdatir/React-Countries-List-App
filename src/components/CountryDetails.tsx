import {
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@material-ui/core";
import Image from "material-ui-image";
import React from "react";
import { Country, Currency, Language } from "../types/country";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "5vh",
    display: "flex",
    padding: 0,
    "@media (max-width:780px)": {
      flexDirection: "column",
    },
  },
  card: {
    display: "flex",
    width: "100%",
    height: "60vh",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "6vh",
    "@media (max-width:780px)": {
      flexDirection: "column",
      height: "100vh",
    },
  },
  flagCover: {
    width: "40%",
    height: "100%",
    "@media (max-width:780px)": {
      height: "100%",
      width: "100%",
    },
  },
  details: {
    display: "flex",
    width: "60%",
    height: "100%",
    "@media (max-width:780px)": {
      height: "100%",
      width: "100%",
      flexDirection: "column",
    },
  },
  content: {
    padding: 0,
    margin: "auto 10%",
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    "@media (max-width:780px)": {
      margin: 0,
    },
  },
  subContent: {
    width: "100%",
  },
  cardDetails: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    "@media (max-width:780px)": {
      height: "100%",
      width: "100%",
      flexDirection: "column",
    },
  },
  cardText: {
    marginRight: "20%",
  },
  cardText2: {
    "@media (max-width:780px)": {
      height: "100%",
      width: "100%",
      flexDirection: "column",
      marginTop: "10%",
    },
  },
  backButtonStyle: {
    padding: "5px 25px",
    textTransform: "none",
  },
  backIcon: {
    fontSize: "18px",
    padding: "0 5px",
  },
  countryButtonStyle: {
    textTransform: "none",
    fontSize: "8px",
    margin: "5px 10px",
    marginLeft: 0,
  },
  borderCountriesStyle: {
    "@media (max-width:780px)": {
      height: "100%",
      width: "100%",
      flexDirection: "column",
      marginTop: "10%",
    },
  },
}));

interface ICardProps {
  country: Country;
  setSelectedCountry: any;
  countryList: Country[];
}

const CountryDetails = (props: ICardProps) => {
  const classes = useStyles();
  const { country, setSelectedCountry, countryList } = props;

  const currenciesString = country.currencies
    .map((currency: Currency) => currency.name)
    .toString();

  const languagesString = country.languages
    .map((lang: Language) => lang.name)
    .toString();

  const borderCountriesButtons = country.borders.map(
    (borderCountryAlpha3code: any, index: number) => {
      const currentCountry = countryList.filter(
        (country: Country) => country.alpha3Code === borderCountryAlpha3code
      )[0];
      return (
        <Button
          key={index}
          variant="outlined"
          className={classes.countryButtonStyle}
          onClick={() => setSelectedCountry(currentCountry)}
        >
          {currentCountry.name}
        </Button>
      );
    }
  );

  return (
    <Grid className={classes.root} item container sm={12}>
      <Button
        className={classes.backButtonStyle}
        startIcon={<KeyboardBackspaceIcon className={classes.backIcon} />}
        variant="outlined"
        onClick={() => setSelectedCountry(null)}
      >
        <Typography variant="subtitle2">Back</Typography>
      </Button>
      <Box className={classes.card}>
        <CardMedia
          className={classes.flagCover}
          image={country.flag}
          title={country.name}
        />
        <Grid className={classes.details}>
          <CardContent className={classes.content}>
            <Grid className={classes.subContent}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                style={{
                  margin: "10% 0",
                }}
              >
                {country.name}
              </Typography>
              <Grid className={classes.cardDetails}>
                <Grid className={classes.cardText}>
                  <Typography variant="subtitle1">
                    Native Name: {country.nativeName}
                  </Typography>

                  <Typography variant="subtitle1">
                    Population: {country.population}
                  </Typography>

                  <Typography variant="subtitle1">
                    Region: {country.region}
                  </Typography>

                  <Typography variant="subtitle1">
                    Sub Region: {country.subregion}
                  </Typography>

                  <Typography variant="subtitle1">
                    Capital: {country.capital}
                  </Typography>
                </Grid>
                <Grid className={classes.cardText2}>
                  <Typography variant="subtitle1">
                    Top Level Domain: {country.topLevelDomain}
                  </Typography>

                  <Typography variant="subtitle1">
                    Currencies: {currenciesString}
                  </Typography>

                  <Typography variant="subtitle1">
                    Languages: {languagesString}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.borderCountriesStyle}>
              <Typography variant="subtitle1" component="span">
                Border Countries:
              </Typography>
              <Grid>{borderCountriesButtons}</Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CountryDetails;
