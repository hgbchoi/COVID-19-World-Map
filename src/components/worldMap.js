import React, {useEffect, useState} from 'react';
import { scalePow } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,  
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = (props) => {
  const colorScale = scalePow().exponent(0.25)
  .domain([0, Math.max.apply(Math, props.mapData.map(function(o) { return o[props.mapDataType]; }))])
  .range(["#3BB143", "#FF0000"]);
  
  return (
    <div className="world-map-container center">
      <ComposableMap data-tip="" width="1000" height="600" >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const d = props.mapData.find(
                  s => s.countryInfo.iso2 === geo.properties.ISO_A2
                );
                return(
                  <Geography
                  key={geo.rsmKey}
                  geography={geo}                  
                  fill={d ? colorScale(d[props.mapDataType]) : "#44444433"}                  
                  onMouseEnter={() => {         
                    props.setTooltipContent(`${d ? d.country:'N/A'}<br />
                                             Total Cases: ${d ? d.cases:'N/A'}<br />
                                             Total Deaths: ${d ? d.deaths:'N/A'}<br />
                                             New Cases Today: ${d ? d.todayCases:'N/A'}<br />
                                             Cases Per Million: ${d ? d.casesPerOneMillion:'N/A'}<br />
                                             Deaths Per Million: ${d ? d.deathsPerOneMillion:'N/A'}<br />
                                             `);
                   
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  onClick={() => {
                    props.setSelectedCountry(d ? {"iso2": d.countryInfo.iso2, "countryName": d.country }: null);
                  }}
                  style={{                    
                    hover: {
                      fill: "#00FF00",
                      outline: "none"
                    }            
                  }}                
                  />
                )})                
              }                                                                  
          </Geographies>
     </ComposableMap>
      
    </div>
  );
};

export default WorldMap;