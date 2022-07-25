import Wheel from "@uiw/react-color-wheel";
import React, { useState } from "react";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { AppBar, Toolbar, Grid, Typography, Box, Paper } from "@mui/material";
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
      <div>
        <Wheel
          className="colWheel"
          color={this.state.color}
          onChange={this.changeColor}
        />
        {/* <input
          type="submit"
          onClick={() => this.props.addNewCol(this.state.colorHex)}
          value="+"
        /> */}
        <Box cursor="pointer">
          <Typography
            variant="overline"
            component="div"
            align="center"
            fontSize={16}
            sx={{ flexGrow: 1 }}
            onClick={() => this.props.addNewCol(this.state.colorHex)}
          >
            +
          </Typography>
        </Box>
        <div style={styles}>
          <p>Hello World</p>
        </div>
      </div>
    );
  }
}

// export interface PointerProps extends React.HTMLAttributes<HTMLDivElement> {
//   prefixCls?: string;
//   top?: string;
//   left: string;
//   color?: string;
// }
// export const Pointer: ({ className, color, left, top, style, prefixCls }: PointerProps) => JSX.Element;

// export default class WheelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> {
//   prefixCls?: string,
//   color?: string | HsvaColor,
//   width?: number,
//   height?: number,
//   radius?: React.CSSProperties['borderRadius'],
//   /** Starting angle of the color wheel's hue gradient, measured in degrees. */
//   angle?: number,
//   /** Direction of the color wheel's hue gradient; either clockwise or anticlockwise. Default: `anticlockwise` */
//   direction?: 'clockwise' | 'anticlockwise',
//   pointer?: ({ prefixCls, left, top, color }: PointerProps) => JSX.Element;
//   onChange?: (color: ColorResult) => void,
// }

// function Demo() {
//   const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
//   return (
//     <Wheel
//       color={hsva}
//       onChange={(color) => {
//         setHsva({ ...hsva, ...color.hsva });
//       }}
//     />
//   );
// }
