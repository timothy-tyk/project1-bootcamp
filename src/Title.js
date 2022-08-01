import React from "react";
import { Typography } from "@mui/material";
import anime from "animejs";

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.textRef = React.createRef(null);
  }

  animationEffect = () => {
    let animationRef = this.myRef.current;
    console.log("animating");
    animationRef = anime({
      targets: ".title",
      rotate: {
        value: "+=1turn", // 0 + 2 = '2turn'
        duration: 5000,
        easing: "linear",
      },
      loop: true,
      autoplay: true,
    });
  };

  componentDidMount() {
    this.animationEffect();
  }

  startProgram = () => {
    this.props.onChange();
  };

  render() {
    return (
      <div className="title-wrapper">
        <div className="title" onClick={this.startProgram}>
          <div className="title-text">
            <Typography
              variant="overline"
              fontSize={48}
              sx={{ fontFamily: "Liquid Pixel" }}
            >
              #letsjam
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
