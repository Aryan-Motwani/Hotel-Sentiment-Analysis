import { MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { db } from './firebase'
import DropDown from './forms/DropDown'
import { form_data } from './Menu-data'
import ReportTable from './ReportTable'

export default class PropertyCreateReport extends Component {
  constructor(props){
    super(props);
    this.child = React.createRef();
    this.state = {updateId : "",tempName : " ", subValues : ["a","b"], subDrop : <select></select>, reporttable : <ReportTable ref={this.child} editData={this.editData}/>}
  }


    editData = (value) => {
      console.log(value.name);
      this.setState({updateId : value.id})
      setTimeout(() => {

        document.querySelector('input').value = value.name
        document.querySelectorAll('select')[0].value = value.format
        document.querySelectorAll('select')[1].value = value.category
        document.querySelector('.save-btn').textContent = 'update'
      },300)
    }

    handleSave = (e) => {
      let format = document.querySelectorAll("select")[0].value;
      let category = document.querySelectorAll("select")[1].value;;
      let name = document.querySelector("input").value;
      if(name[0] == " ") name = name.slice(1)
      let data = {format,category,name}

      if(e.target.textContent == "update"){
        data["id"] = this.state.updateId;
        db.collection("templates").doc(this.state.updateId).update(data);
        document.querySelector('.save-btn').textContent = 'save'
        document.querySelector('input').value = ''
      }else{
        data["id"] = uuid()
        db.collection("templates").doc(data.id).set(data)
        document.querySelector('input').value = ''
      }

      setTimeout(() => {
        this.setState({reporttable : <ReportTable ref={this.child} editData={this.editData}/>})
        this.child.current.updateTable();
      }, 300);
    }




    render(){

      return (
        <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{width:"10%"}}>
        <h1>Create New Report</h1>
        <p></p>
        <MDBInput label={'Template Name'} value={this.state.tempName} onChange={(e) => {this.setState({tempName : e.target.value})}}></MDBInput>
        <p></p>
        Format :
        <select>
          <option>Excel</option>
          <option>Word</option>
        </select>
        <p></p>
        Category :
        <select onChange={this.handleOption}>
          <option>Vehicle Valuation</option>
          <option>Property Valuation</option>
        </select>
        <p></p>
        <Button className='save-btn' onClick={this.handleSave}>Save</Button>
        {this.state.reporttable}
        </MDBContainer>
    </div>
  )
}
}