import React from 'react';

//import ALBUMS from '../../data/albums';
//import BANDS from '../../data/bands';

import SearchBox from '../search-box/search-box.component';
import AlbumsItem from '../albums-item/albums-item.component';
import BandItem from '../band-item/band-item.component';

import getAlbumsByBandId from '../../services/album/albums-by-bandid-service';
import getUserID from '../../services/user/get-userid-by-username.service';
import { stringify } from 'querystring';

import './albums.styles.scss';

{/* Search page */ }

class Albums extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            albums: [],
            pictures: [],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    async componentDidMount() {
      //alert(this.props.location.state.detail);
      var bandId = this.props.location.state.detail;

      /*obj = 
      {
          result: true,
          token: await loginResponse.json(),
          username: username2
      };*/
        var loggedInUser = [];
        loggedInUser = JSON.parse(localStorage.getItem("currentToken"));
        let username = loggedInUser.username;


        //var userId = await getUserID(7);

        //alert(userId.result[0].userId);

        //loggedInUser = loggedInUser.filter(text => text = "username");
        
        //var userId = userId.result[0].userId;

        let ALBUMS = await getAlbumsByBandId(bandId);
        ALBUMS = await ALBUMS.json();
        alert(ALBUMS);

        this.setState({ albums: ALBUMS.album });
        
        var BandsAndPictures = [];
        BandsAndPictures = ALBUMS.albums;


        //Get url for getting picture for bands
        for (var i=0;i<ALBUMS.albums.length;i++)
        {
            var url = 'http://localhost:9000/upload/imagepath.png/'+ALBUMS.albums[i].albumName+'/'+ ALBUMS.albums[i].albumPicture;
            //Save url to array:
            BandsAndPictures[i].albumPicture = url;
        };

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i=0;i<ALBUMS.albums.length;i++)
        {
            BandsAndPictures[i].albumName = decodeURIComponent(BandsAndPictures[i].albumName);
        };

        this.setState({ albums: BandsAndPictures });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { albums, searchField } = this.state;

        {/* filter bands with search field value  */ }
        const filteredAlbums = albums.filter(album =>
            album.albumName.toLowerCase().includes(searchField.toLowerCase())
        );


        return (
            <div className="search-page">
                <div className="search-preview">
                   
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        BANDS
                    </h2>
                    <div className='items'>
                        {filteredAlbums
                            .filter((album, idx) => idx < 5)
                            .map(album => (
                                <AlbumsItem key={album.albumId} album={album} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Albums;




/*import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import fetchData from '../../services/band/get-band-by-userid-service'
import './bands.styles.scss';

var BANDS = [];
var userId= 7;

async function getBandsByUserId() {
  BANDS = [];
  BANDS = await fetchData(userId);
  let BANDS2 = await BANDS.json();
  alert(BANDS2.bands[0]);
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

getBandsByUserId();

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  //const bands2 = bands
  //  .filter(band => band.bandId == bandId)
  //console.log(JSON.stringify(bands2[0].bandName));
  //const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div></div>
  );
}
*/