import React from "react";
import logo from "./logo.png";
import "./App.css";
import Colourpicker from "./Colourpicker";
import Animations from "./Animations";

import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Card,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import Colorslide from "./Colorslide";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colourpicker: false,
      colors: [],
      showAnimation: false,
      startAnimation: false,
    };
  }
  showColourPicker = () => {
    //console.log("showColorPicker");
    this.setState({ colourpicker: true });
  };

  addColor = (color) => {
    if (this.state.colors.length < 4)
      this.setState({ colors: [...this.state.colors, color] });
  };

  showAnimation = () => {
    this.setState({ showAnimation: true });
  };
  startAnimation = () => {
    this.setState({ startAnimation: !this.state.startAnimation });
  };

  render() {
    const col1 = { background: this.state.colors[0] };
    const col2 = { background: this.state.colors[1] };
    const col3 = { background: this.state.colors[2] };
    const col4 = { background: this.state.colors[3] };
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <AppBar position="fixed">
            <Toolbar>
              <Typography
                variant="overline"
                component="div"
                align="left"
                fontSize={16}
                sx={{ flexGrow: 1 }}
              >
                Visualiser
              </Typography>
              <div className="boxAppBar" style={col1 ? col1 : null} />
              <div className="boxAppBar" style={col2 ? col2 : null} />
              <div className="boxAppBar" style={col3 ? col3 : null} />
              <div className="boxAppBar" style={col4 ? col4 : null} />
            </Toolbar>
          </AppBar>
          <div className="middleContent">
            {this.state.colourpicker && !this.state.showAnimation ? (
              <div className="Banner-Row">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Colourpicker addNewCol={this.addColor} />
                  </Grid>
                  <Grid item xs={8}>
                    <Colorslide colors={this.state.colors} />
                  </Grid>
                </Grid>
              </div>
            ) : (
              <input
                type="submit"
                onClick={this.showColourPicker}
                value="Start"
                hidden={this.state.showAnimation}
              />
            )}
            {!this.state.showAnimation ? null : (
              <Animations
                rows={10}
                cols={20}
                colors={[this.state.colors]}
                start={this.state.startAnimation}
              />
            )}
          </div>
          <div className="Banner-Row">
            <BottomNavigation showLabels className="bottomNav">
              <Typography
                variant="overline"
                component="div"
                align="left"
                fontSize={16}
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Button
                disabled={!this.state.showAnimation}
                onClick={this.startAnimation}
              >
                START
              </Button>
              <Button
                disabled={this.state.colors.length < 1}
                onClick={this.showAnimation}
              >
                >>>
              </Button>
            </BottomNavigation>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
