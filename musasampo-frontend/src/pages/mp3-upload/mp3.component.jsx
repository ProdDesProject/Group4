import React , { Fragment, useState } from 'react';

import axios from 'axios';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

//import ReactAudioPlayer from 'react-audio-player';



import { withRouter} from 'react-router-dom';

import './mp3.styles.scss';

import { saveAs } from 'file-saver';


//const logo = require('./pictures/bandpic1.png');

import music from '../../music';
import logo from '../../assets/bandpic1.png';
import { stringify } from 'querystring';

/*import music1 from '../../assets/music/Hurt.mp3';
import music2 from '../../assets/music/Angel-of-Death.mp3';
import music3 from '../../assets/music/Kill-the-Cult.mp3';
import music4 from '../../assets/music/La-Grange.mp3';
import music5 from '../../assets/music/Mouth-For-War.mp3';*/

var fs = require('fs'),
  request = require('request');

var base64 = require('base-64');

class Mp3_upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    
    };
  }

  /**
   * TOKEN
   */
  callAPI() 
  {
    if (this.props.location.state != undefined)
    {
      var token2 = this.props.location.state.detail;
      //<p1>{this.callAPI()}</p1>
    return JSON.stringify(token2);
    }
    else{
      return "tyhjä"
    }

  }

 /**
  * DOWNLOAD DATA TO USER BETA
  */
  downloadData()
  {
    //toimii
    var content = "What's up , hello world";
    var filename = "hello.txt";

    var blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
     });

    saveAs(blob,filename);
  }
    
   /**
     * GET-METHOD FOR MUSIC PATH IN BACK-END:
     */
  async fetchMusic()
  {
    const response2 = await fetch('http://localhost:9000/upload/mp3path.mp3/Hurt.mp3');
    var keys = Object.getOwnPropertyNames(response2);
    alert("PÖÖÖÖÖ" + keys);
    //alert(response2);
    //const data2 = await response2.json();
    //alert(stringify(response2));
    return response2;
    
    
    //alert("response2:"+ response2);
    


    
    /*const playAudio = async (id) => {
      try {
        const response = await axios.get(`api/getaudio/id/${id}`)
        const mp3 = new Blob([response.data], { type: 'audio/mp3' })
        const url = window.URL.createObjectURL(mp3)
        const audio = new Audio(url)
        audio.load()
        await audio.play()
      } catch (e) {
        console.log('play audio error: ', e)
      }
    }
    return (
      <ul>
        {this.props.topList.map(item => (
          <li onClick={() => playAudio(item.id)}>{item.title}</li>
        ))}
      </ul>
    )*/
  }


  handleChange = event => {
    //const {name,value } = event.target;
    this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });

    alert(event.target.files[0]);
  };


  onClickHandler = () => 
  {
    //THIS WORKS WITH MP3:

    async function postmethod(data)
    {
      var FormData = data;

      const requestOptions = {
        method: 'POST',
        //headers: { 'Content-Type': '' },
        body: FormData
      }
  
      const response =  await fetch('http://localhost:9000/upload/mp3byfile',requestOptions)
      const data2 = await response;
      //this.setState({ data: data });
  

      //THIS REPLY DOESNT WORK YET
      //alert("Data2:"+stringify(data2));
  
      if (data2 == "404")
        {
          alert("404");  
        }
        else
        {
          alert("done");
        }
      
    }

    const data = new FormData();
    data.append('testFile', this.state.selectedFile);

    postmethod(data);

    
  }

  /**
   * UPDATE ALWAYS WHEN CTRL+R
   * 
   */
  async componentDidMount() {
    /*router.get('/mp3path.mp3/:song', function (req, res) {
    res.sendFile(path.join(__dirname, musicpath, req.params.song));
    });*/

      var music = this.fetchMusic();
  }

  /**
   * RENDER
   */

  render() {
    return (
      <div className="App">
      <header className="App-header">
        < div >
        
    </div >
       
        <img src={logo} alt="bandpic1" width="200" height="200"></img>
        
        <div>

        <audio controls>
        <source src={this.music} type="audio/mpeg"/>
        Your browser does not support the audio element.
        </audio>

        <form enctype="multipart/form-data">
          <input type = "file" name="file" id="file" accept = ".mp3" onChange={this.handleChange}/>
          <input type = "button" value = "Click to upload!" name = "button" onClick = {this.onClickHandler}/>
        </form>

        </div>
      </header>
    </div>

    );
  }
}

export default withRouter(Mp3_upload);
