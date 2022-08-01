import anime from "animejs/lib/anime.es.js";
import React from "react";

export default class Colorslide extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
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

  deleteColor = (e) => {
    let colorIndex = Number(e.target.innerText) - 1;
    console.log(colorIndex);
    this.props.onClick(colorIndex);
  };

  render() {
    console.log(this.props.colors.length);
    let circleRow = [];
    for (let i = 0; i < this.props.colors.length; i++) {
      circleRow.push(
        <div
          className="boxColors"
          style={{ background: this.props.colors[i] }}
          onClick={this.deleteColor}
          onPointerOver={<p>x</p>}
        >
          <p className="circleText">{i + 1}</p>
        </div>
      );
    }
    console.log(circleRow);

    return <div className="containersSlide">{circleRow}</div>;
  }
}
