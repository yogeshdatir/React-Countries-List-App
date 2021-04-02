import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Country } from "../types/country";
import React from "react";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

interface ICardProps {
  country: Country;
}

const CountryCard = (props: ICardProps) => {
  const classes = useStyles();
  const { country } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={country.flag}
          title={country.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {country.name}
          </Typography>

          <Grid item>
            <Typography variant="subtitle1">
              Population: {country.population}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1">
              Region: {country.region}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1">
              Capital: {country.capital}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
