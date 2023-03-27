import { MDBContainer, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import { Button } from 'react-bootstrap';
import { components } from 'react-select';
import Table from 'react-bootstrap/Table';
import React, { Component, useState } from 'react'
import TableComp from './TableComp';
import { app } from "./firebase";
import './firebase'
import {db} from './firebase'
import uuid from 'react-uuid';
import DataFetech from './dataFetech';
import Validation from './Validation';


export default class Employee extends Component{
    constructor(props){
        super(props)
        this.state = {record: {},fileUrl : null, emps : [], users : [], rows : [], data : [], vals : {"Empolyee Name": "", "Mobile Number": "", "Email Id": "", "Address": "", "Aadhar Number": "", "Pan Number": "", "Profile": ""}, validatedIn : false};
        this.child = React.createRef();
        this.formRef = React.createRef();
    }

  onSubmit = async () => {
    db.collection("emp_images").doc("username"+uuid()).set({
      name: "username",
      avatar: this.state.fileUrl,
    });
  };

  onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(uuid());
    await fileRef.put(file);
    this.setState({fileUrl : await fileRef.getDownloadURL()});
  };

  handleSubmit = () => {
    console.log();
    if(!this.state.validatedIn)
        return

    let {record} = this.state;
    let {rows} = this.state;
    let data = {}
    let mainData = this.state.data;
    if(document.querySelector('.submit-btn').textContent == "Update"){
        this.onSubmit().then(i => {
            console.log(this.state.fileUrl);
            document.querySelectorAll('.form1').forEach(i => {
                if(i.type == "file"){
                  data["Profile"] = this.state.fileUrl == null ? record.data["Profile"] : this.state.fileUrl;
              }else{
                  data[i.nextElementSibling.textContent] = i.value;
              }
          })
          data["Activated"] = "false";
          let empObj = {data : data, field : "Master/Employee", id : record.id};
          db.collection("mess").doc(record.id).update(empObj).then(i => {
            console.log(empObj);
            // window.location.reload(false);
          });
      });
        return
    }
    //   let data = {}
      this.onSubmit().then(i => {
          document.querySelectorAll('.form1').forEach(i => {
            console.log(i);
              if(i.type == "file"){
                data["Profile"] = this.state.fileUrl;
            }else{
                data[i.nextElementSibling.textContent] = i.value;
            }
        })
        data["Activated"] = false;
        let empObj = {data : data, field : "Master/Employee", id : "emp"+uuid()};
        console.log(empObj);
        db.collection("mess").doc(empObj.id).set(empObj).then(i => {
          console.log("updated"+empObj);
            window.location.reload(false);
        });
    });
  }

  handleEdit = (e) => {
    let record = this.state.data[e.target.id];
    let {vals} = this.state
    Object.keys(vals).forEach(i => {
        vals[i] = record.data[i]
    })
    document.querySelector('.submit-btn').textContent = 'Update'
    this.setState({vals, record});
  }

  handleDelete = (e) => {
    db.collection("mess").doc(this.state.data[e.target.id].id).delete().then(() => {
        // this.child.current.fetchAll();
        window.location.reload(false);
    })
  }

  empActivate = (e) => {
    let val = e.target
    console.log(val);
    // val.textContent == "Activate" ? () => {
    //   e.target.textContent = "Deactivate"
    // } : () => {val.textContent = "Activate"};
    e.target.textContent = e.target.textContent == "Activate" ? "Deactivate" : "Activate";
    
    console.log(this.state.data[e.target.classList[0]-1].data["Empolyee Name"]);
  }

  getData = (data) => {
    // this.setState({rows : data})
    console.log(data);
    let {rows} = this.state;
    data.forEach(i => {
        if(i.field == "Master/Employee")
            rows.push(i)
    })
    data = rows
    console.log(rows);
    let a = rows.map((i,k) => {
        return <tr>
            {["Sr", "Empolyee Name", "Mobile Number", "Email Id", "Address", "Aadhar Number", "Pan Number", "Profile", "Activated"].map((j) => {
                if(j == "Sr")
                    return <td>{k+1}</td>
                if(j == "Activated"){
                  console.log(i.data[j])
                  return <td><Button className={`${k+1}`} onClick={this.empActivate}>{i.data[j] ? "Deactivate" : "Activate"}</Button></td>
                }

                if(j == "Profile")
                    return <td><img style={{height: "50px", width:"50px"}} src={i.data[j]}></img></td>
                return <td>{i.data[j]}</td>
            })}
            <td component="th" scope="row"><Button id={k} onClick={this.handleEdit}>edit</Button></td>
            <td component="th" scope="row"><Button id={k} onClick={this.handleDelete}>delete</Button></td>
        </tr>
    })
    this.setState({rows : a, data})
  }

  updateData = () => {}

  removeData = () => {}

  handleInput = (e) => {
    let {vals} = this.state;
    let field = e.target.nextElementSibling.textContent
    vals[field] = e.target.value;
    this.validateInput(e)
    console.log(this.state.validatedIn)
    // if(field == "Aadhar Number"){
    //     if(e.target.value.length != 12){
    //         if(!e.target.classList.contains('is-invalid'))
    //             e.target.classList.add('is-invalid')
    //     }else{
    //         if(e.target.classList.contains('is-invalid'))
    //             e.target.classList.remove('is-invalid')
    //     }
    // }
    // if(field == "Pan Number" || field == "Mobile Number"){
    //     if(e.target.value.length != 10){
    //         if(!e.target.classList.contains('is-invalid'))
    //             e.target.classList.add('is-invalid')
    //     }else{
    //         if(e.target.classList.contains('is-invalid'))
    //             e.target.classList.remove('is-invalid')
    //     }
    // }
    this.setState({vals})
  }

  

  validateInput = (e) => {
    let field = e.target.nextElementSibling.textContent
      // props.validateInput(field,e.target.value)
      let value = e.target.value
      let ipfield;
      document.querySelectorAll('label').forEach(i => {
        if(i.textContent == field){
            ipfield = i.previousElementSibling;
        }
      })
  
      let emailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
      let tenDs = ["Mobile Number","Phone Number","Pan Number", "Bank Phon Number","Bank Contact Person Number","Bank Manager Number", "Customer Number", "Contact No."]
      let tweDs = ["Aadhar Number"]
      let mails = ["Personal Email","Bank Contact Person Email Id","Bank Manager Email Id", "Main Location", "Email Id"]
      let elevn = ["IFSC Code"]
  
      if(tweDs.indexOf(field) != -1){
        if(value.length != 12){
            if(!ipfield.classList.contains('is-invalid'))
                ipfield.classList.add('is-invalid')
        }else{
            if(ipfield.classList.contains('is-invalid'))
                ipfield.classList.remove('is-invalid')
        }
    }
    if(tenDs.indexOf(field) != -1){
        if(value.length != 10){
            if(!ipfield.classList.contains('is-invalid'))
                ipfield.classList.add('is-invalid')
        }else{
            if(ipfield.classList.contains('is-invalid')){
              ipfield.classList.remove('is-invalid')
            }
        }
    }
  
    if(mails.indexOf(field) != -1){
      let emailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
        if(!ipfield.classList.contains('is-invalid')){
          ipfield.classList.add('is-invalid')
        }
      }else{
        if(ipfield.classList.contains('is-invalid')){
          ipfield.classList.remove('is-invalid')
        }
    }
    }
  
    if(elevn.indexOf(field) != -1){
      if(value.length != 11){
          if(!ipfield.classList.contains('is-invalid'))
              ipfield.classList.add('is-invalid')
      }else{
          if(ipfield.classList.contains('is-invalid')){
            ipfield.classList.remove('is-invalid')
          }
      }
  
    }
      let flag = 1;
      document.querySelectorAll('.required').forEach(i => {
        if(i.value == ""){
          flag = 0
        }
      })
      document.querySelectorAll('.form1').forEach(i => {
        if(i.classList.contains('is-invalid')){
          flag = 0
        }
      })
      
  
      this.setState({validatedIn : !!flag})
      // return;
  } 
  

  render(){

      return (
          <div>
            <DataFetech isTemplate={false} getData={this.getData} ref={this.child}/>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <MDBValidation>
        <h1>Employee</h1>
        <p></p>
        {/* {this.state.inputs} */}
        <div>
        <MDBValidationItem style={{width : "100%" }} className='col-md-6' feedback='Please provide a valid phone number.' invalid>
            <MDBInput className="form1" wrapperClass='mb-4' min="0" label='Empolyee Name' type="text" onChange={this.handleInput} value={this.state.vals['Empolyee Name']}></MDBInput>
        </MDBValidationItem>
        <MDBInput className="form1" wrapperClass='mb-4' min="0" label='Mobile Number' type="number" onChange={this.handleInput} value={this.state.vals['Mobile Number']}></MDBInput>
        <div class="invalid-feedback">Please provide a valid aadhar number.</div>
        <MDBValidationItem style={{width : "100%" }} className='col-md-6' feedback='Please provide a valid email.' invalid>
        <MDBInput className='form1' wrapperClass='mb-4' min="0" label='Email Id' type="mail" onChange={this.handleInput} value={this.state.vals['Email Id']}></MDBInput>
        </MDBValidationItem>

        <MDBInput className='form1' wrapperClass='mb-4' min="0" label='Address' type="text" onChange={this.handleInput} value={this.state.vals['Address']}></MDBInput>
        <MDBValidationItem style={{width : "100%" }} className='col-md-6' feedback='Please provide a valid aadhar number.' invalid>
        <MDBInput  required className='form1' wrapperClass='mb-4' min="0" label='Aadhar Number' type="number" onChange={this.handleInput} value={this.state.vals['Aadhar Number']}></MDBInput>
        </MDBValidationItem>


        {/* {this.state.vals['Pan Number'] != "123" ?  */}
        <MDBValidationItem style={{width : "100%" }} className='col-md-6' feedback='Please provide a valid pan number.' invalid>
            <MDBInput required formNoValidate invalid className='form1' wrapperClass='mb-4' min="0" label='Pan Number' type="number" onChange={this.handleInput} value={this.state.vals['Pan Number']}></MDBInput>
        </MDBValidationItem>
        {/* :  */}
        {/* <MDBInput required className='form1' wrapperClass='mb-4' min="0" label='Pan Number' type="number" onChange={this.handleInput} value={this.state.vals['Pan Number']}></MDBInput> */}
        {/* } */}
        <p></p>
        <label>Profile : </label>
        <input label="Profile" className='form1' type="file" onChange={this.onFileChange} />
        <p></p>
        <MDBInput className='form1' wrapperClass='mb-4' min="0" label='Password' type="password"></MDBInput>
        <p></p></div>

        <Button className='submit-btn' onClick={this.handleSubmit}>Submit</Button>
        </MDBValidation>
        <p></p>
    

        <Table striped bordered hover responsive border={"1px solid black"} >
            <thead>
                <tr>
                    <th>Sr. </th>
                    <th>Employee Name</th>
                    <th>Mobile Number</th>
                    <th>Email Id</th>
                    <th>Address</th>
                    <th>Aadhar Number</th>
                    <th>Pan Number</th>
                    <th>Profile</th>
                    <th>Activated</th>
                </tr>
            </thead>
            <tbody>
                {/* {this.state.rows} */}
                {this.state.rows.map(i => i)}
            </tbody>
        </Table>
    </MDBContainer>
    </div>
  )
}

}
