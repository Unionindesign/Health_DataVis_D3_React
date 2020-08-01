import React from "react";
import "./scatterplot.css";
import * as d3 from "d3";

const ScatterPlot = (props) => {
  const svg = d3.select("#plot");

  const circle = svg
    .append("circle")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.6)
    .attr("stroke", "white")
    .attr("stroke-width", 3);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(props.data, props.xDimension));
  //.range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(props.data, props.yDimension));
  //.range([padding, height - padding]);

  return (
    <div className="scatterplot" id="plot">
      <h3>Scatterplot goes here</h3>
    </div>
  );
};

export default ScatterPlot;
