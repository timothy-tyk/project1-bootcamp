import React from "react";
import logo from "./logo.png";
import "./App.css";
import Colourpicker from "./Colourpicker";
import Animations from "./Animations";
import Title from "./Title";
import { Dimensions } from "react-native";
import SpotifyPlayer from "./SpotifyPlayer";

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
      pauseAnimation: false,
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
    this.setState({
      showAnimation: true,
      colourpicker: false,
      startAnimation: true,
    });
  };

  pauseAnimation = () => {
    this.setState({ pauseAnimation: !this.state.pauseAnimation });
  };

  render() {
    const col1 = { background: this.state.colors[0] };
    const col2 = { background: this.state.colors[1] };
    const col3 = { background: this.state.colors[2] };
    const col4 = { background: this.state.colors[3] };
    let colorExamples = [];
    for (let i = 0; i < this.state.colors.length; i++) {
      colorExamples.push(
        <div
          className="boxAppBar"
          style={{ background: this.state.colors[i] }}
        />
      );
    }

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <AppBar position="fixed" sx={{ background: "#090909" }}>
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
              {colorExamples}
            </Toolbar>
          </AppBar>
          <div className="middleContent">
            {this.state.colourpicker && !this.state.showAnimation ? (
              <div className="middleRow">
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
              // <input
              //   type="submit"
              //   onClick={this.showColourPicker}
              //   value="Start"
              //   hidden={this.state.showAnimation}
              // />
              <Title />
            )}
            {!this.state.showAnimation ? null : (
              <Animations
                rows={(0.8 * windowHeight) / 50} //18
                cols={(0.9 * windowWidth) / 50} //23
                //rows={10}
                //cols={25}
                colors={[this.state.colors]}
                start={this.state.startAnimation}
                pause={this.state.pauseAnimation}
              />
            )}
          </div>
          <div className="Banner-Row">
            <BottomNavigation
              showLabels
              className="bottomNav"
              sx={{ height: 80, background: "#090909", bottom: 0 }}
            >
              {" "}
              {this.state.colourpicker ? (
                <Typography
                  hidden={this.state.colourpicker}
                  variant="overline"
                  component="div"
                  align="left"
                  fontSize={16}
                  margin="2vw"
                  sx={{ flexGrow: 1 }}
                  className="instructions"
                  textAlign={"center"}
                >
                  SELECT COLORS
                </Typography>
              ) : null}
              <div className="spotifyplayer">
                {this.state.startAnimation ? <SpotifyPlayer /> : null}
              </div>
              <Button
                // margin={"auto"}
                margin={"2vw"}
                disabled={!this.state.showAnimation}
                onClick={this.pauseAnimation}
              >
                {this.state.startAnimation && this.state.showAnimation
                  ? "PAUSE"
                  : "START"}
              </Button>
              <Button
                disabled={this.state.colors.length < 1}
                onClick={this.showAnimation}
              >
                <Typography
                  variant="overline"
                  color={"white"}
                  // margin={"auto"}
                  margin={"2vw"}
                >
                  >>>
                </Typography>
              </Button>
            </BottomNavigation>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
