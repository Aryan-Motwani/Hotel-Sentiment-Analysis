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

export default function MIS() {
    const emailRef = useRef();
    const passwordRef = useRef();

    let handleSave = () => {}

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1>MIS</h1>
            <p></p>
            {/* <MDBInput wrapperClass='mb-4' label='User Email' id='form' type='email' ref={emailRef}/>
            <MDBInput wrapperClass='mb-4' label='User Password' id='form' type='password' ref={passwordRef}/> */}
            <MDBInput wrapperClass='mb-4' className="inp" label='S.No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Ref. No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Company Name' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Bank Divison' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Bank Branch' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Vertical' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Intimated By' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Intimator Contact No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Intimation Date' type='date'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Intimation Time' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Prospect No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='USED/REPo' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Vehicle Type' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Customer Name' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Customer Number' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Vehicle No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Make/ Model' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='MFG. Year' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='CH. NO.' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='ENG. NO.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Odometer Reading' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Location of Vehicle' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Inspected By' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Inspector Contact No.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Base Location' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Date & Time of Inspection' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Con. Km' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Report Date' type='date'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Val. Amount' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Delivery Date' type='date'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Uploaded Mail/Date' type='date'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Fee Rec.' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Bill Status' type='number'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Remarks' type='text'/>
            <MDBInput wrapperClass='mb-4' className="inp" label='Pay Status' type='text'/>
            <MDBBtn className="mb-4 w-100 submit-btn" onClick={handleSave}>Submit</MDBBtn>
        </MDBContainer>
    )
}
