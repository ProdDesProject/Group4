import React from 'react';

//import ALBUMS from '../../data/albums';
//import BANDS from '../../data/bands';

import SearchBox from '../search-box/search-box.component';
import AlbumItem from '../album-item/album-item.component';
import BandItem from '../band-profile-item/band-profile-item.component';
import fetchData from '../../services/band/get-band-by-userid-service';
import getUserID from '../../services/user/get-userid-by-username.service';

import './profile.bands.styles.scss';

{/* Search page */ }

class Bands extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            bands: [],
            pictures: [],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    async componentDidMount() {

      /*obj = 
      {
          result: true,
          token: await loginResponse.json(),
          username: username2
      };*/
        var loggedInUser = [];
        loggedInUser = JSON.parse(localStorage.getItem("currentToken"));
        let username = loggedInUser.username;

        var userId = await getUserID(username);

        //alert(userId.result[0].userId);

        //loggedInUser = loggedInUser.filter(text => text = "username");
        
        var userId = userId.result[0].userId;

        let BANDS = await fetchData(userId);
        //BANDS = await BANDS.json();

        this.setState({ bands: BANDS.bands });
        
        var BandsAndPictures = [];
        BandsAndPictures = BANDS.bands;


        //Get url for getting picture for bands
        for (var i=0;i<BANDS.bands.length;i++)
        {
            var url = 'http://localhost:9000/upload/imagepath.png/'+BANDS.bands[i].bandName+'/'+ BANDS.bands[i].bandLogo;
            //Save url to array:
            BandsAndPictures[i].bandLogo = url;
        };

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i=0;i<BANDS.bands.length;i++)
        {
            BandsAndPictures[i].bandName = decodeURIComponent(BandsAndPictures[i].bandName);
        };

        this.setState({ bands: BandsAndPictures });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { bands, searchField } = this.state;

        {/* filter bands with search field value  */ }
        const filteredBands = bands.filter(band =>
            band.bandName.toLowerCase().includes(searchField.toLowerCase())
        );
        return (
          
            <div className="search-page">
                <div className="search-preview">
                   
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        YOUR BANDS
                    </h2>

                    <div className='items'>
                        {filteredBands
                            .filter((band, idx) => idx < bands.length)
                            .map(band => (
                                <BandItem key={band.bandId} band={band} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Bands;
