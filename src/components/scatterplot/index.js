import React, { useEffect, useRef, useState } from "react";
import "./scatterplot.css";
import * as d3 from "d3";

const ScatterPlot = (props) => {
  //references to DOM nodes
  const chartRef = useRef(null);
  //state for width and height to be updated from props
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);
  const [padding, setPadding] = useState(10);
  useEffect(() => {
    if (!chartRef.current) return;

    console.log(props);
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    //todo - something here may be upsetting the chart margins
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    setWidth(width);
    setHeight(height);
    setPadding(10);
    //const svg = d3.select(chartRef.current);
  }, [props]);
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(props.xDimensionData))
    // .domain([d3.min(props.xDimensionData), d3.max(props.xDimensionData)])
    .range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(props.yDimensionData))
    // .domain([d3.min(props.yDimensionData), d3.max(props.yDimensionData)])
    .range([padding, height - padding]);

  return (
    <svg ref={chartRef} width={width} height={height}>
      <g>
        {props.data.map((d) => (
          <>
            <circle
              key={d.id}
              className="circles"
              r={9}
              cx={xScale(d[props.xDimensionKey])}
              cy={yScale(d[props.yDimensionKey])}
            />
            <text
              key={d.state}
              className="circle-text"
              dx={xScale(d[props.xDimensionKey])}
              dy={yScale(d[props.yDimensionKey])}
            >
              {d.abbr}
            </text>
          </>
        ))}
      </g>
    </svg>
  );
};

export default ScatterPlot;
