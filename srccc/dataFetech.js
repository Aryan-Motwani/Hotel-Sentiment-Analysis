import React, { Component } from 'react'
import {db} from './firebase'
// import {collection, query, where, getDocs, updateDoc} from 'firebase'
import 'firebase/firestore';
import './firebase'


export default class DataFetech extends Component {
    constructor(props){
        super(props)
        this.state = {rows : [], email : '', address : '', name: ''}
        this.fetchAll = this.fetchAll.bind(this);
        // this.showData = this.showData.bind(this);
    }

    fetchAll(){
        let rows = [];
        for(let i = 0; i < rows.length; i++){
            rows.pop();
        }
        db.collection("mess")
            .get()
            .then((snapshot) => {
            if(snapshot.docs.length>0){
                snapshot.docs.forEach((doc) => {
                rows.push(doc.data());
            });
            this.setState({rows : rows});
            this.props.getData(rows);
        }})
    }

    // UpdateUserInfo = async() =>{
    //     const q = query(collection(db, "users"), where("email", "==", "mail"));

    //     const querySnapshot = await getDocs(q);
    //     let docID = '';
    //     querySnapshot.forEach((doc) => {
    //     // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
    //       docID = doc.id;
    //     });
    //     const user = doc(db, "users", docID);

    //     // Set the "capital" field of the city 'DC'
    //     await updateDoc(user, {
    //         name: "name",
    //         address: "address"
    //     });
    // }

    
    
    

    componentDidMount(){
        this.fetchAll();
    }

    render(){
        return ;
    }

}
