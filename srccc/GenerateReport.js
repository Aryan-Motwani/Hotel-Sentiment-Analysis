import { MDBContainer } from 'mdb-react-ui-kit';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import DataFetech from './dataFetech'
import exportFunc from './Excelexport';
import DropDown from './forms/DropDown';
import TemplateFetch from './TemplateFetch';
import Editor from './Editor';

export default class GenerateReport extends Component{
    constructor(props){
        super(props);
        this.state = {templates : [], form : "Master/Bank", data : [], wordComp : ""}
        this.getData = this.getData.bind(this);
    }
    
    getData = (i) => {
        this.setState({mainData : i});
    }

    getTemplateData = (i) => {
        let arr = i.map(i => i.name);
        this.setState({templates : arr, data : i});
    }

    export = () => {
        let {form} = this.state;
        
        let format = "";
        let newData = [];
        let formm;
        this.state.data.forEach(i => {
            if(i.name == document.querySelector(".templateName").value){
                // console.log(i);
                formm = i;
                form = i.category;
                format = i.data;
            }
        })
        
        
        this.state.mainData.forEach(i => {
            let obj = {};
            if(i.field.indexOf(form) != -1){
                if(format){
                    Object.keys(format).forEach((j,k) => {
                        obj[j] = i.data[format[j]]
                    })
                }
                newData.push(obj);
            }
        });
        
        let ckdit = "";
        let keys = Object.keys(newData[0])
        newData.forEach(i => {
            ckdit += `<p>`
            keys.forEach(j => {
                ckdit += `My ${j} is ${i[j]} <br>`
            })
            ckdit += `</p>`
        })

        console.log(newData);
        if(formm.format == "Word")
            this.setState({wordComp : <Editor data={ckdit}/>})
        else
            exportFunc(newData)
    }

    render(){
        return (
        <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{width:"10%"}}>
        <DataFetech isTrue={false} getData={this.getData}/>
        <TemplateFetch isTemplate={true} getTemplateData={this.getTemplateData}/>
        <h1>Generate Report</h1>
        <p></p>
        <select className='templateName'>
          {this.state.templates.map(i => {
              return <option>{i}</option>
            })}
        </select>
        <p></p>
        <Button onClick={this.export}>Export</Button>
        {this.state.wordComp}
        </MDBContainer>
    </div>
  )
}
}
































// import { MDBAccordion, MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit'
// import React, { Children, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import DropdownContext from 'react-bootstrap/esm/DropdownContext'
// import DropDown from './forms/DropDown'
// import { form_data, menu_data } from './Menu-data'
// import "./report.css"
// import './form.css'
// import exportFunc from './Excelexport'
// import DataFetech from './dataFetech'
// import { ThirtyFpsSelect } from '@mui/icons-material'

// export default function Report() {
//     const [optValue, setOptValue] = useState("Master")
//     const [userData, setUserData] = useState({})
//     const [formVals, setFormVals] = useState(["Bank", "Bank Info", "Employee"]);
//     const [form, setForm] = useState("Master/Bank");
//     const [rowNum, setRowNum] = useState(0);
//     const [rowArr, setRowArr] = useState([]);

//     const handleSave = (e) => {
//         let newData = [];
//         let exportData = [];
//         for(let i = 0; i < userData.length; i++) {
//             if(userData[i].field == form){
//                 userData[i]["data"]["id"] = userData[i].id; 
//                 newData.push(userData[i].data)
//             }
//         }

//         exportData = newData.map(i => {
//             return {id : i.id}
//         })

//         let newObj;
//         document.querySelectorAll(".field").forEach(i => {
//             newObj = {};
//             newData.forEach((j,k) => {
//                 if(exportData[k].id == j.id)
//                     exportData[k][i.children[1].value] = j[i.children[0].value]
//             })
//         })

//         exportData.forEach(i => delete i.id);
//         exportFunc(exportData);
//     }

//     const getData = (data) => {
//         setUserData(data);
//     }

//     const handleOption = (label,value) => {
//         console.log(label,value);
//         optValue[label] = value;
//         setOptValue(optValue);
//     }

//     // let dropdowns = 


//     const formChanged = (e) => {
//         console.log(form_data[e.target.value]);
//         setFormVals(Object.keys(form_data[e.target.value]));
//     }

//     const categoryChanged = (e) => {
//         setForm(document.querySelector(".opt1").value+"/"+document.querySelector(".opt2").value);
//     }
//     console.log(rowArr);
//   return (
//       <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
//         <DataFetech getData={getData}/>
//         <h1>Report</h1>
//         <select className=''>
//             <option>Excel</option>
//             <option>Word</option>
//         </select>
//         <p></p>
//         <select className='opt1' onChange={formChanged}>
//             <option>Master</option>
//             <option>Vehicle Valuation</option>
//             <option>Property Valuation</option>
//         </select>
//         <p></p>
//         <select className="opt2" onChange={categoryChanged}>
//             {formVals.map(i => {
//                 return <option>{i}</option>
//             })}
//         </select>
//         <p></p>
//         <MDBInput wrapperClass='mb-4' label={'No. of Rows'} value={rowNum} onChange={(e) => {
//             setRowNum(e.target.value)
//             }} className='form1' type={'text'}/>
//         <Button onClick={() => {
//             for(let i = 0; i < rowNum; i++){
//                 rowArr[i] = 0
//             }
//             console.log(rowArr);
//             // setRowArr(rowArr);
//             setRowNum(rowNum)
//         }}>Go</Button>
//         <p></p>
//         <div className='dropdowns'>

//             {console.log(rowArr)}{
//             rowArr.map(i => {
//         return(
//             <div className={`${i} field`}>
//         <select>
//             {(form_data[form.split("/")[0]][form.split("/")[1]]).map(i => {       
//                 return <option>{i.title}</option>
//             }
//             )
//         }
//         </select>
        
//         <input style={{marginLeft : "30%", marginBottom: "5%"}} type={'text'}></input>
//         </div>
//             )
//     })}
//         </div>
//         <MDBBtn key={"mb-4 w-100"} className="mb-4 w-100" onClick={handleSave}>Save</MDBBtn>
//     </MDBContainer>
//   )
// }


// {/* <div className='container'>
//         <h1>Report</h1>
//         <div style={{width : "30%", height: "5px"}}>
//         </div>
//         <select value={opt} onChange={(e) => setOpt(e.target.value)}>
//             <option>Master</option>
//             <option>Vehicle Valuation</option>
//             <option>Property Valuation</option>
//             <option>Billing</option>
//         </select>

//         {(menu_data[opt]).map(i => {
//             // {if(!checkedVals[i]) checkedVals[i] = false}
//             return <><input type="checkbox" className='report' id={i.toLowerCase().split(" ").join("-")} name={i} value={i} onChange={handleCheckbox}/>{i}</>
//         })}

//         <p></p>
//         <Button>Generate</Button>        
//         </div> */}