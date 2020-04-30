import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Label} from 'recharts'

const Chart = (props) => {  
  
  const [formattedCasesData, setFormattedCasesData] = useState([]);
  const [formattedDeathsData, setFormattedDeathsData] = useState([]);
  const [formattedRecoveredData, setFormattedRecoveredData] = useState([]);  

  const getFormattedDataArray = (data, dtype) => {    
    return Object.keys(data[dtype]).map(i => ({"date": i, "count":data[dtype][i]}));
  }

  useEffect(() => {
    if(props.selectedCountry){    
    fetch(`https://corona.lmao.ninja/v2/historical/${props.selectedCountry.iso2}?lastdays=45`)
      .then(res => res.json())
      .then(json => {
        setFormattedCasesData(getFormattedDataArray(json.timeline, "cases")); 
        setFormattedDeathsData(getFormattedDataArray(json.timeline, "deaths")); 
        setFormattedRecoveredData(getFormattedDataArray(json.timeline, "recovered")); 
      })      
      .catch(error => alert(`Data for ${props.selectedCountry.countryName} is not available`));          
    }
  }, [props.selectedCountry]);  

  return (
    <div className="chart-container">        
    <div className="center chart-title">{props.selectedCountry ? "Total Cases in " + props.selectedCountry.countryName : "Data Not Available" }</div>      
      <ResponsiveContainer>              
        <LineChart className="center show-overflow line-chart" width={1920} height={1080} data={formattedCasesData.length > 0 ? formattedCasesData: null}>                    
          <XAxis dataKey="date" tick={{ fill: '#888888' }}>
            <Label value="Date" offset={-10} position="insideBottom" style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </XAxis>          
          <YAxis tick={{ fill: '#888888'}}>            
            <Label value="Number Of Cases" angle={-90} offset={-10} position="insideLeft"  style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </YAxis>
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <Tooltip />
        </LineChart>        
      </ResponsiveContainer>            
      <div className="center chart-title">{props.selectedCountry ? "Total Deaths in " + props.selectedCountry.countryName : "Data Not Available"  }</div>    
      <ResponsiveContainer>              
        <LineChart className="center show-overflow line-chart" width={1920} height={1080} data={formattedDeathsData.length > 0 ? formattedDeathsData: null}>                    
          <XAxis dataKey="date" tick={{ fill: '#888888' }}>
            <Label value="Date" offset={-10} position="insideBottom" style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </XAxis>          
          <YAxis tick={{ fill: '#888888'}}>            
            <Label value="Number Of Cases" angle={-90} offset={-10} position="insideLeft"  style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </YAxis>
          <Line type="monotone" dataKey="count" stroke="#FF0000" />
          <Tooltip />
        </LineChart>        
      </ResponsiveContainer>            
      <div className="center chart-title">{props.selectedCountry ? "Total Recovered in " + props.selectedCountry.countryName : "Data Not Available" }</div>      
      <ResponsiveContainer>              
        <LineChart className="center show-overflow line-chart" width={1920} height={1080} data={formattedRecoveredData.length > 0 ? formattedRecoveredData: null}>                    
          <XAxis dataKey="date" tick={{ fill: '#888888' }}>
            <Label value="Date" offset={-10} position="insideBottom" style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </XAxis>          
          <YAxis tick={{ fill: '#888888'}}>            
            <Label value="Number Of Cases" angle={-90} offset={-10} position="insideLeft"  style={{ textAnchor: 'middle', fill: '#888888' }}/>            
          </YAxis>
          <Line type="monotone" dataKey="count" stroke="#33FF00" />
          <Tooltip />
        </LineChart>        
      </ResponsiveContainer>                  
    </div>
    
  );
};

export default Chart;

