import React, { useState, useEffect } from "react";
import "./App.css";
import { csv } from "d3";
// import { range } from "d3-array";
// import { scaleOrdinal } from "d3-scale";

//components
import ScatterPlot from "./components/scatterplot";

function App() {
  const [loadingData, setLoadingData] = useState(false);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    setLoadingData(true);
    csv("./data/health_data.csv").then((data) => {
      console.log("Health Data: ", data);
      setHealthData(data);
      setLoadingData(false);
    });
  }, []);

  return (
    <div className="App">
      <h1>Health Risk Factors</h1>
      <div className="chart-container">
        <div className="left-chart-main" id="plot">
          <ScatterPlot
            data={healthData}
            xDimension={(d) => d.number1}
            yDimension={(d) => d.number2}
          />
        </div>
        <div className="right-chart-filters">
          <h5>Filters:</h5>
          <form>
            <label>Options</label>
            <select>
              <option>option 1</option>
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
