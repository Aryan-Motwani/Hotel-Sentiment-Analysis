import React from 'react'
import { useRef } from 'react';
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
import "../forms/app.css"

export default function Schedule() {
    const emailRef = useRef();
    const passwordRef = useRef();

    let handleSave = () => {}

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1>Schedule</h1>
            <p></p>
            {/* <MDBInput wrapperClass='mb-4' label='User Email' id='form' type='email' ref={emailRef}/>
            <MDBInput wrapperClass='mb-4' label='User Password' id='form' type='password' ref={passwordRef}/> */}
            <MDBInput wrapperClass='mb-4' className="inp" label='Intimation Date' type='date'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Int. Time' type='time'/>
            <MDBBtn className="mb-4 w-100 submit-btn" onClick={handleSave}>Submit</MDBBtn>
        </MDBContainer>
    )
}
