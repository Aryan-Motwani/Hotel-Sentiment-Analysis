import React, { useState,useRef, Component, useEffect } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {firestore} from './firebase';
import {addDoc, collection} from '@firebase/firestore';
import { useParams } from 'react-router';
import DataFetech from './dataFetech';


function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  let {formName} = useParams();
  

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [authData, setAuthData] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    let mail = emailRef.current.value;
    let pass = passwordRef.current.value;
    if(mail == "mail@123" && pass == "pass"){
      localStorage.setItem("loginToken",JSON.stringify("true"));
      props.changeAuth("user1");
    }
  }

  const getData = (userData) => {
    setTimeout(() => {
      setAuthData(userData);
    },200)
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <img style={{margin: "5px 40%" }} src={'https://firebasestorage.googleapis.com/v0/b/survey-app-3db7b.appspot.com/o/3808dc7e-7c97-da28-4b4d-b130089aab89?alt=media&token=96ee42a9-ca6d-4f6e-a9f8-b18b8ef8ad6e'}></img>
      <DataFetech getData={getData}/>
          <h1>{formName}</h1>
          <p></p>

          <MDBInput wrapperClass='mb-4' label='Email Address' id='form1' type='email' ref={emailRef}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' ref={passwordRef}/>

          <MDBBtn className="mb-4 w-100" onClick={handleSave}>Submit</MDBBtn>
    </MDBContainer>
  );
}

export default Signup;

// rgb(114, 102, 186)
// 102, 92, 167

// 247, 93, 129
// 222, 84, 116