import React from "react";
import * as d3 from "d3";

const tran = (t) => t.duration(750);
const yLow = 180;
const yBase = 35;

const drawGame = function (div, data) {
  let { rows = 4, columns = 4 } = {
    rows: Number.parseInt(data.rows),
    columns: Number.parseInt(data.columns)
  };
  let size = 60,
    //holeIndex = Math.floor(Math.random() * rows * columns),
    holeIndex = rows * columns - 1,
    last;
  if (!rows || !columns) return;

  d3.select(div).selectAll("div").data([]).exit().remove();

  let tiles = d3
    .select(div)
    .selectAll("div")
    .data(d3.range(rows * columns))
    .enter()
    .append("div")
    .style("background-position", getPosition)
    .style("width", size + "px")
    .style("height", size + "px")
    .on("click", clickTile)
    .text((d) => d + 1)
    .call(move)
    .nodes();

  // console.log(tiles);

  tiles[holeIndex].remove();
  tiles[holeIndex] = null;
  let swapTime = 0;

  function clickTile() {
    const select = d3.select(d3.event.target);
    const nbs = getNeighbors(holeIndex);
    const cindex = select.datum();
    if (nbs.indexOf(cindex) === -1) return;

    const temp = holeIndex;

    tiles[holeIndex] = select.node();
    holeIndex = cindex;
    tiles[holeIndex] = null;
    select.datum(temp).call(move);
  }

  swap();

  function swap() {
    if (swapTime > 100) return;
    swapTime++;

    //console.log(swapTime);
    var destination = d3.shuffle(getNeighbors(holeIndex)).filter(function (d) {
      return tiles[d] !== last;
    })[0];

    last = tiles[destination];

    tiles[destination] = null;

    tiles[holeIndex] = last;

    d3.select(last)
      .datum(holeIndex)
      //.transition()
      //.duration(150)
      .call(move);
    //.on("end", swap);

    holeIndex = destination;
    swap();
  }

  function getPosition(d) {
    return "-" + getLeft(d) + " -" + getTop(d);
  }

  function getNeighbors(d) {
    var neighbors = [];

    var row = Math.floor(d / columns),
      column = d % columns;

    if (row > 0) {
      neighbors.push(d - columns);
    }

    if (row < rows - 1) {
      neighbors.push(d + columns);
    }

    if (column > 0) {
      neighbors.push(d - 1);
    }

    if (column < columns - 1) {
      neighbors.push(d + 1);
    }

    return neighbors;
  }

  function move(sel) {
    sel.style("top", getTop).style("left", getLeft);
  }

  function getTop(d) {
    return Math.floor(d / columns) * size + "px";
  }

  function getLeft(d) {
    return (d % columns) * size + "px";
  }
};

export default class Game extends React.PureComponent {
  componentDidMount() {
    drawGame(this.div, this.data());
  }

  componentDidUpdate() {
    console.log("updated1");
    drawGame(this.div, this.data());
  }

  data() {
    return this.props.matrix;
  }

  getDiv = (node) => {
    this.div = node;
  };

  render() {
    return <div ref={this.getDiv} />;
  }
}
