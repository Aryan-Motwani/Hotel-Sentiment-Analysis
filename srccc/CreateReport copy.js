import { MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { db } from './firebase'
import DropDown from './forms/DropDown'
import { form_data } from './Menu-data'

export default function CreateReport() {

    const handleSave = () => {
        let format = document.querySelector(".format").children[0].textContent;
        let category = document.querySelector(".category").children[0].textContent;
        let subcategory = document.querySelector(".sub-category").children[0].textContent;
        let name = document.querySelector("input").value;
        let data = {format,category,subcategory,name,id: uuid()}
        console.log(data);
        db.collection("templates").doc(data.id).set(data)
    }

    const [subValues, setSubValues] = useState(["a","b"]);
    const [subDrop, setSubDrop] = useState(<DropDown label='Sub Category' options={["vhc","cc"]} handleOption={() => {}}/>)


    const handleOption = (val) => {
      setTimeout(() => {
      if(val == "Category"){
        let currentCategory = document.querySelector(".category").children[0].textContent;
        currentCategory == "Vehicle Valuation" || currentCategory == "Property Valuation" ? setSubDrop(<DropDown label='Sub Category' options={Object.keys(form_data[currentCategory])} handleOption={() => {}}/>) : console.log("hi");;
        
      }
    },500)
    }  

  return (
    <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{width:"10%"}}>
        <h1>Create New Report</h1>
        <p></p>
        <MDBInput label={'Template Name'}></MDBInput>
        <p></p>
        <DropDown label='Format' options={["Excel","Word"]} handleOption={handleOption}/>
        <p></p>
        <DropDown label='Category' options={["Vehicle Valuation","Property Valuation"]} handleOption={handleOption}/>
        <p></p>
        {/* <DropDown label='Sub Category' options={subValues} handleOption={() => {}}/> */}
        {subDrop}

        <p></p>
        {/* <select className='category' onChange={(e) => {setSubValues(Object.keys(form_data[e.target.value]))}}>
          <option>Vehicle Valuation</option>
          <option>Property Valuation</option>
        </select> */}
        {/* <p></p>
        <select className='subcategory'>
          {subValues.map(i => {
            return <option>{i}</option>
        
          })}
        </select>
        <p></p> */}
        <Button onClick={handleSave}>Save</Button>
        </MDBContainer>
    </div>
  )
}
