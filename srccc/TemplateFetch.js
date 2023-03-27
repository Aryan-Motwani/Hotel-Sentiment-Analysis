import React, { Component } from 'react'
import {db} from './firebase'
// import {collection, query, where, getDocs, updateDoc} from 'firebase'
import 'firebase/firestore';
import './firebase'


export default class TemplateFetch extends Component {
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
        db.collection("templates")
            .get()
            .then((snapshot) => {
            if(snapshot.docs.length>0){
                snapshot.docs.forEach((doc) => {
                rows.push(doc.data());
            });
            this.setState({rows : rows});
            this.props.getTemplateData(rows)
        }
        })
    }

    componentDidMount(){
        this.fetchAll();
    }

    render(){
        return ;
    }

}
