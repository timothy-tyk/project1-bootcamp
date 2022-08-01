import React from "react";
import logo from "./logo.png";
import "./App.css";
import Colourpicker from "./Colourpicker";
import Animations from "./Animations";
import Animations2 from "./Animation2";
import Title from "./Title";
import { Dimensions } from "react-native";
import SpotifyPlayer from "./SpotifyPlayer";
import Colorslide from "./Colorslide";
import {
  ThemeProvider,
  createTheme,
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
  CssBaseline,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Liquidpixel from "./font/Liquid-Pixel.ttf";

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

  deleteColor = (colorIndex) => {
    let colorArr = [...this.state.colors];

    colorArr.splice(colorIndex, 1);
    this.setState({ colors: colorArr });
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
    const Liquidpixelfont = {
      fontFamily: "Liquid Pixel",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 400,
      src: `
    url(${Liquidpixel}) format('truetype')
  `,
    };
    const theme = createTheme({
      typography: {
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          "Liquid Pixel",
        ].join(","),
      },
      // overrides: {
      //   MuiCssBaseline: {
      //     "@global": {
      //       "@font-face": [Liquidpixelfont],
      //     },
      //   },
      // },
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <AppBar
              position="fixed"
              sx={{
                background: "#090909",
                border: "0.5px solid white",
                borderRadius: "15px",
              }}
            >
              <Toolbar>
                <Typography
                  variant="overline"
                  component="div"
                  align="left"
                  fontSize={24}
                  sx={{ flexGrow: 1, fontFamily: "Liquid Pixel" }}
                >
                  Beat-Root
                </Typography>
                {colorExamples}
              </Toolbar>
            </AppBar>
            <div className="middleContent">
              {this.state.colourpicker ? (
                <div className="middleRow">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card
                        variant="outlined"
                        sx={{
                          backgroundColor: "#090909",
                          borderRadius: "30px",
                          border: "0.5px solid white",
                        }}
                      >
                        <Colourpicker
                          addNewCol={this.addColor}
                          colors={this.state.colors}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={8}>
                      <Colorslide
                        colors={this.state.colors}
                        onClick={this.deleteColor}
                      />
                    </Grid>
                  </Grid>
                </div>
              ) : this.state.showAnimation ? null : (
                <Title onChange={this.showColourPicker} />
              )}
              {!this.state.showAnimation ? null : this.state
                  .defaultAnimation ? (
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
                sx={{
                  height: 80,
                  background: "#090909",
                  bottom: 0,
                  border: "0.5px solid white",
                  borderRadius: "15px",
                }}
              >
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
                          label="Insert Spotify Playlist URL (Starts With: https://open.spotify.com/playlist/)"
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
                  <Typography
                    color={"white"}
                    sx={{ fontFamily: "Liquid Pixel" }}
                  >
                    Change Animation
                  </Typography>
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
                    sx={{ verticalAlign: "middle" }}
                  >
                    <PlayArrowRoundedIcon fontSize={"large"} />
                  </Typography>
                </Button>
              </BottomNavigation>
            </div>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
