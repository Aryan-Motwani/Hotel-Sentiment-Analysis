import React, { Component } from 'react'
import {db} from './firebase'
import TablbleComp from './TableComp'

export default class FirebaseTable extends Component {
  constructor(props){
    super(props)
    this.state = {rows : [], varr : 0}
    this.handlePress = this.handlePress.bind(this);
  }

  
  
  fetchAll(){
    let rows = [];
    for(let i = 0; i < rows.length; i++){
      rows.pop();
    }
    db.collection("messages")
      .get()
      .then((snapshot) => {
        if(snapshot.docs.length>0){
          snapshot.docs.forEach((doc) => {
            rows.push(doc.data());
        })
        this.setState({rows : rows});
      }
    })
  }

  handlePress(e) {
    console.log(e);
    this.fetchAll()
    setTimeout(() => {
      this.setState({rows : this.state.rows, varr : 1})
      this.state.rows.forEach(i => {
        console.log(i);
      })
    }, 1000);

  }

  componentDidMount(){
    this.handlePress();
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handlePress}>Press</button>
        <TablbleComp rows={this.state.rows}/>
        </div>
    )
  }
}
