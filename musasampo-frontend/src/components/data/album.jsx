import React from 'react';




class Albums extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  async createAlbum(albumName, albumLaunchDate, albumPicture, albumGenre){
    async function postmethod(data)
    {
      var FormData = data;
      
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/albums/:bandId',requestOptions)
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
const album = new Albums();
export default album;

