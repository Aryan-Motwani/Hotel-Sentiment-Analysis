import * as React from 'react';
import { Component } from 'react';
import {db} from './firebase'
import './firebase'
import TableComp from './TableComp';
import Form from "./form"
import DataFetech from './dataFetech';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import exportFunc from './Excelexport';
import Table from 'react-bootstrap/Table';
import { form_data } from './Menu-data';
import AlertBox from './AlertBox';




export default class DataTable extends Component {
  constructor(props){
    super(props)
    this.state = {rows : [], editData : {}, userData: [], refState : false, refData : [], validated : false, open : false, delData : {}}
    this.updateTable = this.updateTable.bind(this);
    this.updateData = this.updateData.bind(this);
    this.child = React.createRef();
    this.formRef = React.createRef();
  }

  getData = (userData) => {
    this.setState({userData});
    
    let currentPage = window.location.pathname.split("/");
    currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
    });
    let rows = [];


    setTimeout(() => {
      userData.forEach(i => {
        let f = currentPage[3] == "Mis" ? "New Intimation" : currentPage[3];
          if(i.field == `${currentPage[2]}/${f}`){
          i.data["id"] = i.id;
          rows.push(i.data);
        }
      })
      this.setState({rows});
    },500)
  }

  updateTable = () => {
    console.log("hi");
    setTimeout(() => {
      this.child.current.fetchAll();
    }, 500)
  }

  updateData = (dataField) => {
    this.setState({editData : dataField});
  }

  deleteData = (data) => {
    // db.collection("mess").doc(data.id).delete().then(() => {
      this.setState({open : true, delData : data });
      // this.updateTable();
    // });

  }

  deleteDataa = () => {
    let data = this.state.delData
    this.setState({open : false});
    db.collection("mess").doc(data.id).delete().then(() => {
      this.setState({opend : true})
      this.updateTable();
    });

  }

  handleUpdate = () => {
    let {rows} = this.state;
    rows.forEach(i => delete i.id)
    exportFunc(rows);
  }

  handleRef = (d) => {
    this.setState({refState : true, refData : d});
  }

  validateInput = (field,value) => {
    console.log(window.location.pathname.split("/")[2],"Mis")
    if(window.location.pathname.split("/")[3] == "Mis"){

      return;
    }

    let ipfield;
    document.querySelectorAll('label').forEach(i => {
      if(i.textContent == field){
          ipfield = i.previousElementSibling;
      }
    })

    let emailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    let tenDs = ["Mobile Number","Phone Number","Pan Number", "Bank Phon Number","Bank Contact Person Number","Bank Manager Number", "Customer Number"]
    let tweDs = ["Aadhar Number"]
    let mails = ["Personal Email","Bank Contact Person Email Id","Bank Manager Email Id"]
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
    

    console.log(!!flag);
    this.setState({validated : !!flag})
    return;

  }

  handleClose = () => {
    this.setState({open : false, opend : false});
  }
  
  render() {
    if(this.props.userID == "true"){
      if(!this.state.refState)
        return(  
          <div>
            <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Record Added Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
           id="alert-dialog-description">
            Are you sure you want to delete this record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.deleteDataa} autoFocus>
            Yes
          </Button>
          <Button onClick={this.handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.opend}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Record Added Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
           id="alert-dialog-description">
            Record Deleted Successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
          <DataFetech isTemplate={false} getData={this.getData} ref={this.child}/>
          <Form validated={this.state.validated} validateInput={this.validateInput} updateTable={this.updateTable} editData={this.state.editData} updateData={this.updateData} userData={this.state.userData}/>
          <TableComp rows={this.state.rows} updateData={this.updateData} removeData={this.deleteData} handleRef={this.handleRef}/>
          <Button style={{
            marginLeft: "50%",
            marginTop: "-5%",
            background: "#005cb8",
            color: "white"
          }}
          onClick={this.handleUpdate}
          >export</Button>
        </div>
      )
    else
          return (
            <div>
              <div style={{display : "flex", margin : "5px", gap : "5px"}}>
            <MDBBtn onClick={() => this.setState({refState : false})}>Back</MDBBtn>
            <MDBBtn onClick={(e) => {
              document.querySelectorAll('.form-notch').forEach(i => i.style.display = '')
              document.querySelector('.save-btn').style.display = '';
            }} className='edit-btn'>
              Edit</MDBBtn>
              <MDBBtn onClick={(e) => {
                document.querySelectorAll('.form-notch').forEach(i => i.style.display = 'none')
                document.querySelector('.save-btn').style.display = 'none';
                let data = {};
                document.querySelectorAll('td').forEach((i,j) => {
                  if(j%2 != 0){
                    data[i.previousElementSibling.textContent] = i.childNodes[0].children[0].value;
                  }
                })

                db.collection("mess").doc(this.state.refData.id).update({data: data});
                console.log(data);


            }} className='save-btn' style={{display:'none'}}>Save</MDBBtn>
              </div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <Table striped bordered hover responsive border={"1px solid black"}>
            <thead>
              <tr>
              <th>Field</th>
              <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {form_data["Vehicle Valuation"]["New Intimation"].map(i => {
            {console.log(form_data["Vehicle Valuation"]["New Intimation"])}
              return <tr>
                <td>{i.title}</td>
                <td className='inp-td' id={i.title}><MDBInput></MDBInput></td>
              </tr>
            })}
            {/* {Object.keys(this.state.refData).map(i => {
            {console.log(form_data["Vehicle Valuation"]["New Intimation"])}
              return <tr>
                <td>{i}</td>
                <td className='inp-td' id={i}><MDBInput></MDBInput></td>
              </tr>
            })} */}
            </tbody>
            <span style={{display : "none"}}>

            {setTimeout(() => {
              document.querySelectorAll('.form-notch').forEach(i => {
                i.style.display = 'none'})
                document.querySelectorAll('td').forEach((i,j) => {
                  if(j%2 !== 0 && j != 0){
                      i.childNodes[0].children[0].value = this.state.refData[i.previousElementSibling.textContent]
                  }
              })
              },0)
            }
            </span>
            </Table>
            </MDBContainer>
            </div>
          )
  }else{
    window.location.pathname = "/"
    }
  }
}