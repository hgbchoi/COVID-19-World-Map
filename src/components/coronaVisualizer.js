import React, {useEffect, useState, useCallback} from 'react';
import WorldMap from "./worldMap";
import Chart from "./chart";
import WorldData from "./worldData";
import ReactTooltip from "react-tooltip";

export const CoronaVisualizer = () => {

    const [allData, setAllData] = useState([]);    
    const [tooltipContent, setTooltipContent] = useState("");
    const [mapDataType, setMapDataType] = useState("cases")
    const [selectedCountry, setSelectedCountry] = useState({"iso2":"US",
                                                            "countryName":"USA"})

    useEffect(() => {
        fetch("https://corona.lmao.ninja/v2/countries")
        .then(res => res.json())
        .then(j => {            
            setAllData(j);
        });                             
    }, []);

    const handleCountrySelect = (code) => {
        setSelectedCountry(code);
    }

    return(
        <div>
            <WorldData/>
            <div>Map Data:</div>
            <select className="center" onChange={(e) => setMapDataType(e.target.value)}>
                <option value="cases">Total Cases</option>
                <option value="deaths">Deaths</option>
                <option value="todayCases">Cases Today</option>
                <option value="casesPerOneMillion">Cases Per Million</option>
                <option value="deathsPerOneMillion">Deaths Per Million</option>                            
            </select>
            <p>Click on any country on the map to see charts below: </p>
            <ReactTooltip html={true} className='tooltip'>{tooltipContent}</ReactTooltip>
            <WorldMap mapDataType={mapDataType} setSelectedCountry = {handleCountrySelect} setTooltipContent={setTooltipContent} mapData={allData}/>            
            <Chart selectedCountry={selectedCountry}/>
        </div>
    );     

}

export default CoronaVisualizer;