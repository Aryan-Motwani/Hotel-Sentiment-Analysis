import './App.css';
import { Route, Routes } from "react-router";
import Home from './Home';
import HotelPage from './HotelPage';
import First from './First';
import Chartt from './Char';
import ComparePage from './ComparePage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/chart' element={<Chartt/>}/>
      <Route path='/hotel/compare/:hotelName' element={<ComparePage/>}/>
      <Route path='/hotel/:hotelName' element={<HotelPage/>}/>
    </Routes>
  );
}

export default App;
