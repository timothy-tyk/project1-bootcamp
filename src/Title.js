import React from "react";
import { Typography } from "@mui/material";
import anime from "animejs";
import { Dimensions } from "react-native-web";

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.textRef = React.createRef(null);
  }

  animationEffect = () => {
    const windowWidth = Dimensions.get("window").width;
    let animationRef = this.myRef.current;
    console.log("animating");
    animationRef = anime({
      targets: ".title",
      translateX: {
        value: windowWidth * 0.6, // 100px * 2.5 = '250px'
        duration: 1000,
      },
      width: {
        value: "-=80px", // 28 - 20 = '8px'
        duration: 1800,
        easing: "easeInOutSine",
      },
      rotate: {
        value: "+=2turn", // 0 + 2 = '2turn'
        duration: 1800,
        easing: "easeInOutSine",
      },
      direction: "alternate",
    });
  };

  animationEffectText = () => {
    let animationRefText = this.textRef.current;
    animationRefText = anime({
      targets: ".title-text",
      opacity: [0, 1],
      easing: "linear",
    });
  };

  startProgram = () => {
    this.animationEffect();
    this.animationEffectText();
  };

  render() {
    return (
      <div className="title-wrapper">
        <div className="title" onClick={this.startProgram}>
          <Typography className="title-text" variant="overline" fontSize={48}>
            Start Visuals
          </Typography>
        </div>
      </div>
    );
  }
}
