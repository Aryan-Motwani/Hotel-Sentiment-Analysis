import { MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import DropDown from '../forms/DropDown';
import Dropp from '../Dropp';
import { form_data } from '../Menu-data'
import { Button } from 'react-bootstrap';

export default function VehicleValuation() {
    let currentPage = window.location.pathname.split("/");
  currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
  });

  const [drops, setDrops] = useState({'Bank' : ''});

  let handleChange = (e,l) => {
    drops[l] = e.target.value;
    setDrops(drops)
    console.log(drops);
  }
  console.log(drops);

  return (
    <div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h1>Vehicle Valutaion</h1>
        <p></p>
        <div className='form-container' style={{gridTemplateColumns: "1fr 1fr", width: "150%",marginLeft: "-25%"}}>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        {/* <DropDown label="hi" options={["hi","bye"]} handle/> */}
        {/* <Dropp label="Bank" value={drops['Bank']} options={["hi","bye","shy"]} handleChange={handleChange}/> */}
        
        <label>Bank Name :</label><br></br>
        <select>
            <option>Hii</option>
            <option>Bye</option>
        </select>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" className='form1' label='Title Card' autoFill={false}/>
        <Button onClick={() => {
            drops['Bank'] = 'hi';
            setDrops(drops);
            console.log(drops);
        }}>CLick</Button>
        </div>
    </MDBContainer>

    </div>
  )
}
