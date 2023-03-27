import { app } from "./firebase";
import React, { useState,useRef } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
}
from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router';
import { form_data } from './Menu-data';
import './firebase'
import {db} from './firebase'
import uuid from 'react-uuid';
import "./form.css"
import DropDown from './forms/DropDown';
import DataFetech from './dataFetech';
import { Storage } from './firebase';
import {ref} from 'firebase/storage'
import { Button } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Form(props) {
  let {formName} = useParams();
  let formData;

  let currentPage = window.location.pathname.split("/");
  currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
  });
  const [formVals,setFormVals] = useState({"Company Name" : "TVS"})
  const [editState, setEditState] = useState(!!Object.keys(props.editData).length)
  const [optValue,setOptValue] = useState({});
  const [fbData, setFbData] = useState([]);
  const [open, setOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [fileUrl, setFileUrl] = useState(null);


  const handleChange = (e) => {
    console.log(formVals);
    formVals[e.target.id] = e.target.value;
    setFormVals(formVals);
  }

  const handleOption = (data) => {
    setOptValue(data);
    setTimeout(() => {
    form_data[currentPage[2]][currentPage[3]].map(i => {

      // console.log(data.target.value);

      if(i.type == "autofill"){
            // document.querySelectorAll("select").forEach(j => {
              // console.log(i.parentField[0],j.previousElementSibling.previousElementSibling.textContent.slice(0,-3));
              // let i = document.querySelectorAll("select")[0];
              // let a = i.parentField[0];
              // let b = i.parentField[1];
              // let c = i.parentField[2];
            // })
    //       if(i["parentField"][0] == j.parentElement.firstChild.textContent){
    // //         fbData.forEach(k => {
    // //           if(k.field == i.parentField[1] && k.data[i.parentField[3]] == j.firstChild.firstChild.textContent){
    // //             document.querySelector("."+i.title.split(" ").join("-").toLowerCase()).value = k.data[i.parentField[2]]
    // //           }
    // //         })
    //       }
    //     })
      }


    });
    
    // let i = form_data[currentPage[2]][currentPage[3]][2]
    // console.log(i.parentField);

    form_data[currentPage[2]][currentPage[3]].map(i => {
      let labels = document.querySelectorAll('.drop')
      if(i.type == "autofill"){
        // console.log(i.parentField);
        // console.log(data.target.previousElementSibling.previousElementSibling.textContent.slice(0,-3))
        // console.log("---");
        console.log(i.parentField[0],data.target.previousElementSibling.previousElementSibling.textContent.slice(0,-3))
          if(i.parentField[0] == data.target.previousElementSibling.previousElementSibling.textContent.slice(0,-3)){
            // console.log(i);
            // console.log("---");
            document.querySelectorAll('input').forEach(k => {
              if(k.id == i.title){
                fbData.forEach(o => {
                  if(o.field == i.parentField[1] && o.data[i.parentField[3]] == data.target.value){
                    k.value = o.data[i.parentField[2]];
                  }
                })
                // k.value = data.target.value+" "+i.parentField[3]
              }
          })
        }
      }
    });

    }, 100)
    
  }  

  const [validatedIn, setValidatedIn] = useState(false);

  const validateInput = (e) => {
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
      let mails = ["Personal Email","Bank Contact Person Email Id","Bank Manager Email Id", "Main Location"]
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
      
  
      // setValidatedIn(!!flag)
      // return;
  } 
  
  

  if(!!Object.keys(props.editData).length){
      document.querySelectorAll(".form1").forEach(i => {
        console.log("hii");
        if(i.type == "select-one"){
          i.value = props.editData[i.previousElementSibling.previousElementSibling.textContent.slice(0,-3)]
        }else{
          i.value = props.editData[i.id] == undefined ? "" : props.editData[i.id];
        }
      })
    }
  formData = form_data[currentPage[2]][currentPage[3]].map((i,j) => 
    {
      if(currentPage[3] == "Mis"){
        let a = form_data["Vehicle Valuation"]["New Intimation"].map(i => i.title)
        if(a.indexOf(i.title) != -1 && i.title != "Ref. No"){
          console.log("j");
          return
        }
      }
      if(Array.isArray(i.type) && i.type[0] == "dropdown"){
        return <div>
          <label className='drop'>{i.title} : </label><br></br>
          <select className='form1 dropdown' style={{width : "100%", height : "48%"}}>
            {i.type[1].map(i => <option>{i}</option>)}
          </select>
        </div>
        // return <DropDown label={i.title} options={i.type[1]} handleOption={handleOption}/>
      }

      if(Array.isArray(i.type) && i.type[0] == "datadropdown"){
        let title = i.type[1][0];
        let field = i.type[1][1]
        let newArr = [];
          props.userData.forEach(j => {
            if(j.field == field){
              newArr.push(j.data[title]);
            }
        })
        // return <DropDown label={i.title} options={newArr} handleOption={handleOption}/>
        return <div>
          <label>{i.title} : </label><br></br>
          <select onChange={handleOption} className='form1 dropdown' style={{width : "100%" ,height : "48%"}}>
            {newArr.map(i => <option>{i}</option>)}
          </select>
        </div>
      }
      
      if(i.type == "image"){
        return <input type={'file'}></input>;
      }

      if(i.type == "autofill"){
        return <MDBInput wrapperClass='mb-4' min="0" label={i.title} className={`form1 ${i.title.split(" ").join("-").toLowerCase()}`} id={i.title} key={i.title} type={i.type} autoFill={true} value={" "}/>
      }else{
        return <MDBValidationItem style={{width : "100%" }} className='col-md-6' feedback={`Please provide a valid ${i.title.toLowerCase()}.`} invalid>
           <MDBInput onChange={validateInput} wrapperClass='mb-4' min="0" label={i.title} className={`form1 ${i.required ? 'required' : ''}`} id={i.title} key={i.title} type={i.type} autoFill={false}/>
        </MDBValidationItem>
      }
      
    })
  


  const handleSave = async (e) => {
    e.preventDefault();
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

    if(!flag)
      return;

    let data = {}
    document.querySelectorAll('.form1').forEach(i => {
      if(i.classList.contains('dropdown') || i.classList.contains('datadropdown')){
        data[i.previousElementSibling.previousElementSibling.textContent.slice(0,-3)] = i.value;
        console.log(data);
      }
        
      else
        data[i.id] = i.value;
    })
    let dataa = {field : `${currentPage[2]}/${currentPage[3]}`, data, id: uuid()};
    console.log(dataa);
    db.collection("mess").doc(dataa.id).set(dataa).then(i => {
    setAlertMsg("Record Saved Successfully")
    setOpen(true)
      document.querySelectorAll("input").forEach(i => {
        i.value = "";
      })
      props.updateTable()
    })

  }

  const handleUpdate = (e) => {
    e.preventDefault();
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

    if(!flag)
      return;

    let data = currentPage[3] == "Mis" ? props.editData : {};
    console.log(props.editData);
    document.querySelectorAll('.form1').forEach(i => {
      if(i.type == "select-one"){
          console.log(i.previousElementSibling.previousElementSibling.textContent.slice(0,-3),i.value);
          data[i.previousElementSibling.previousElementSibling.textContent.slice(0,-3)] = i.value;
        }else{
        data[i.id] = i.value;
      }
    })
    db.collection("mess").doc(props.editData.id).update({data: data}).then(i => {
      setAlertMsg("Record Updated Successfully")
      setOpen(true)
    });

    props.updateTable();
    props.updateData({});
    console.log("exe");
    document.querySelectorAll("input").forEach(i => {
    i.value = "";
    })
  }

  const getData = (data) => {
    setFbData(data);
  }
  

  const onSubmit = async () => {
    db.collection("images").doc("username").set({
      name: "username",
      avatar: fileUrl,
    });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };


  const handleClose = () => {
    setOpen(false);
  }
  {
    console.log(props.editState)
    if(!!Object.keys(props.editData).length || currentPage[3] != "Mis")
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Record Added Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Record Added Successfully */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <DataFetech isTemplate={false} getData={getData}/>
          <h1>{currentPage[2] + ' ' +formName}</h1>
          <p></p>
          <div className='form-container' style={(form_data[currentPage[2]][currentPage[3]].length > 10) ? {gridTemplateColumns: "1fr 1fr", width: "150%",marginLeft: "-25%"} : {gridTemplateColumns: ""}}>

          {formData}
          </div>
          {!!Object.keys(props.editData).length ?   
          <MDBBtn key={"mb-4 w-100"} className="mb-4 w-100" onClick={handleUpdate}>Update</MDBBtn> :
          <MDBBtn key={"mb-4 w-101"} className="mb-4 w-100" onClick={handleSave}>Submit</MDBBtn> 
        }
        {/* <input type="file" onChange={onFileChange} />
        <Button onClick={onSubmit}>Press</Button> */}
    </MDBContainer>
  );
}

}

export default Form;