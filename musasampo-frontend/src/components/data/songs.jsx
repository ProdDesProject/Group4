import React from 'react';



class Songs extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
     
    };
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

  async createSong(songName, MP3, MP4)
  {
    async function postmethod(data)
    {
      var FormData = data;
      
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/:albumId/createsong',requestOptions)
      const data2 = await response.json();

      switch (data2)
    {
      case '404': alert('not found'); break;
      case '400': alert('bad request'); break;
      case '200': alert('done'); break;
      default: alert('something went wrong'); 
    }
    }

  }
}

//Data class object thas is exported to another files
const songs = new Songs();
export default songs;

