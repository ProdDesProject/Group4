import React , { Component,Fragment, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './user-information.styles.scss';
import { stringify } from 'querystring';
import getUserInfo from '../../services/user/get-user-info-service';

var base64 = require('base-64');

class User_info extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for getting stuff. Stefan?
    this.state = {
      username:"Kilpikalevi25",
      password:"salis12",
      userId:"",
      username2:"",
      name:"",
      email:"",
      phoneNumber:"",
      selectedFile: null,
      selectedFileName: ""
    };
  }

  //Handles changes on upload realtime:
  handleChange = async event => 
  {
    //save file
    this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });
    //save filename
    this.setState({ selectedFileName: event.target.files[0].name,
      loaded: 0,
      });

  };

  async componentDidMount()
  {
    var result2 = [];
    result2 = await getUserInfo(this.state.username,this.state.password);

    this.setState({userId:result2.user[0].userId});
    this.setState({username:result2.user[0].username});
    this.setState({name:result2.user[0].name});
    this.setState({email:result2.user[0].email});
    this.setState({phoneNumber:result2.user[0].phoneNumber});
    //save result to this.state
  }

  render() {
    return (

       <div>
         <header className="UserInfo">
        <h1>{this.state.userId}</h1>
        <h1>{this.state.username}</h1>
        <h1>{this.state.name}</h1>
        <h1>{this.state.email}</h1>
        <h1>{this.state.phoneNumber}</h1>
        </header>
       </div>

    );
  }
}

export default User_info;


