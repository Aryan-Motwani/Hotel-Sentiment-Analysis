import { MDBContainer } from 'mdb-react-ui-kit'
import React, { Component, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import DataFetech from './dataFetech';
import ReportTableComp from './ReportTableComp';
import TemplateFetch from './TemplateFetch';
import { db } from './firebase'


export default class ReportTable extends Component{
    constructor(props){
        super(props)
        this.state = {data : [], tablecomp : <ReportTableComp handleDelete={this.handleDelete} data={[]}/>};
        this.child = React.createRef();

    }
    
    updateTable = () => {
        setTimeout(() => {
          this.child.current.fetchAll();
        }, 500)
      }

    handleEdit = (i) => {
        let {data} = this.state;
        this.props.editData(data[i])
    }

    handleDelete = (i) => {
        let {data} = this.state;
        console.log(data[i]);
        db.collection("templates").doc(data[i].id).delete().then(i => {
            this.updateTable();
        })

    }

    getTemplateData = (data) => {
        let dataa = [];
        data.forEach(i => {
            console.log(i.category,window.location.pathname.split("/")[2].split("%20").join(" "),i.category == window.location.pathname.split("%20").join(" "));
            if(i.category == window.location.pathname.split("/")[2].split("%20").join(" "))
                dataa.push(i.name)
        })
        console.log({dataa});
        setTimeout(() => {
            this.setState({tablecomp : <ReportTableComp handleDelete={this.handleDelete} handleEdit={this.handleEdit} updateTable={this.updateTable} data={dataa}/>, data:data})
        }, 500)
    }

    render(){
        return (
        <div>
        <TemplateFetch isTemplate={true} getTemplateData={this.getTemplateData} ref={this.child}/>
        {this.state.tablecomp}
        {/* <Button onClick={this.handleEdit}>Click</Button> */}
    </div>
  )
}
}