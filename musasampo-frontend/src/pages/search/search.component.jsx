
import React from 'react';

import SearchBox from '../../components/search-box/search-box.component';
import BandItem from '../../components/band-item/band-item.component';

import getBands from '../../services/band/get-band-service.js';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';


import './search.styles.scss';

{/* Search page */ }

class Search extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            bands: [],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    async componentWillMount() {


        let BANDS = await getBands();
        BANDS = await BANDS.json();

        //console.log(BANDS);

        this.setState({ bands: BANDS.bands });
        
        var BandsAndPictures = [];
        BandsAndPictures = BANDS.bands;

        //Get url for getting picture for bands
        for (var i=0;i<BANDS.bands.length;i++)
        {
            var url = 'http://localhost:9000/upload/imagepath.png/'+BANDS.bands[i].bandName+'/'+ BANDS.bands[i].bandLogo;
            //Save url to array:
            BandsAndPictures[i].bandLogo = url;
            BandsAndPictures[i].bandName = decodeURIComponent(BandsAndPictures[i].bandName);
        };

        this.setState({ bands: BandsAndPictures });

        //console.log(this.state.albums);
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { bands, searchField } = this.state;

        const filteredBands = bands.filter(band =>
            band.bandName.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className="search-page">
               
               <SearchBox onSearchChange={this.onSearchChange} />

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        BANDS
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

export default Search;
