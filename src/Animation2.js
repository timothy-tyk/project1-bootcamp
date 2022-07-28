import anime from "animejs/lib/anime.es.js";
import React from "react";

export default class Animations2 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(null);
    this.state = {
      color: this.props.colors[0][0],
      colorCount: 0,
    };
  }

  animationEffect = () => {
    let animationRef = this.myRef.current;
    // animationRef = anime({
    //   targets: ".overall-container .box2",
    //   stranslateX: anime.stagger(10, {
    //     grid: [this.props.rows, this.props.cols],
    //     from: anime.random(0, this.props.rows * this.props.cols),
    //     axis: "x",
    //   }),
    //   translateY: anime.stagger(10, {
    //     grid: [this.props.rows, this.props.cols],
    //     from: anime.random(0, this.props.rows * this.props.cols),
    //     axis: "y",
    //   }),
    //   rotateZ: anime.stagger([0, 150], {
    //     grid: [this.props.rows, this.props.cols],
    //     from: anime.random(0, this.props.rows * this.props.cols),
    //     axis: "x",
    //   }),
    //   delay: anime.stagger(200, {
    //     grid: [this.props.rows, this.props.cols],
    //     from: anime.random(0, this.props.rows * this.props.cols),
    //     //from: "center",
    //   }),
    //   easing: "easeInOutQuad",
    // });
    let grid = [this.props.cols, this.props.rows];
    animationRef = anime
      .timeline({
        targets: ".overall-container .box2",
        easing: "easeInOutSine",
        delay: anime.stagger(50),
        loop: true,
        autoplay: false,
      })
      .add({
        translateX: [
          {
            value: anime.stagger("-.1rem", {
              grid: grid,
              from: "center",
              axis: "x",
            }),
          },
          {
            value: anime.stagger(".1rem", {
              grid: grid,
              from: "center",
              axis: "x",
            }),
          },
        ],
        translateY: [
          {
            value: anime.stagger("-.1rem", {
              grid: grid,
              from: "center",
              axis: "y",
            }),
          },
          {
            value: anime.stagger(".1rem", {
              grid: grid,
              from: "center",
              axis: "y",
            }),
          },
        ],
        duration: 1000,
        scale: 0.5,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
      })
      .add({
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-10, 10),
        delay: anime.stagger(8, { from: "last" }),
      })
      .add({
        translateX: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "x",
        }),
        translateY: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "y",
        }),
        rotate: 0,
        scaleX: 2.5,
        scaleY: 0.25,
        delay: anime.stagger(4, { from: "center" }),
      })
      .add({
        rotate: anime.stagger([90, 0], { grid: grid, from: "center" }),
        delay: anime.stagger(50, { grid: grid, from: "center" }),
      })
      .add({
        translateX: 0,
        translateY: 0,
        scale: 0.5,
        scaleX: 1,
        rotate: 180,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
      })
      .add({
        scaleY: 1,
        scale: 1,
        delay: anime.stagger(20, { grid: grid, from: "center" }),
      });
    animationRef.play();
  };

  updateColorCount = () => {
    this.setState({
      colorCount:
        this.state.colorCount === this.props.colors[0].length - 1
          ? 0
          : this.state.colorCount + 1,
    });
    console.log(this.state.colorCount);
  };

  updateColor = () => {
    this.setState({
      color: this.props.colors[0][this.state.colorCount],
    });
  };

  componentDidMount() {
    this.animationEffect();
    this.timerId = setInterval(() => {
      this.updateColorCount();
      this.updateColor();
      // this.animationEffect();
    }, 5000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.pause !== prevProps.pause) {
      this.animationEffect();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let gridRows = [];
    let gridLayout = [];
    for (let i = 0; i < this.props.rows; i++) {
      gridRows.push(
        <div className="box2" style={{ backgroundColor: this.state.color }} />
      );
    }

    for (let i = 0; i < this.props.cols; i++) {
      gridLayout.push(<div className="containers">{gridRows}</div>);
    }

    return (
      <div className="App">
        <br />
        <br />
        <div className="overall-container">{gridLayout}</div>
      </div>
    );
  }
}
