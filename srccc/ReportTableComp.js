import { MDBContainer } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'

export default function ReportTableComp(props) {


    let handleEdit = (e) => {
        props.handleEdit(e.target.classList[0]-1);
    }

    let handleDelete = (e) => {
        props.handleDelete(e.target.classList[0]-1);

    }

  return (
    <div>
        <MDBContainer  className="p-3 my-5 d-flex flex-column">
        <Table striped bordered hover responsive border={"1px solid black"}>
        <thead>
        <tr>
            <th>Head One</th>
        </tr>
        </thead>
        <tbody>
            {console.log(props.data)}
            {props.data.map((i,j) =>
                 <tr>
                    <td>{i}</td>
                    <td><Button onClick={handleEdit} className={j+1}>edit</Button></td>
                    <td><Button onClick={handleDelete} className={j+1}>delete</Button></td>
                </tr>
            )}
        </tbody>
    </Table>
    </MDBContainer>
    </div>
  )
}
