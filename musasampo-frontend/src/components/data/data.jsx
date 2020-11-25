import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './data.scss';

import { withRouter} from 'react-router-dom';
import { stringify } from 'querystring';
import ReactPlayer from "react-player";

class Data extends React.Component 
{
  constructor(props) {
    super(props);

  }

  //Method for Get-method for all songs from backend.
  async getAllSongs() 
  {
    const response2 = await fetch('http://localhost:9000/songs')
    const data2 = await response2.json(); 
    
    //this is furioiting to find right path to inside of object:
    //alert(data2.songs[0].songName);
    return data2;
  }

  //Method for Get-method for all bands from backend.
  async getAllBands()
    {
      //BANDS INFO FROM BACK-END
      const response1 = await fetch('http://localhost:9000/bands/')
      const data1 = await response1.json();
      
      //stringify(data2.songs)
      //alert(data1[0].country);
          
      return data1;
    }

  async getAllUsers()
  {
    const result = await fetch("http://localhost:9000/users/")
    const data = await result.json();

    return data;
  }
    

  /*async componentDidMount() 
  { 
    //get-songs from backend
    const returnData = await this.getSongs();
    //alert(returnData[0].songName);

    async function getBand()
    {
      //BANDS INFO FROM BACK-END
      const response1 = await fetch('http://localhost:9000/bands/1')
      const data1 = await response1.json();
      
      //stringify(data2.songs)
      //alert(data1[0].country);
          
      return data1;
    }
    
    var result1 = await getBand();

    //var country2 = result1[0].country;
    this.setState({ returnData : returnData[0].songName });

    //setting setSate global variables from band
    this.setState({ 
      bandId : result1[0].bandId,
      nswf : result1[0].nswf,
      bandName : result1[0].bandName,
      bandLogo : result1[0].bandLogo,
      country: result1[0].country, 
      location : result1[0].location,
      status : result1[0].status,
      formedIn : result1[0].formedIn,
      yearsactive : result1[0].yearsActive,
      genres : result1[0].genres,
      lyricalThemes : result1[0].lyricalThemes,
      currentLabel : result1[0].currentLabel
      });

  }*/

}

  /*
  render() {
    let { bandId,nswf,bandName,bandLogo,country,location,status,formedIn,yearsactive,genres,lyricalThemes,currentLabel } = this.state;
    const { returnData } = this.state;
    return (
      <div>

            <div className='title'>
              {}
            </div>

        <div className='description'>
             <div className='descriptor'>
                <dt>Country of origin:</dt>
                <dt>Location:</dt>
                <dt>Status:</dt>
                <dt>Formed in:</dt>
                <dt>Years active:</dt>
                <dt>Genres:</dt>
                <dt>Lyrical themes:</dt>
                <dt>Current label</dt>
            </div>

            <div className='infotext'>
                <dt>{country}</dt>
                <dt>{location}</dt>
                <dt>{status}</dt>
                <dt>{formedIn}</dt>
                <dt>{yearsactive}</dt>
                <dt>{genres}</dt>
                <dt>{lyricalThemes}</dt>
                <dt>{currentLabel}</dt>  
            </div>
          
            <h1>Music song:</h1>
            <div>{returnData}</div>

            <div className='bandLogo'>
              <img className='img' src={"http://localhost:9000/upload/imagepath.png/pyrynlogo.png"} />
            </div>
            <div className='bandImage'>
              <img className='img' src={"http://localhost:9000/upload/imagepath.png/bandpic1.png"} />
            </div>
        </div>

            
      </div>
    );
  }
}*/

//export default withRouter(Band);


//Data class object thas is exported to another files
const data = new Data();
export default data;
