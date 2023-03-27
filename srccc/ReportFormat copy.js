import { MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import DropDown from './forms/DropDown'
import "./form.css"
import { db } from './firebase'
import DataFetech from './dataFetech'
import { form_data } from './Menu-data'
import TemplateFetch from './TemplateFetch'

export default class ReportFormat extends Component {

  constructor(props){
    super(props);
    this.state = {templates : [], form : "Master/Bank", data : [], fieldVals : [], rowNum : 2};
    this.handleTempName = this.handleTempName.bind(this);
  }

  getTemplateData = (i) => {
    let arr = i.map(i => i.name);
    
    this.setState({templates : arr, data : i,});
    let formm = document.querySelector(".templateName").value;
  }

  handleSave = (i) => {
    let {data} = this.state;
    let obj = {}
    let idx;
    console.log(document.querySelector(".fieldd").children[0].textContent);
    document.querySelectorAll(".field").forEach(i => {
      obj[i.children[1].value] = i.children[0].value;
    })
    // return;
    data.forEach((i,j) => {
      if(document.querySelector(".templateName").value == i.name){
        idx = j;
        i.fields = obj;
        return
      }
    })
    // db.collection("templates").doc(data[idx].id).update({data: obj});
  }

  handleTempOption = (e) => {
    // console.log(e.target.value);
  }


  handleTempName = () => {
    let {fieldVals} = this.state;
    // let formm = document.querySelector(".template").children[0].textContent;
    let formm = document.querySelector(".templateName").value;
    this.state.data.forEach(j => {
      if(j.name == formm)
        formm = [j.category,j.subcategory];
    })
    
    // console.log(fieldVals);
    fieldVals = form_data[formm[0]][formm[1]].map(i => i.title);
    setTimeout(() => {
      this.setState({fieldVals})
    },500)
  }

  handleGo = () => {
    this.setState({rowNum : +document.querySelector(".rowNum").value});
  }

  handleOption = () => {
    setTimeout(() => {

      this.handleTempName();
    },500)
  }
  
  render(){
    return (
      <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <TemplateFetch getTemplateData={this.getTemplateData}/>
        <h1>Report Format</h1>
        <p></p>

        <select className='templateName' onChange={this.handleTempName}>
          {this.state.templates.map(i => {
            return <option>{i}</option>
          })}
        </select>

        <p></p>

        <DropDown label='Template' options={this.state.templates} handleOption={this.handleOption}/>

        <p></p>
        <MDBInput className='rowNum' label="Number of Rows"></MDBInput>
        <p></p>
        <Button onClick={this.handleGo}>Go</Button>
        <p></p>
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
        {
          Array(this.state.rowNum).fill(Math.random()).map(i => {
            return <div className={`${i} fieldd`}>
            <DropDown label='Template' options={this.state.fieldVals} handleOption={this.handleOption}/>
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
