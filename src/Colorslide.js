import anime from "animejs/lib/anime.es.js";
import React from "react";
import { Typography } from "@mui/material";

export default class Colorslide extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    // this.state = { colors: [] };
  }

  animationEffect = () => {
    console.log("animation effect");
    let animationRef = this.myRef.current;
    animationRef = anime({
      targets: ".boxColors",
      translateX: -50,
      // translateY: 100,
      loop: false,
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.colors !== prevProps.colors) {
      this.animationEffect();
    }
  }

  render() {
    console.log(this.props.colors.length);
    let circleRow = [];
    for (let i = 0; i < this.props.colors.length; i++) {
      circleRow.push(
        <div className="boxColors" style={{ background: this.props.colors[i] }}>
          <p className="circleText">{i + 1}</p>
          {/* <Typography variant="overline" display="inline-block">
            {this.props.colors[i]}
          </Typography> */}
        </div>
      );
    }
    console.log(circleRow);

    return <div className="containersSlide">{circleRow}</div>;
  }
}
