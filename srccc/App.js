import React, { useState } from 'react';
import Form from "./form"
import MenuAppBar from './MenuAppBar';
import { Route, Routes, Switch } from "react-router";
import Home from './Home';
import DataTable from './DataTable';
import Signup from './Signup'
import ReportTemplate from './ReportTemplate';
import Report from './GenerateReport';
import ReportFormat from './ReportFormat';
import CreateReport from './CreateReport';
import VehicleSchedule from './VehicleSchedule';
import { Schedule } from '@mui/icons-material';
import PropertySchedule from './PropertyValuation';
import WordDoc from './WordDoc';
import Editor from './Editor';
import EditorComp from './Editor';
import VehicleValuation from './pages/VehicleValuation';
import Storagee from './Storagee';
import Employee from './Schedule';
import VehicleCreate from './VehicleCreate';
import Test from './Test';
import CreateReportOk from './Test';
import VehicleCreateReport from './VehicleReportCreate';
import VehicleGenerateReport from './VehicleGenerateReport';
import VehicleReportModify from './VehicleReportModify';
import PropertyCreateReport from './PropertyReportCreate';
import PropertyReportModify from './PropertyReportModify';
import PropertyGenerateReport from './PropertyGenerateReport';
import HomePage from './HomePage';

function App() {
  const [login,setLogin] = useState(JSON.parse(localStorage.getItem("loginToken")) == "true" ? JSON.parse(localStorage.getItem("loginToken")) : "false");
  let showSignup;
  if(login == "false")
    showSignup = <Signup changeAuth={changeAuth}/>
  else
    showSignup = <HomePage changeAuth={changeAuth}/>

  function changeAuth(i){
    console.log("auth set true");
    setLogin("true")
  }

  function logout(){
      localStorage.setItem("loginToken",JSON.stringify("false"));
      setLogin("false");
  }


  return(
    <>
    <WordDoc />
    <MenuAppBar logout={logout} userID={login}/>
    <Routes>
      <Route path='Table/Vehicle Valuation/Create Report' element={<VehicleCreateReport/>}/>
      <Route path='Table/Vehicle Valuation/Modify Report' element={<VehicleReportModify/>}/>
      <Route path='Table/Vehicle Valuation/Final Report' element={<VehicleGenerateReport/>}/>
      <Route path='Table/Property Valuation/Create Report' element={<PropertyCreateReport/>}/>
      <Route path='Table/Property Valuation/Modify Report' element={<PropertyReportModify/>}/>
      <Route path='Table/Property Valuation/Final Report' element={<PropertyGenerateReport/>}/>
      <Route path='Vehicle Valuation/Schedule' element={<VehicleSchedule/>}/>
      <Route path='Property Valuation/Schedule' element={<PropertySchedule/>}/>
      <Route path="/" element={showSignup}/>
      <Route path="/form/:formName" element={<Form userID={login} />}/>
      <Route path="/table/:cateogry/:formName" element={<DataTable userID={login} />}/>
      <Route path="/Report Template" element={<ReportTemplate/>}/>
      <Route path="/Generate Report" element={<Report/>}/>
      <Route path="/Report Format" element={<ReportFormat/>}/>
      <Route path="/Create Report" element={<CreateReport/>}/>
      <Route path="/Vehicle" element={<VehicleValuation/>}/>
      <Route path='/Storage' element={<App/>}/>
      <Route path='/Employee' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;