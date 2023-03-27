import React from 'react'
import { form_data } from './Menu-data';
import { Button } from '@mui/material';


export default function () {
    let form = form_data["Bank Info"].map(i => 
        <div>
            <label>{i.title} :</label>
            <input type={i.type}/>
            <p></p>
        </div>
    )
  return (
    <div>
        <h1>Form</h1>
        <form>
            {form}
        </form>
        <Button variant='secondary'>Submit</Button>
    </div>
  )
}
