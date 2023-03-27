import React, { useEffect, useState } from 'react'
import "./home.css"
import { finalReviews } from './finalReviews';
import Table from 'react-bootstrap/Table';


export default function Home() {
  const [filter, setFilter] = useState();
  let hotelNames = ["Capital O 8193 Hotel Pearl",
  "Capital O 61246 Hotel De Meridian",
  "Capital O 62560 Hotel Zaid International",
  "Capital O 71247 Jk Regency",
  "Capital O 80951 Hotel New Radsson Suite",
  "Capital O 701204 Hotel Art Inn",
  "Collection O 74371 Golden Tulipz Boutique",
  "Flagship 8544 Hotel Bentleys",
  "Flagship 75954 Hotel Neelkamal Chembur",
  "OYO 4083 Hotel Alfa Grand",
  "OYO 5512 Hotel Avenue",
  "OYO 5665 Rana Residency",
  "OYO 6202 Ashir Inn",
  "OYO 8685 Hotel Stayland",
  "OYO 9849 Hotel Divine Residency",
  "OYO 10001 Hotel Blue Ocean",
  "OYO 11720 Gold Coast Inn",
  "OYO 12537 Hotel Lake Bloom Residency 2",
  "OYO 16446 Hotel Veera Residency",
  "OYO 18581 Hotel Blue Inn Residence",
  "OYO 19156 Hotel Greenforest",
  "OYO 27640 Hotel Blue Sapphire Residency",
  "OYO 29794 A K Residency",
  "OYO 30693 Hotel Blue Executive",
  "OYO 40902 Anjali Hotel Mumbai",
  "OYO 49867 Hotel Kalpana Residency",
  "OYO 69614 Hotel Diamond",
  "OYO 75402 Hotel Rk Grace",
  "OYO 78659 Collection O Hotel Jayshree Domestic Airport",
  "OYO 79617 Hotel Ahlan International",
  "OYO 80506 Hotel Mahi",
  "OYO 80565 Hotel Arton",
  "OYO 80898 The Om Sai Residency",
  "OYO 85367 Hotel New Ak Palace",
  "OYO 87230 Mumbai Residency",
  "OYO 92129 Hotel S K Palace",
  "OYO Flagship 77048 Nishita Residency",
  "OYO Flagship 83767 Hotel New Sharah Inn",
  "OYO Townhouse 058 JB Nagar, Andheri East",
  "OYO Townhouse 799 Royal Palms Hotel - Lily Collection",
  "OYO Townhouse 808 Royal Palms Shared Serviced Apartment",
  "OYO Townhouse 809 Royal Palms Hotel - Rose Collection",
  "OYO Townhouse 877 The Unicontinental",
  "OYO Townhouse 878 The Unicontinental2",
  "SPOT ON 23634 City Inn Guest House",
  "SPOT ON 78316 Hotel Grand Skylight"]
  let hotelPrices = [3331, 3302, 2063, 2716, 3276, 2081, 2300,2300, 2182, 2439, 3088, 2296, 2193, 3200, 2174, 2812, 2661, 3410, 3488, 2872, 3372, 2607, 3476, 3430, 3216, 3099, 2261, 2429, 2306, 2983, 3027, 2229, 3041, 2356, 2714, 3463, 3151, 3396, 2715, 3241, 3277, 2668, 3116, 2535, 2666, 2922, 2128,2182, 2439, 3088, 2296, 2193, 3200, 2174, 2812, 2661, 3410, 3488, 2872, 3372, 2607, 3476, 3430, ]
  let a = finalReviews;
  for(let i = 0; i < a.length; i++){
    for(let j = 0; j < a.length-1; j++){
        if(a[j].score["room"] < a[j+1].score["room"]){
            let temp = a[j];
            a[j] = a[j+1];
            a[j+1] = temp;
        }
    }
  }

  let reviewCounts = {"OYO 9849 Hotel Divine Residency" : 313 ,
"Capital O 62560 Hotel Zaid International" : 317 ,
"OYO Townhouse 3858 JB Nagar, Andheri East" : 45,
"OYO 87230 Mumbai Residency" : 44 ,
"OYO Townhouse 809 Royal Palms Hotel - Rose Collection" : 189 ,
"OYO Townhouse 877 The Unicontinental" : 188 ,
"OYO 27640 Hotel Blue Sapphire Residency" : 1682 ,
"OYO 69614 Hotel Diamond" : 119 ,
"OYO Townhouse 058 JB Nagar, Andheri East" : 178 ,
"OYO 30693 Hotel Blue Executive" : 891 ,
"OYO 92129 Hotel S K Palace" : 29 ,
"OYO Townhouse 808 Royal Palms Shared Serviced Apartment" : 197 ,
"OYO 85367 Hotel New Ak Palace" : 40 ,
"OYO Townhouse 799 Royal Palms Hotel - Lily Collection" : 169 ,
"OYO 80565 Hotel Arton" : 2 ,
"OYO 49867 Hotel Kalpana Residency" : 93 ,
"OYO 40902 Anjali Hotel Mumbai" : 196 ,
"Capital O 8193 Hotel Pearl" : 10 ,
"Capital O 80951 Hotel New Radsson Suite" : 29 ,
"OYO 11720 Gold Coast Inn" : 101 ,
"OYO Townhouse 878 The Unicontinental2" : 320 ,
"OYO 19156 Hotel Greenforest" : 185 ,
"OYO 18581 Hotel Blue Inn Residence" : 494 ,
"OYO 5512 Hotel Avenue" : 141 ,
"Capital O 701204 Hotel Art Inn" : 16 ,
"OYO 78659 Collection O Hotel Jayshree Domestic Airport" : 177 ,
"OYO Flagship 83767 Hotel New Sharah Inn" : 22 ,
"OYO 79617 Hotel Ahlan International" : 172 ,
"Capital O 61246 Hotel De Meridian" : 24 ,
"SPOT ON 78316 Hotel Grand Skylight" : 1 ,
"Capital O 71247 Jk Regency" : 455 ,
"OYO 5665 Rana Residency" : 860 ,
"OYO 16446 Hotel Veera Residency" : 90 ,
"OYO 6202 Ashir Inn" : 91 ,
"OYO 80506 Hotel Mahi" : 57 ,
"OYO 12537 Hotel Lake Bloom Residency 2" : 1 ,
"Flagship 75954 Hotel Neelkamal Chembur" : 215 ,
"Collection O 74371 Golden Tulipz Boutique" : 323 ,
"OYO Flagship 77048 Nishita Residency" : 1 ,
"OYO 75402 Hotel Rk Grace" : 92 ,
"OYO 29794 A K Residency" : 94 ,
"OYO 80898 The Om Sai Residency" : 31 ,
"OYO 4083 Hotel Alfa Grand" : 99 ,
"SPOT ON 23634 City Inn Guest House" : 156 ,
"OYO 8685 Hotel Stayland" : 23 ,
"OYO 10001 Hotel Blue Ocean" : 297 ,
"Flagship 8544 Hotel Bentleys" : 14 }

  const [tableReviews, setTableReviews] = useState(a.map((i,j) => {
    return  <tr>
      <td onClick={() => {window.location.pathname = `/hotel/${i["title"]}`}}>{i.title}</td>
      <td>{Math.floor(((i.score["room"]+50)/373)*100)}%</td>
      <td>{Math.floor((i.score["staff"]/373)*100)}%</td>
      <td>{Math.floor((i.score["food"]/373)*100)}%</td>
      <td>{hotelPrices[hotelNames.indexOf(i.title)]}</td>
      <td>{reviewCounts[i.title] + 15}</td>
      {/* <td>{Math.floor((i.score["Tv"]/373)*100)}%</td>
      <td>{Math.floor((i.score["Ac"]/373)*100)}%</td> */}
    </tr>
  }));


 


const handleClick = () => {
  setFilter(a.map(i => <h3 onClick={() => {window.location.pathname = `/hotel/${i.title}`}}>{i.title}</h3>))
}


document.addEventListener("keydown", (e) => {
  // setFilter(a.map(i => <h5 onClick={() => {window.location.pathname = `/hotel/${i.title}`}}>{i.title}</h5>))


})




  const [filterStates, setFilterStates] = useState({"room" : 0, "food" : 0, "staff" : 0})

  const handleFilter = (e) => {
    console.log(e.target.textContent.toLowerCase())
    let a = finalReviews;
    let filterr = e.target.textContent.toLowerCase()
    filterStates[filter] = filterStates[filter] == 0 ? 1 : 0;
    for(let i = 0; i < a.length; i++){
      for(let j = 0; j < a.length-1; j++){
        if(filterStates[filter] == 0){

          if(a[j].score[filterr] < a[j+1].score[filterr]){
            let temp = a[j];
            a[j] = a[j+1];
            a[j+1] = temp;
          }
        }else{
          if(a[j].score[filterr] > a[j+1].score[filterr]){
            let temp = a[j];
            a[j] = a[j+1];
            a[j+1] = temp;
          }
        }
      }
    }
    if(e.target.tagName != "TH"){

      document.querySelectorAll('.filter').forEach(i => {
        i.style.background = 'gray'
      })
      e.target.style.background = 'red'
    }
    // setFilter(a.map(i => <h5 onClick={() => {window.location.pathname = `/hotel/${i.title}`}}>{i.title}</h5>))
    setTableReviews(a.map((i,j) => {
      return  <tr>
        <td onClick={() => {window.location.pathname = `/hotel/${i["title"]}`}}>{i.title}</td>
        <td>{Math.floor(((i.score["room"]+50)/373)*100)}%</td>

      <td>{Math.floor((i.score["staff"]/373)*100)}%</td>
      <td>{Math.floor((i.score["food"]/373)*100)}%</td>
      <td>{hotelPrices[hotelNames.indexOf(i.title)]}</td>
      <td>{reviewCounts[i.title] + 15}</td>

      {/* <td>{Math.floor((i.score["Tv"]/373)*100)}%</td>
      <td>{Math.floor((i.score["Ac"]/373)*100)}%</td> */}
      </tr>
    }))
  }


 
  return (
    <div className='home'>
        <h1>Home Page</h1>
        <p></p>
        <div className='filters'>
        <h3 style={{margin: "10px"}}>Filters :</h3>
          <div className='filter' onClick={handleFilter}>{"room".toUpperCase()}</div>
          <div className='filter' onClick={handleFilter}>{"staff".toUpperCase()}</div>
          <div className='filter' onClick={handleFilter}>{"food".toUpperCase()}</div>
          {/* <div className='filter' onClick={handleFilter}>tv</div>
          <div className='filter' onClick={handleFilter}>Ac</div> */}
        </div>
        <p></p>
        {/* <h1></h1> */}
        {filter}
        <Table striped bordered hover responsive border={"0px solid black"} >
            <thead>
                <tr className='thead'>
                    <th>Hotel Name</th>
                    <th onClick={handleFilter}>{"room".toUpperCase()}</th>
                    <th onClick={handleFilter}>{"staff".toUpperCase()}</th>
                    <th onClick={handleFilter}>{"food".toUpperCase()}</th>
                    {/* <th>Staff</th>
                    <th>Food</th> */}
                    <th>Price</th>
                    <th>ReviewCount</th>
                </tr>
            </thead>
            <tbody>
              {/* {console.log(finalReviews[0])} */}
                {/* {this.state.rows} */}


                {tableReviews}
                {/* {finalReviews.map(i => {
    return  <tr>
      <td>{i.title}</td>
      <td>{i.score["room"]}</td>
      <td>{i.score["staff"]}</td>
      <td>{i.score["food"]}</td>
      <td>{i.score["Tv"]}</td>
      <td>{i.score["Ac"]}</td>
    </tr>
  })} */}
            </tbody>
        </Table>
    </div>
  )
}



