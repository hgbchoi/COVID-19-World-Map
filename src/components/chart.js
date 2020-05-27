import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Label} from 'recharts'

const Chart = (props) => {  
  
  const [formattedCasesData, setFormattedCasesData] = useState([]);
  const [formattedDeathsData, setFormattedDeathsData] = useState([]);
  const [formattedRecoveredData, setFormattedRecoveredData] = useState([]);  

  const getFormattedDataArray = (data, dtype) => {        
    return Object.keys(data[dtype]).map(i => ({"date": i, "count":data[dtype][i]}));
  }

  const formatDateString = (dateStr) => {    
    const date = new Date(dateStr);

    const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${mo}/${da}/${ye}`;
  }
  const getFormattedDataArrayCAN = (data) => {
    window.data = data;
    return data.map(i => ({"date": formatDateString(i.Date), "count":i.Cases}));
  }

  const getDateRange= (days) => {
    const currDateEpoch = new Date();
    currDateEpoch.setDate(currDateEpoch.getDate() - 1);    

    var currDate = new Date(currDateEpoch).toISOString();    

    var pastDateEpoch = new Date();
    pastDateEpoch.setDate(pastDateEpoch.getDate() - days);    

    var pastDate = new Date(pastDateEpoch).toISOString();
    
    return {currDate, pastDate}
  }


  useEffect(() => {
    if(props.selectedCountry){    
    fetch(`https://corona.lmao.ninja/v2/historical/${props.selectedCountry.iso2}?lastdays=45`)
      .then(res => res.json())
      .then(json => {
        setFormattedCasesData(getFormattedDataArray(json.timeline, "cases")); 
        setFormattedDeathsData(getFormattedDataArray(json.timeline, "deaths")); 
        if(props.selectedCountry.iso2 != "CA"){
        setFormattedRecoveredData(getFormattedDataArray(json.timeline, "recovered")); 
        }
        
      })      
      .catch(error => alert(`Data for ${props.selectedCountry.countryName} is not available`));          
    }

    if(props.selectedCountry.iso2 == "CA"){
    
    var dateRange = getDateRange(45);

    fetch(`https://api.covid19api.com/total/country/canada/status/recovered?from=${dateRange.pastDate}&to=${dateRange.currDate}`)  
    .then(res => res.json())
    .then(json => {
      console.log(getFormattedDataArrayCAN(json));
      setFormattedRecoveredData(getFormattedDataArrayCAN(json));
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

