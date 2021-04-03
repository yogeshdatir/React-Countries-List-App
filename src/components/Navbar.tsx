import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modeText: {
    paddingLeft: "5px",
  },
}));

const Navbar = (props: { toggleTheme: any; icon: any }) => {
  const { toggleTheme, icon } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Where in the world?
            </Typography>
            <Button color="inherit" onClick={toggleTheme}>
              {icon}
              <Typography variant="subtitle1" className={classes.modeText}>
                Dark Mode
              </Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
