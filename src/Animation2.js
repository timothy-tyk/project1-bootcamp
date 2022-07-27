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
    animationRef = anime({
      targets: ".overall-container .box2",
      stranslateX: anime.stagger(10, {
        grid: [this.props.rows, this.props.cols],
        from: anime.random(0, this.props.rows * this.props.cols),
        axis: "x",
      }),
      translateY: anime.stagger(10, {
        grid: [this.props.rows, this.props.cols],
        from: anime.random(0, this.props.rows * this.props.cols),
        axis: "y",
      }),
      rotateZ: anime.stagger([0, 150], {
        grid: [this.props.rows, this.props.cols],
        from: anime.random(0, this.props.rows * this.props.cols),
        axis: "x",
      }),
      delay: anime.stagger(200, {
        grid: [this.props.rows, this.props.cols],
        from: anime.random(0, this.props.rows * this.props.cols),
        //from: "center",
      }),
      easing: "easeInOutQuad",
    });
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
      this.animationEffect();
    }, 5300);
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
