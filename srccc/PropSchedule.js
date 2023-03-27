import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { form_data } from './Menu-data'
import {db} from './firebase'


export default function Propchedule(props) {
    const [idx, setidx] = useState();
    let data = props.data

    const handleEdit = (e) => {
        document.querySelector(".form").style.display = ""
        setidx(e.target.id);
        document.querySelectorAll("input")[0].value = data[e.target.id].data["Request Date"];
        document.querySelectorAll("input")[1].value = data[e.target.id].data["Request Time"];
    }

    const handleUpdate = () => {
        let updated =  data[idx];
        updated.data["Request Date"] = document.querySelectorAll("input")[0].value;
        updated.data["Request Time"] = document.querySelectorAll("input")[1].value;

        // console.log(updated);

        db.collection("mess").doc(updated.id).update({data: updated.data});
        document.querySelector(".form").style.display = "none"
        props.updateTable();
        // let dataa = db.collection("mess").doc(updated.id)
    }

  return (
    <div>
    <div class="form" style={{display : 'none'}}>

    <MDBContainer  className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' min="0" label="Intimation Date" className='form1' type="date" autoFill={false}/>
        <MDBInput wrapperClass='mb-4' min="0" label="Intimation Time" className='form1' type="time" autoFill={false}/>
        <MDBBtn key="mb-4 w-100" className="mb-4 w-100" onClick={handleUpdate}>Update</MDBBtn> :
    </MDBContainer>
    </div>

    <Table striped bordered hover responsive border={"1px solid black"}>
        <thead>
            <tr>
            {form_data['Property Valuation']['New Intimation'].map(i => {
                return <th>{i.title}</th>
            })}
            </tr>
        </thead>
        <tbody>
            {data.map((i,k) => {
                return <tr>
                {form_data['Property Valuation']['New Intimation'].map(j => {
                  return <td>{i.data[j.title]}</td>
                })}
                <td component="th" scope="row"><Button id={k}onClick={handleEdit}>edit</Button></td>
                </tr>

            })}
        </tbody>
    </Table>
    </div>
    
  )
}
