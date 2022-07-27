import React from "react";
import logo from "./logo.png";
import "./App.css";
import Colourpicker from "./Colourpicker";
import Animations from "./Animations";
import Animations2 from "./Animation2";
import Title from "./Title";
import { Dimensions } from "react-native";
import SpotifyPlayer from "./SpotifyPlayer";
import {
  Box,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Card,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  TextField,
  InputLabel,
} from "@mui/material";
import Colorslide from "./Colorslide";
import { margin } from "@mui/system";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colourpicker: false,
      colors: [],
      showAnimation: false,
      startAnimation: false,
      defaultAnimation: true,
      url: "",
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

  changeAnimation = () => {
    this.setState({ defaultAnimation: !this.state.defaultAnimation });
  };

  playlistUrl = (e) => {
    let urlinput = e.target.value;
    urlinput = urlinput.replace("https://open.spotify.com/playlist/", "");
    console.log(urlinput);
    this.setState({ url: urlinput });
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
            {
              this.state.colourpicker && !this.state.showAnimation ? (
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
                <input
                  type="submit"
                  onClick={this.showColourPicker}
                  value="Start"
                  hidden={this.state.showAnimation}
                />
              )
              // <Title onClick={this.showColourPicker} />
            }
            {!this.state.showAnimation ? null : this.state.defaultAnimation ? (
              <Animations
                rows={(0.8 * windowHeight) / 50}
                cols={(0.9 * windowWidth) / 50}
                colors={[this.state.colors]}
                start={this.state.startAnimation}
              />
            ) : (
              <Animations2
                rows={(0.8 * windowHeight) / 50}
                cols={(0.9 * windowWidth) / 50}
                colors={[this.state.colors]}
                start={this.state.startAnimation}
              />
            )}
          </div>
          <div className="Banner-Row">
            <BottomNavigation
              showLabels
              className="bottomNav"
              sx={{ height: 80, background: "#090909", bottom: 0 }}
            >
              {/* {!this.state.colourpicker ? (
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                  />
                </Box>
              ) : null} */}
              <div className="spotifyplayer">
                {this.state.startAnimation ? (
                  <SpotifyPlayer url={this.state.url} />
                ) : (
                  <form>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1 },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        className="textfield"
                        style={{ color: "white" }}
                        id="standard-basic"
                        label="Spotify Playlist URL (Starts With: https://open.spotify.com/playlist/)"
                        variant="standard"
                        size="small"
                        sx={{
                          input: {
                            color: "white",
                            borderBottom: "solid white 1px",
                          },
                          label: { color: "white" },
                        }}
                        onChange={this.playlistUrl}
                      />
                    </Box>
                  </form>
                )}
              </div>
              <Button
                // margin={"auto"}
                margin={"2vw"}
                disabled={!this.state.showAnimation}
                onClick={this.changeAnimation}
              >
                CHANGE ANIMATION
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
