import React, { Component } from 'react';

import getBandsBandId from "../../services/band/get-band-by-bandId-servise"
import './band.styles.scss';

export default class SimpleTabs extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {band : {}, logoPath: ''};
  }

  async componentDidMount()
  {
    const bandId = this.props.match.params.bandId;
    //console.log(this.props.match.params.bandId)
    const result = await getBandsBandId(bandId)
    if(result.status === 200)
    {
      //get the json result
      const band = await result.json();
      this.setState({band: band[0]});
      this.setState({logoPath: "http://localhost:9000/upload/imagepath.png/" + band[0].bandName + "/" + band[0].bandLogo})
      //console.log(band, this.state.logoPath);
    }
    else
    {
      alert("Error at fetching the band info");
    }
  }
  

    render()
    {
      return (
        <div className='band-page'>

          <div className='title'>
            {decodeURIComponent(this.state.band.bandName)}
          </div>

            <div className='descriptor'>
              <dt>Country of origin:</dt>
            </div>

            <div className='infotext'>
              <dt>{decodeURIComponent(this.state.band.country)}</dt>
            </div>

          <div className='container10'>

            <div className='bandLogo'>
              <img className='img' src={decodeURIComponent(this.state.logoPath)} />
            </div>
            
          </div>
        </div>
      );
    }

  }
