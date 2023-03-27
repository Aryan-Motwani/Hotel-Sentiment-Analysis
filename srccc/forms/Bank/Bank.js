import React from 'react'
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

export default function Bank() {
  return (
    <div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' label={"Bank Name"} className='form1' id={"Bank Name"} key={"Bank Name"} type={"text"} value={""} />
        <MDBInput wrapperClass='mb-4' label={"Personal Email"} className='form1' id={"Personal Email"} key={"Personal Name"} type={"email"} value={""} />
        <MDBInput wrapperClass='mb-4' label={"Bank Name"} className='form1' id={"Bank Name"} key={"Bank Name"} type={"email"} value={""} />
    </MDBContainer>
    </div>
  )
}
