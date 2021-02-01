import React from "react";
import { render } from "react-dom";
import Game from "./Game";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class SApp extends React.Component {
  state = { rows: 4, columns: 4 };

  render() {
    return (
      <App
        onChange={(ev, value) =>
          this.setState(() => Object.assign(this.state, value))
        }
        value={this.state}
      />
    );
  }
}

let tclass=['c','b']

const App = ({ value, onChange }) => (
  <div style={styles} abc={styles} >
    <input
      type="number"
      {...{
        value: value.rows,
        onChange: (ev) => {
          onChange(ev, { rows: ev.target.value });
        }
      }}
    />

    <input
      type="number"
      {...{
        value: value.columns,
        onChange: (ev) => {
          onChange(ev, { columns: ev.target.value });
        }
      }}
    />
    <Game matrix={value} />
  </div>
);

render(<SApp />, document.getElementById("root"));
