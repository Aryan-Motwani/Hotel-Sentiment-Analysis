// Stars
// Pics
// Link to the hotel page
// Wordcloud
// Chart
// Normalization

import React, { useEffect } from 'react'
import { MDBBtn, MDBContainer, MDBInput, MDBListGroup, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import { Button } from '@mui/material'
import "./hotel.css" 
import {reviews} from './reviewEmojiless'
import { finalReviews } from './finalReviews'
import { Chart } from '@devexpress/dx-react-chart'
import Chartt from './Char'
import { height } from '@mui/system'
import Table from 'react-bootstrap/Table';


export default function HotelPage(props) {

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

    let hotelName = window.location.pathname.split("/")[2].split("%20").join(" ")
    // console.log(hotelNames.indexOf(hotelName));
    // let hotelName = props.hotel == 1 ?  "OYO 27640 Hotel Blue Sapphire Residency" : "OYO 30693 Hotel Blue Executive";
    let hotelLink = () => {

      let i = 0;
      while(i < reviews.length){
        if(reviews[i]['Hotel_name'] == hotelName){
          // console.log(reviews[i]['Hotel_url'])
          // document.querySelector('.hotel-name').onClick = () => {
          //   window.open(reviews[i]['Hotel_url'], '_blank', 'noreferrer')
          // }
          return reviews[i]['Hotel_url'];
        }
        i++;
      }
    }

    let score;
    finalReviews.forEach(i => {
      if(i.title == hotelName){
        score = i.score;
      }
    })
    Object.keys(score).forEach(i => {
      score[i] = Math.floor((score[i]/373)*100)
    })
    const giveRating = (item, stars) => {
      document.querySelectorAll('.first').forEach(i => {
        if(item == i.textContent){
          for(let j = 0; j < 4; j++){
            i.nextElementSibling.children[0].children[j].style.color = 'white'
          }    
          for(let j = 0; j < stars; j++){
            i.nextElementSibling.children[0].children[j].style.color = 'black'
          }    
        }
      })
  
      let obj = {};
      reviews.forEach(i => {
      if(Object.keys(obj).indexOf(i["Hotel_name"]) == -1){
          obj[i["Hotel_name"]] = []
      }
      obj[i["Hotel_name"]].push(i["Hotel_list1_Reviews_list2_review"])
      })
  
      let ammenities = {"room" :[["nice","clean","decent", "hassle free","good","super", "comfortable", "maintained", "best for couples","spacious","pleasant", "neat", "bed comfortable", "bed clean", "tidy", "spic and span","great"],["except","no ventilation","mosquitoes", "cockroaches", "smelled", "not cleaned", "smelly", "uncleaned", "wet","not spacious", "leaking", "too small", "small", "extra charge","leaking","did not work","bed uncomfortable","shity","not good" ,"bed not clean","smelling","pathetic","poor","dirt mark", "worst"]],
      "staff":[["polite","non intrusive","professional", "helpful", "friendly", "fantastic", "cooperative","needed", "down to earth", "well-trained", "humble", "supporting","supportive","care","supportive","satisfactory","hospitality","amazing"],["unpolite","forceful" ,"unfriendly", "rude", "unsupportive", "non introsive", "unprofessional","arrogant","don't have manners"]],
      "food":[["best","tasty","hygenic", "fresh", "delicious", "instant", "clean", "hazzle free"],["bad","worst","pathetic", "expensive","tasteless" ,"not invoice", "cost is high","average","horrible","limited","waste of money"]],
      "Ac":[["good","best","works nicely"],["bad","poor","worst","not working properly","poor performance"]],
      "Tv":[["good","best","great","bright color","huge","good connection","good sound","working properly","working","great sound"],["bad","not good","not great","worst","not in working condition","not working","poor connection","worst experience","no connection","poor","bad sound"]]
      }
  
      let ammenitie_words = 
      {"staff": ["staff","employee","workers","service", "manager","receptionist", "management","hospitality","facility","facilities"],
        "room": ["room","wall","environment","hygene","ventilation","experience","mattress","bedsheet","sheet","cover", "hotel","place","view","location","stay", "cleanlisness","washroom","bathroom","check in","check-in"],
        "food":["food","Swiggy","Zomato","quality","option"],
        "Ac":["AC","ac","Ac","Air Conditinor"],
        "Tv":["TV","Tv","tv","Tele vision","Television","television"]
      }
  
      const reviewScore = (r) => {
      let reviewScore = []
      let reviewObj = {"staff" : [],"room" : [], "food" : [], "Tv" : [], "Ac" : []};
      r.split(",").forEach(review => {
        let objjj = {}
        Object.keys(ammenitie_words).forEach(aminitie_word => {
          ammenitie_words[aminitie_word].forEach(spec_aminitie => {
            if(review.indexOf(spec_aminitie) != -1)
            ammenities[aminitie_word][0].forEach(good_adjective => {
              if(review.indexOf(good_adjective) != -1){
                Array.isArray(objjj[aminitie_word]) ? 
                objjj[aminitie_word].push(good_adjective)
                :
                objjj[aminitie_word] = [];
                objjj[aminitie_word].push(good_adjective)
              }
            })
          })
          ammenitie_words[aminitie_word].forEach(spec_aminitie => {
            if(review.indexOf(spec_aminitie) != -1)
            ammenities[aminitie_word][1].forEach(good_adjective => {
              if(review.indexOf(good_adjective) != -1){
                Array.isArray(objjj[aminitie_word]) ? 
                objjj[aminitie_word].push(good_adjective)
                :
                objjj[aminitie_word] = [];
                objjj[aminitie_word].push(good_adjective)
              }
            })
          })
        })
        Object.keys(objjj).forEach(i => {
          if(objjj[i]){
  
            objjj[i] = Array.from(new Set(objjj[i]))
          }
        })
        reviewScore.push(objjj)
      })
      // console.log(reviewObj)
      reviewScore.forEach(i => {
        reviewObj[Object.keys(i)[0]] = i[Object.keys(i)[0]]
      })
      // console.log(reviewObj)
  
      // console.log(reviewObj);
  
      let reviewScore2 = {"staff" : 0,"room" : 0, "food" : 0, "Tv" : 0, "Ac" : 0};
      Object.keys(reviewObj).forEach(i => {
        if(!reviewObj[i])
          return
  
        reviewObj[i].forEach(j => {
          if(ammenities[i][0].indexOf(j) != -1){
            reviewScore2[i] += 1;
          }
          if(ammenities[i][1].indexOf(j) != -1){
            reviewScore2[i] -= 1;
          }
        })
      })
  
      let indScores = {"staff" : 0,"room" : 0, "food" : 0, "Tv" : 0, "Ac" : 0};
  
      Object.keys(reviewObj).forEach(i => {
        if(i == "undefined"){
          return
        }
        // console.log(ammenities[i],i)
        ammenities[i][0].forEach(j => {
          if(reviewObj[i].indexOf(j) != -1){
            indScores[i]++
          }
        })
        ammenities[i][1].forEach(j => {
          if(reviewObj[i].indexOf(j) != -1){
            indScores[i]--
          }
        })
      })
  
  
      return indScores;
    }
  
    // console.log("Nice room. Good service ðŸ‘x")
  
    for(let i = 0; i < 20; i++){
      let finalScores = {"staff" : 0,"room" : 0, "food" : 0, "Tv" : 0, "Ac" : 0};
      obj[Object.keys(obj)[i]].forEach(i => {
        let score = reviewScore(i)
        Object.keys(score).forEach(j => {
          finalScores[j] += score[j] 
        })
      })
        // console.log(reviewScore(reviews[i]["Hotel_list1_Reviews_list2_review"]));
      // console.log(Object.keys(obj)[i])
      // console.log(finalScores);
    }
  
  
    // reviews[0].forEach(i => {
    //   let scores = reviews[0]
    // })
  
    finalReviews.forEach(i => {
      if(i.title == hotelName){
        // console.log(i.score);
      }
    })
  
    
      // document.querySelectorAll('.box').forEach(j => {
      //   if(j.children[0].textContent == item){
      //     for(let i = 0; i < 5; i++){
      //       j.children[1].children[i].style.color = '#4f4f4f'
      //     }
      //     for(let i = 0; i < stars; i++){
      //       j.children[1].children[i].style.color = 'blue'
      //     }
      //   }
      // })
    }


    let rateThem = (sc, star) => {
      // console.log(sc);
      if(sc > -10 && sc < 10){
        giveRating(star,1);
      }else if(sc > 10 && sc < 20){
        giveRating(star,2);
      }else if(sc > 20 && sc < 80){
        giveRating(star,3);
      }else if(sc > 80 && sc < 100){
        // console.log("hi");
        giveRating(star,4);
      }
    }

    // rateThem(10,"Room");


  



  // giveRating("Room",5)
  // giveRating("Staff",4)
  // giveRating("Food",4)
  // giveRating("TV",4)
  // giveRating("AC",2)

  const autoRate = () => {
    giveRating("Room",5)
  giveRating("Staff",4)
  giveRating("Food",4)
  giveRating("TV",4)
  giveRating("AC",2)
  }

  document.addEventListener("keydown", (e) => {
    // giveRating("Room",5)
    // giveRating("Staff",4)
    // giveRating("Food",4)
    // giveRating("TV",4)
    // giveRating("AC",2)
  })

  let ammenitiess = {"room" :[["nice","clean","decent", "hassle free","good","super", "comfortable", "maintained", "best for couples","spacious","pleasant", "neat", "bed comfortable", "bed clean", "tidy", "spic and span","great"],["except","no ventilation","mosquitoes", "cockroaches", "smelled", "not cleaned", "smelly", "uncleaned", "wet","not spacious", "leaking", "too small", "small", "extra charge","leaking","did not work","bed uncomfortable","shity","not good" ,"bed not clean","smelling","pathetic","poor","dirt mark", "worst"]],
    "staff":[["polite","non intrusive","professional", "helpful", "friendly", "fantastic", "cooperative","needed", "down to earth", "well-trained", "humble", "supporting","supportive","care","supportive","satisfactory","hospitality","amazing"],["unpolite","forceful" ,"unfriendly", "rude", "unsupportive", "non introsive", "unprofessional","arrogant","don't have manners"]],
    "food":[["best","tasty","hygenic", "fresh", "delicious", "instant", "clean", "hazzle free"],["bad","worst","pathetic", "expensive","tasteless" ,"not invoice", "cost is high","average","horrible","limited","waste of money"]],
    "Ac":[["good","best","works nicely", "chill", "cool"],["bad","poor","worst","not working properly","poor performance"]],
    "Tv":[["good","best","great","bright color","huge","good connection","good sound","working properly","working","great sound"],["bad","not good","not great","worst","not in working condition","not working","poor connection","worst experience","no connection","poor","bad sound"]]
    }

    useEffect = () => {
      // console.log("hi");
      setTimeout(() => {
        hotelLink()
        document.querySelector('.Target-root').style.width = "500px";
        document.querySelector('.Target-root').style.height = "330px";
        document.querySelector('.Target-root').style.display = "";
        document.querySelector('.main-div').style.opacity = "100"
      }, 1000)
      setTimeout(() => {
        console.log(score)
        rateThem(score["room"],"Room")
        rateThem(score["staff"],"Staff")
        rateThem(score["food"],"Food")
      },1000)
    }

  return (
    <div className='main-div' style={{opacity : 0}}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-80 mainn">

        <div className='heading'>
          <h3 className='hotel-name'><a href={hotelLink()} target="_blank" rel="noreferrer">{hotelName}</a></h3>
          <MDBBtn className="btnn" onClick={() => {window.location.pathname = "/"}}>Back</MDBBtn>
          <MDBBtn className="btnn" onClick={() => {window.location.pathname = "/hotel/compare/"+hotelName}}>Compare</MDBBtn>
        </div>

        <div className='chart-pic'>
          <div className='chart' >
            {/* <img className='prm-img' src='https://firebasestorage.googleapis.com/v0/b/survey-app-3db7b.appspot.com/o/e806f9c5-3765-e5d2-5bbd-a50ef2dd7bd0?alt=media&token=050df183-7c8f-4759-8a09-9e67ec5c462c'></img> */}
            <Chartt chartVals={[
              { year: 'Room', population: Math.abs(score['room']) },
              { year: 'Staff', population: Math.abs(score['staff']) },
              { year: 'Food', population: Math.abs(score['food']) },
            ]}/>
          </div>
          <div className='imgs'>
          <img className='prm-img' src={require(`./hotel_imgs/${hotelName}/IMG1.png`)}></img>
          <div className='img-layout'>
          <img className='sec-img' src={require(`./hotel_imgs/${hotelName}/IMG2.png`)}></img>
          <img className='sec-img'src={require(`./hotel_imgs/${hotelName}/IMG3.png`)}></img>
          </div>
          </div>
        </div>

        <div className='main-content'>
          <h3>Amenity Score</h3>

          <Table className='hotel-page-table'>
            <thead>
              <tr>

              <th>Name</th>
              <th>Rating</th>
              <th>Positive Reviews</th>
              <th>Negative Reviews</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='first'>Room</td>
                <td><div className="stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div></td>
                {/* {console.log(ammenitiess["room"][0])} */}
                {/* <td>{amen}</td> */}
                <td>{ammenitiess["room"][0][Math.floor(Math.random()*(ammenitiess["room"][0].length-1))]}, {ammenitiess["room"][0][Math.floor(Math.random()*(ammenitiess["room"][0].length-1))]}</td>
                <td>{ammenitiess["room"][1][Math.floor(Math.random()*(ammenitiess["room"][1].length-1))]}, {ammenitiess["room"][1][Math.floor(Math.random()*(ammenitiess["room"][1].length-1))]}</td>
              </tr>
              <tr>
                <td className='first'>Staff</td>
                <td><div className="stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div></td>
                <td>{ammenitiess["staff"][0][Math.floor(Math.random()*(ammenitiess["staff"][0].length-1))]}, {ammenitiess["staff"][0][Math.floor(Math.random()*(ammenitiess["staff"][0].length-1))]}</td>
                <td>{ammenitiess["staff"][1][Math.floor(Math.random()*(ammenitiess["staff"][1].length-1))]}, {ammenitiess["staff"][1][Math.floor(Math.random()*(ammenitiess["staff"][1].length-1))]}</td>
              </tr>
              <tr>
                <td className='first'>Food</td>
                <td><div className="stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div></td>
                <td>{ammenitiess["food"][0][Math.floor(Math.random()*(ammenitiess["food"][0].length-1))]}, {ammenitiess["food"][0][Math.floor(Math.random()*(ammenitiess["food"][0].length-1))]}</td>
                <td>{ammenitiess["food"][1][Math.floor(Math.random()*(ammenitiess["food"][1].length-1))]}, {ammenitiess["food"][1][Math.floor(Math.random()*(ammenitiess["food"][1].length-1))]}</td>
              </tr>
            </tbody>
          </Table>
          
          <MDBListGroup></MDBListGroup>
          <div className='wordcloud'>
            <h3>Wordcloud</h3>
            <img className='prm-img' src={require(`./Wordcloud/WordCloud${hotelNames.indexOf(hotelName)}.png`)}></img>
          </div>
        </div>

        </MDBContainer>

    </div>
  )
}


