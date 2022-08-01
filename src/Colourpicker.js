import Wheel from "@uiw/react-color-wheel";
import React, { useState } from "react";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import Colorslide from "./Colorslide";

var colorsys = require("colorsys");

export default class Colourwheel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: { h: 0, s: 0, v: 68, a: 1 },
      colorHex: "#adadad",
    };
  }
  // const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });

  componentDidUpdate(prevProps, prevState) {
    // console.log("CDU prevhex:", prevState.colorHex);
    // console.log("CDU currhex:", this.state.colorHex);
    if (this.state.color !== prevState.color) {
      this.colourHsvToHex();
    }
  }

  changeColor = (color) => {
    console.log("changecolour");
    let hexValue = colorsys.hsvToHex({
      h: this.state.color.h,
      s: this.state.color.s,
      v: this.state.color.v,
    });

    this.setState({
      color: { ...this.state.color, ...color.hsva },
    });
    this.colourHsvToHex();
    console.log("changeCol: ", this.state.colorHex);
  };

  colourHsvToHex = () => {
    console.log("colHSVtoHEX");
    let hexValue = colorsys.hsvToHex({
      h: this.state.color.h,
      s: this.state.color.s,
      v: this.state.color.v,
    });
    console.log(hexValue);
    this.setState({ colorHex: hexValue });
    console.log("colhsvtohex: ", this.state.colorHex);
  };

  render() {
    let hexValue = colorsys.hsvToHex({
      h: this.state.color.h,
      s: this.state.color.s,
      v: this.state.color.v,
    });
    //console.log(this.state.colorHex);
    const styles = {
      background: hexValue,
      color: hexValue,
      marginLeft: 50,
      marginRight: 50,
    };

    return (
      <div
        style={{
          marginTop: "3vw",
          marginBottom: "6vw",
        }}
      >
        <Typography variant="overline" fontSize={24} color="white">
          Select 4 Colors
        </Typography>
        <br />
        <Wheel
          className="colWheel"
          color={this.state.color}
          onChange={this.changeColor}
          height={300}
          width={300}
        />
        <br />
        {/* <input
          type="submit"
          onClick={() => this.props.addNewCol(this.state.colorHex)}
          value="+"
        /> */}

        <Button
          variant="outlined"
          type="submit"
          onClick={() => this.props.addNewCol(this.state.colorHex)}
          sx={{
            color: "white",
            border: "0px",
            borderRadius: "15px",
            "&.MuiButtonBase-root:hover": {
              border: "0px",
              background: "transparent",
            },
          }}
        >
          <Typography
            variant="overline"
            fontSize={36}
            sx={{ margin: "0px 50px" }}
          >
            +
          </Typography>
        </Button>

        <div style={styles}>
          <Typography variant="overline" fontSize={16} sx={{ color: "white" }}>
            {this.state.colorHex}
          </Typography>
        </div>
        {this.props.colors.length > 0 ? (
          <Typography variant="overline" fontSize={12} sx={{ color: "white" }}>
            Click on Color to deselect
          </Typography>
        ) : null}
      </div>
    );
  }
}
