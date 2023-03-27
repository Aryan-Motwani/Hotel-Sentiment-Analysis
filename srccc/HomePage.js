import React, { useEffect, useState } from 'react'
import './homepage.css'
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import PollIcon from '@mui/icons-material/Poll';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import RuleIcon from '@mui/icons-material/Rule';
import DataFetech from './dataFetech';
import { logDOM } from '@testing-library/react';
import { components } from 'react-select';
import { Button } from 'react-bootstrap';


export default function HomePage() {
    const [dataValues, setDataValues] = useState([0,4,7,12,23,12])

    const [charts, setCharts] = useState()

    

    const handleClick = (e) => {
        let element;
        // console.log(e.target);
        switch(e.target.nodeName){
            case "H6":
            element = e.target.nextElementSibling.textContent
            break;

            case "SPAN":
            element = e.target.textContent;
            break;
            
            case "svg":
            element = e.target.parentElement.nextElementSibling.children[1].textContent;
            break;

            case "DIV":
            element = e.target.classList.contains("one") ? e.target.nextElementSibling.children[1].textContent : e.target.children[1].textContent
            break;
        }
        
        switch(element){
            case "Employees":
            window.location.pathname = "/Employee"
            break;

            case "Total Surveys":
            case "Completed Surveys":
            case "Incomplete Surveys":
            case "Vehicle Surveys":
            window.location.pathname = "/Table/Vehicle Valuation/New Intimation"
            break;

            case "Property Surveys":
            window.location.pathname = "/Table/Property Valuation/New Intimation"
            break;
            }
        }

    const getData = (data) => {
        let emp = 0;
        let total = 0;
        let incomp = 0;
        let vehicle = 0;
        let property = 0;
        data.forEach(i => {
            if(i.field == "Master/Employee")
                emp++;
            if(i.field == "Vehicle Valuation/New Intimation" || i.field == "Property Valuation/New Intimation"){
                if(i.field == "Vehicle Valuation/New Intimation"){
                    vehicle++;
                    if(Object.keys(i.data).indexOf("Report Data") == -1)
                        incomp++;
                }
                if(i.field == "Property Valuation/New Intimation"){
                    property++
                    if(Object.keys(i.data).indexOf("Inspection Time") != -1)
                        incomp++;
                }
                total++;
            }
        })
        dataValues[0] = emp;
        dataValues[1] = total;
        dataValues[2] = total;
        dataValues[3] = incomp;
        dataValues[4] = vehicle;
        dataValues[5] = property;
        // setDataValues(dataValues)
        setCharts(<div>
            <div className='main'>
                
            <div className='rect' onClick={handleClick}>
            <div className='one' style={{background: "#665ca7"}}><PersonIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "#7266ba"}}>
                <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[0]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Employees</span>
            </div>
        </div>
        
        <div className='rect' onClick={handleClick}>
            <div className='one' style={{background: "#3b94dd"}}><PollIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "#42a5f6"}}>
                <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[1]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Total Surveys</span>
            </div>
        </div>
        
        <div className='rect' onClick={handleClick}>
            
            <div className='one' style={{background: "rgb(242 182 48)"}}><RuleIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "rgb(242 221 0)"}}>
                <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[2]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Completed Surveys</span>
            </div>
        </div>
        
        </div>
        <div className='main'>
        <div className='rect' onClick={handleClick}>
            <div className='one' style={{background: "#de5474"}}><RuleIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "#f75d81"}}>
                <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[3]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Incomplete Surveys</span>
            </div>
        </div>
        <div className='rect' onClick={handleClick}>
            
            <div className='one' style={{background: "#71bd1d"}}><DirectionsCarIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "#7ed320"}}>
                <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[4]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Vehicle Surveys</span>
            </div>
            </div>
            <div className='rect' onClick={handleClick}>
            <div className='one' style={{background: "#de5474"}}><HomeIcon style={{height : "80px", width : "80px", margin : "30px", marginBottom : "0px"}}/></div>
            <div className='two' style={{background: "#f75d81"}}>
            <h6 style={{margin : "20px", fontSize: "30px", marginBottom : "0px"}}>{dataValues[4]}</h6>
                <span style={{marginLeft : "15px", fontSize: "20px"}}>Property Surveys</span>
            </div>
            </div>
            </div>
        
        </div>)
    }

    



  return (
    <div>
    {/* <img style={{margin: "5px 40%" }} src={'https://firebasestorage.googleapis.com/v0/b/survey-app-3db7b.appspot.com/o/3808dc7e-7c97-da28-4b4d-b130089aab89?alt=media&token=96ee42a9-ca6d-4f6e-a9f8-b18b8ef8ad6e'}></img> */}
    <h1 style={{margin: "55px 40%" }}>Survey App</h1>
    <DataFetech isTemplate={false} getData={getData}/>
    {charts}
    </div>
  )
}
