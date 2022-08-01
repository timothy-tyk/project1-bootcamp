import anime from "animejs/lib/anime.es.js";
import React from "react";

// export default function Animations() {
//   for
//   const animationRef = React.useRef(null);
//   React.useEffect(() => {
//     animationRef.current = anime({
//       targets: ".el",
//       translateX: 250,
//     });
//   }, []);
//   return (
//     <div className="App">
//       <button onClick={() => animationRef.current.restart()}>Restart</button>
//       {layout}
//       <div className="el" />
//     </div>
//   );
// }

export default class Animations extends React.Component {
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
      targets: ".overall-container .box",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(200, {
        grid: [this.props.rows, this.props.cols],
        from: anime.random(0, this.props.rows * this.props.cols),
      }),
      loop: true,
    });
    console.log(anime.random(0, this.props.rows * this.props.cols));
  };

  updateColorCount = () => {
    console.log("updateCount");
    this.setState({
      colorCount:
        this.state.colorCount === this.props.colors[0].length - 1
          ? 0
          : this.state.colorCount + 1,
    });
  };

  updateColor = () => {
    console.log(this.state.colorCount);
    console.log(this.state.colorCount % this.props.colors.length);
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
    }, 7000);
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
        <div className="box" style={{ backgroundColor: this.state.color }} />
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
