import React from "react";
import logo from "./logo.png";
import "./App.css";
import Colourpicker from "./Colourpicker";
import Animations from "./Animations";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colourpicker: false,
      colors: [],
    };
  }
  showColourPicker = () => {
    //console.log("showColorPicker");
    this.setState({ colourpicker: true });
  };

  addColor = (color) => {
    if (this.state.colors.length < 4)
      this.setState({ colors: [...this.state.colors, color] });
  };

  render() {
    const col1 = { background: this.state.colors[0] };
    const col2 = { background: this.state.colors[1] };
    const col3 = { background: this.state.colors[2] };
    const col4 = { background: this.state.colors[3] };
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          {this.state.colourpicker ? (
            <Colourpicker addNewCol={this.addColor} />
          ) : (
            <input
              type="submit"
              onClick={this.showColourPicker}
              value="Start"
            />
          )}
          <div style={col1}>
            <p>Hello World</p>
          </div>
          <div style={col2}>
            <p>Hello World</p>
          </div>
          <div style={col3}>
            <p>Hello World</p>
          </div>
          <div style={col4}>
            <p>Hello World</p>
          </div>
          <Animations rows={10} cols={20} colors={[this.state.colors]} />
        </header>
      </div>
    );
  }
}

export default App;
