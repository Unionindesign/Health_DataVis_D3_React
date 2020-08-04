import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { csv } from "d3";
import _ from "lodash";

//components
import ScatterPlot from "./components/scatterplot";

function App() {
  //intitial application state
  const [loadingData, setLoadingData] = useState(false);
  const [healthData, setHealthData] = useState([]);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  //update-able x and y dimensions
  const [xDimensionKey, setXDimensionKey] = useState("obesity");
  const [xDimensionData, setXDimensionData] = useState([]);
  const [yDimensionKey, setYDimensionKey] = useState("income");
  const [yDimensionData, setYDimensionData] = useState([]);
  //ref to chart container div node
  const chartContainerDiv = useRef(null);
  useEffect(() => {
    //when the app loads, set the loading state to true
    setLoadingData(true);
    //load the csv data with d3's csv method
    csv("./data/health_data.csv").then((data) => {
      console.log("Health Data: ", data);
      //load the data to the application state with the useState hook
      setHealthData(data);
      //calculate the size of the div when it loads, and pass this to chart component
      setChartWidth(chartContainerDiv.current.getBoundingClientRect().width);
      setChartHeight(chartContainerDiv.current.getBoundingClientRect().height);
      //set loading state to false
      setLoadingData(false);
    });
  }, []);

  const handleXDimensionSelect = (event) => {
    console.log("Select X: ", event.target.value);
    setXDimensionKey(event.target.value);
    setXDimensionData(
      healthData.map((d) => {
        return d[event.target.value];
      })
    );
  };
  const handleYDimensionSelect = (event) => {
    console.log("Select Y: ", event.target.value);
    setYDimensionKey(event.target.value);
    setYDimensionData(healthData.map((d) => d[event.target.value]));
  };

  return (
    <div className="App">
      <h1>Health Risk Factors</h1>
      <div className="chart-container">
        <div className="left-chart-main" ref={chartContainerDiv}>
          <ScatterPlot
            data={healthData}
            width={chartWidth}
            height={chartHeight}
            xDimensionKey={xDimensionKey}
            yDimensionKey={yDimensionKey}
            xDimensionData={
              _.isEmpty(xDimensionData)
                ? healthData.map((d) => d.obesity)
                : xDimensionData
            }
            yDimensionData={
              _.isEmpty(yDimensionData)
                ? healthData.map((d) => d.income)
                : yDimensionData
            }
          />
        </div>
        <div className="right-chart-filters">
          <h5>Filters:</h5>
          <form>
            <label>Health Indicators:</label>
            <select onChange={handleXDimensionSelect}>
              <option value="age">Age</option>
              <option value="obesity" default>
                Obesity
              </option>
              <option value="smokes">Smokes</option>
            </select>
          </form>
          <form>
            <label>Environmental Factors:</label>
            <select onChange={handleYDimensionSelect}>
              <option value="poverty">Poverty</option>
              <option value="healthcare">Health Care</option>
              <option value="income" default>
                Income
              </option>
            </select>
          </form>
        </div>
      </div>
      <h5>
        Data Source:{" "}
        <a
          className="App-link"
          href="https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          {loadingData
            ? "Loading..."
            : "U.S. Census Bureau and the Behavioral Risk Factor Surveillance System - 2014 ACS 1-year estimates"}
        </a>
      </h5>
    </div>
  );
}

export default App;
