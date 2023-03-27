import React from 'react'
import { MDBContainer, MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import { Button } from 'react-bootstrap';
import { components } from 'react-select';
import Table from 'react-bootstrap/Table';
import { finalReviews } from './finalReviews';

export default function First() {
  let a = finalReviews;
  for(let i = 0; i < a.length; i++){
    for(let j = 0; j < a.length-1; j++){
        if(a[j].score["Ac"] > a[j+1].score["room"]){
            let temp = a[j];
            a[j] = a[j+1];
            a[j+1] = temp;
        }
    }
}

console.log(a)

  return (<div>
<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h1>Employee</h1>
        <MDBInput className="form1" wrapperClass='mb-4' min="0" label='Mobile Number' type="number" ></MDBInput>
        

    </MDBContainer>
    </div>

    )
}
