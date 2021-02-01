import React from "react";
import * as d3 from "d3";

const data = ["a", "b", "f"];
const tran = (t) => t.duration(750);
const yLow = 180;
const yBase = 35;

const draw = (svg, data) => {
  const text = svg.selectAll("text").data(data, (d) => d);
  text
    .enter()
    .append("text")
    .attr("fill", "purple")
    .attr("y", yLow)
    .attr("x", (d, i) => 32 * i)
    .text((d) => d)
    //.transition()
    .attr("y", yBase);
  text
    //.transition()
    .attr("x", (d, i) => 32 * i)
    .attr("y", yBase);
  text
    .exit()
    .attr("fill", "red")
    //.transition()
    .attr("y", yLow)
    .remove();
};

const getDiv = (div) => {
  const svg = d3
    .select(div)
    .text("Draw!")
    .append("svg")
    .style("border", "1px solid black");
  draw(svg, this.props.data);
  // setTimeout(() => {
  //   draw(svg, ['a', 'b', 'f', 'g'])
  //   setTimeout(() => {
  //     draw(svg, ['b', 'z', 'a'])
  //   }, 2000);
  // }, 2000);
};

export default class Chart extends React.PureComponent {
  componentDidMount() {
    this.svg = d3
      .select(this.div)
      .append("svg")
      .style("border", "1px solid black");
    draw(this.svg, this.data());
  }

  componentDidUpdate() {
    draw(this.svg, this.data());
  }

  data() {
    return this.props.text.split("");
  }

  getDiv = (node) => {
    this.div = node;
  };

  render() {
    return <div ref={this.getDiv} />;
  }
}
