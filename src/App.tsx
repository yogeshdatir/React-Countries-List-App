import React, { useState } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import CountryList from "./components/CountryList";
import Navbar from "./components/Navbar";

import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";

function App() {
  const [theme, setTheme] = useState(true);
  const icon = !theme ? <BrightnessHighIcon /> : <BrightnessLowIcon />;
  const appliedTheme = createMuiTheme({
    palette: {
      type: theme ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div>
        <Navbar toggleTheme={toggleTheme} icon={icon} />
        <CountryList />
      </div>
    </ThemeProvider>
  );
}

export default App;
