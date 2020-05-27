import React, {useEffect, useState} from 'react';

export const WorldData = () => {

    const [worldData, setWorldData] = useState({});    

    useEffect(() => {
        fetch("https://corona.lmao.ninja/v2/all")
        .then(res => res.json())
        .then(j => {            
            setWorldData(j);
        });                             
    }, []);
    
    return(       
        <div className="world-data">
            <div className="world-data-item item1">
                <span className="world-data-item-content">Total Cases (Global): {worldData ? worldData.cases : "Loading..."}</span>                
            </div>
            <div className="world-data-item item2">
                <span className="world-data-item-content">Total Deaths (Global): {worldData ? worldData.deaths : "Loading..."}</span>                
            </div>
            <div className="world-data-item item3">
                <span className="world-data-item-content">Total Recovered (Global): {worldData ? worldData.recovered : "Loading..."}</span>                
            </div>
        </div>
    );     

}

export default WorldData;