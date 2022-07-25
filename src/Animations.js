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
    this.state = { color: this.props.colors[0][0], colorCount: 0 };
  }
  startAnimation = (animationRef) => {
    if (!this.props.start) {
      animationRef.pause();
    } else {
      animationRef.play();
    }
  };

  animationEffect = () => {
    console.log("animation effect");
    let animationRef = this.myRef.current;
    // animationRef = anime({
    //   targets: ".box",
    //   translateX: 250,
    //   loop: true,
    // });

    animationRef = anime({
      targets: ".overall-container .box",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(200, {
        grid: [this.props.rows, this.props.cols],
        from: "center",
      }),
      loop: true,
    });
  };

  updateColorCount = () => {
    console.log("updateCount");
    this.setState({
      colorCount:
        this.state.colorCount === this.props.colors[0].length - 1
          ? 0
          : this.state.colorCount + 1,
    });
    console.log(this.state.colorCount);
  };

  updateColor = () => {
    console.log("updateColor");
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
    }, 5000);
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
        {/* <button onClick={this.animationEffect}>Start</button> */}
        <br />
        <br />
        <div className="overall-container">{gridLayout}</div>
      </div>
    );
  }
}

// function fitElementToParent(el, padding) {
//   var timeout = null;
//   function resize() {
//     if (timeout) clearTimeout(timeout);
//     anime.set(el, { scale: 1 });
//     var pad = padding || 0;
//     var parentEl = el.parentNode;
//     var elOffsetWidth = el.offsetWidth - pad;
//     var parentOffsetWidth = parentEl.offsetWidth;
//     var ratio = parentOffsetWidth / elOffsetWidth;
//     timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
//   }
//   resize();
//   window.addEventListener("resize", resize);
// }

// var advancedStaggeringAnimation = (function () {
//   var staggerVisualizerEl = document.querySelector(".stagger-visualizer");
//   var dotsWrapperEl = staggerVisualizerEl.querySelector(".dots-wrapper");
//   var dotsFragment = document.createDocumentFragment();
//   var grid = [20, 10];
//   var cell = 55;
//   var numberOfElements = grid[0] * grid[1];
//   var animation;
//   var paused = true;

//   fitElementToParent(staggerVisualizerEl, 0);

//   for (var i = 0; i < numberOfElements; i++) {
//     var dotEl = document.createElement("div");
//     dotEl.classList.add("dot");
//     dotsFragment.appendChild(dotEl);
//   }

//   dotsWrapperEl.appendChild(dotsFragment);

//   var index = anime.random(0, numberOfElements - 1);
//   var nextIndex = 0;

//   anime.set(".stagger-visualizer .cursor", {
//     translateX: anime.stagger(-cell, { grid: grid, from: index, axis: "x" }),
//     translateY: anime.stagger(-cell, { grid: grid, from: index, axis: "y" }),
//     translateZ: 0,
//     scale: 1.5,
//   });

//   function play() {
//     paused = false;
//     if (animation) animation.pause();

//     nextIndex = anime.random(0, numberOfElements - 1);

//     animation = anime
//       .timeline({
//         easing: "easeInOutQuad",
//         complete: play,
//       })
//       .add({
//         targets: ".stagger-visualizer .cursor",
//         keyframes: [
//           { scale: 0.75, duration: 120 },
//           { scale: 2.5, duration: 220 },
//           { scale: 1.5, duration: 450 },
//         ],
//         duration: 300,
//       })
//       .add(
//         {
//           targets: ".stagger-visualizer .dot",
//           keyframes: [
//             {
//               translateX: anime.stagger("-2px", {
//                 grid: grid,
//                 from: index,
//                 axis: "x",
//               }),
//               translateY: anime.stagger("-2px", {
//                 grid: grid,
//                 from: index,
//                 axis: "y",
//               }),
//               duration: 100,
//             },
//             {
//               translateX: anime.stagger("4px", {
//                 grid: grid,
//                 from: index,
//                 axis: "x",
//               }),
//               translateY: anime.stagger("4px", {
//                 grid: grid,
//                 from: index,
//                 axis: "y",
//               }),
//               scale: anime.stagger([2.6, 1], { grid: grid, from: index }),
//               duration: 225,
//             },
//             {
//               translateX: 0,
//               translateY: 0,
//               scale: 1,
//               duration: 1200,
//             },
//           ],
//           delay: anime.stagger(80, { grid: grid, from: index }),
//         },
//         30
//       )
//       .add(
//         {
//           targets: ".stagger-visualizer .cursor",
//           translateX: {
//             value: anime.stagger(-cell, {
//               grid: grid,
//               from: nextIndex,
//               axis: "x",
//             }),
//           },
//           translateY: {
//             value: anime.stagger(-cell, {
//               grid: grid,
//               from: nextIndex,
//               axis: "y",
//             }),
//           },
//           scale: 1.5,
//           easing: "cubicBezier(.075, .2, .165, 1)",
//         },
//         "-=800"
//       );

//     index = nextIndex;
//   }

//   play();
// })();
