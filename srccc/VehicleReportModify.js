import { MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import DropDown from './forms/DropDown'
import "./form.css"
import { db } from './firebase'
import DataFetech from './dataFetech'
import { form_data } from './Menu-data'
import TemplateFetch from './TemplateFetch'

export default class VehicleReportModify extends Component {

  constructor(props){
    super(props);
    this.state = {templates : [], form : "Master/Bank", data : [], fieldVals : [], rowNum : 2};
    this.handleTempName = this.handleTempName.bind(this);
  }

  getTemplateData = (i) => {
    let arr = [];
    i.forEach(j => {
      if(j.category == window.location.pathname.split("/")[2].split("%20").join(" "))
        arr.push(j.name)
    });
    
    this.setState({templates : arr, data : i,});
    let formm = document.querySelector(".templateName").value;
  }

  handleSave = (i) => {
    
    // formm = form_data[formm[0]][formm[1]].map(i => i.title);
    // console.log(formm);

    // return;
    let {data} = this.state;
    let obj = {}
    let idx;
    document.querySelectorAll(".field").forEach(i => {
      obj[i.children[1].value] = i.children[0].value;
    })
    data.forEach((i,j) => {
      if(document.querySelector(".templateName").value == i.name){
        idx = j;
        i.fields = obj;
        return
      }
    })
    db.collection("templates").doc(data[idx].id).update({data: obj});
  }

  handleTempOption = (e) => {
    console.log(e.target.value);
  }


  handleTempName = () => {
    let {fieldVals} = this.state;
    let formm = document.querySelector(".templateName").value;
    this.state.data.forEach(j => {
      if(j.name == formm)
        formm = j.category;
    })
    // console.log(formm);

    
    fieldVals = form_data[formm]["New Intimation"].map(i => i.title);
    setTimeout(() => {
      this.setState({fieldVals})
    },500)
  }

  handleGo = () => {
    this.setState({rowNum : +document.querySelector(".rowNum").value});
  }
  
  render(){
    // let dropdowns = for(let l = 0; l < 5;l++){console.log("hi")}
    // <div className={`${i} field`}>
    // <select>
    //     {this.state.fieldVals.map(i => {       
    //         return <option>{i}</option>
    //     }
    //     )
    // }
    // </select>
    // <input style={{marginLeft : "30%", marginBottom: "5%"}} type={'text'}></input>
    // </div>;


    return (
      <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {/* <DataFetech isTemplate={true} getTemplateData={this.getTemplateData}/> */}
      <TemplateFetch getTemplateData={this.getTemplateData}/>
        <h1>Report Format</h1>
        <p></p>
        <select className='templateName' onChange={this.handleTempName}>
          {this.state.templates.map(i => {
            return <option>{i}</option>
          })}
        </select>
        <p></p>
        <MDBInput className='rowNum' label="Number of Rows"></MDBInput>
        <p></p>
        <Button onClick={this.handleGo}>Go</Button>
        <p></p>
       {/* {[1,2,3].map(i => {
        return(
            
          )})
        } */}
        {
          Array(this.state.rowNum).fill(Math.random()).map(i => {
            return <div className={`${i} field`}>
            <select>
                {this.state.fieldVals.map(i => {       
                    return <option>{i}</option>
                }
                )
            }
            </select>
            <input style={{marginLeft : "30%", marginBottom: "5%"}} type={'text'}></input>
            </div>;
          })
        }
        <p></p>
        <Button onClick={this.handleSave}>Save</Button>
      </MDBContainer>
    </div>
  )
}
}
