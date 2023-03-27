import React, { Component, useState } from 'react'
import { Table } from 'react-bootstrap';
import DataFetech from './dataFetech';
import { form_data } from './Menu-data';
import PropSchedule from './PropSchedule';
import ScheduleComp from './ScheduleComp';
import TableComp from './TableComp';


export default class VehicleSchedule extends Component{
  constructor(props){
    super(props);
    this.state = {fbData : [], data : [], table : []};
    this.child = React.createRef();
  }

  updateTable = () => {
    setTimeout(() => {
      this.child.current.fetchAll();
    }, 500)
  }

  getData = (data) => {
    let {fbData} = this.state;
    fbData = [];
    data.forEach(i => {
      if(i.field == "Vehicle Valuation/New Intimation")
        fbData.push(i)
    })
    this.setState({data : fbData, table : <ScheduleComp data={fbData} updateTable={this.updateTable}/>});
    console.log("state changed");
  }

  render(){
    return (
      <div style={{width : "94%", marginTop: "15px", marginLeft : "1%", marginBottom : "5%"}}>
        <DataFetech isTemplate={false} getData={this.getData} ref={this.child}/>
      <div>
        <h1>Vehicle Schedule</h1>
        {this.state.table}
      </div>
      </div>
    )
  }
}
