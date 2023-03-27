import * as React from 'react';
import { redirect, useNavigate, useParams } from 'react-router';
import { form_data } from './Menu-data';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import exportFunc from './Excelexport';
import Table from 'react-bootstrap/Table';
import {db} from './firebase'


export default function DataTable(props) {
  let {formName} = useParams();
  let currentPage = window.location.pathname.split("/");
    currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
  });
  let rows = [];
  rows = props.rows;
  const [imgDemo, setImg] = React.useState();
  const [open, setOpen] = React.useState(false);

    function handleEdit(i) {
      props.updateData(rows[i.target.id])
    }

    function handleDelete(i){
      props.removeData(rows[i.target.id])
    }

    function handleExport(e){
      let exportData = props.rows;
      exportData.forEach(i => delete i.id);
      console.log(exportData);
    }

    const handleClose = () => {
      setOpen(false);
    }

    
    
  return (
    <div style={{width : "80%", marginTop: "15px", marginLeft : "10%", marginBottom : "5%"}}>
      
      {console.log(props.rows)}
    <Table striped bordered hover responsive border={"1px solid black"}>
      <thead>
          <tr>
          <th component="th" scope="row">{"Sr."}</th>
          {form_data[currentPage[2]][currentPage[3]].map(i => {
                return <th component="th" scope="row">{i.title}</th>
            })}
          </tr>
        </thead>
        <tbody
          onClick={(e) => {
            if(e.target.className == "0"){
              let d = "";
              rows.forEach(i => {
                if(i["Ref. No."] == e.target.textContent)
                  d = i;
              })
              props.handleRef(d)
            }
          }}
        >
          {rows.map((row,i) => (
            <tr
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={i}
            >
              <td component="th" scope="row">{i+1}</td>
              {form_data[currentPage[2]][currentPage[3]].map((i,j) => {
                if(i.type == "image"){

                  // console.log(i.title);
                  return <td className={j} component="th" scope="row"><img height="50px" width={"40px"} src={row[i.title]}></img></td>
                }
                return <td className={j} component="th" scope="row">{row[i.title]}</td>
              })}


            {/* <td component="th" scope="row">{imgDemo}</td> */}
            <td component="th" scope="row"><Button id={i} onClick={handleEdit}>edit</Button></td>
            <td component="th" scope="row"><Button id={i} onClick={handleDelete}>delete</Button></td>
            
            </tr>
          ))}
        </tbody>

      </Table>
              <Button onClick={() => {
                let imgss = [];
                for(let i = 0; i < imgss.length; i++){
                    imgss.pop();
                }
            db.collection("emp_images")
                    .get()
                    .then((snapshot) => {
                    if(snapshot.docs.length>0){
                        snapshot.docs.forEach((doc) => {
                        imgss.push(doc.data());
                    });
                    console.log(imgss);
                    setImg(<img height="50px" width={"40px"} src={imgss[0].avatar}></img>)
                }})
              }}>Image</Button>
      {imgDemo}
    </div>

  );
}