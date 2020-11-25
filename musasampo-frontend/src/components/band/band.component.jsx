import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './band.styles.scss';
import BANDS from '../../data/bands';
import { withRouter} from 'react-router-dom';
import { stringify } from 'querystring';
import ReactPlayer from "react-player";

import App from '../../App';
import Data1 from '../data/data';

/*
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

function getBand() 
{
  //let { bandId,nswf,bandName,bandLogo,country,location,status,formedIn,yearsactive,genres,lyricalThemes,currentLabel } = DATA.country;
  //alert(DATA.country);
  
  //const obj = new App();
  //var result = obj.getStateVariables();
  //alert(result);

  var result1 = data.getBand();
  //stringify(result1)
  alert(JSON.stringify(result1));

  return result1;
}


export default function SimpleTabs(props) {

  const bandId = props.match.params.bandId;
  //console.log(bandId);
  const bands = BANDS;
  const bands2 = bands
    .filter(band => band.bandId == bandId)
    

    console.log(JSON.stringify(bands2[0].bandName));


  //const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //let {country} = this.state;

  return (
      <div>

          <div className='title'>
            {bands2[0].bandName}
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
              <dt>{getBand()}</dt>
          </div>

          <div className='bandLogo'>
            <img className='img' src={bands2[0].bandLogo} />
          </div>
          <div className='bandImage'>
            <img className='img' src={bands2[0].bandImage} />
          </div>
      </div>

          <div className='tabpanel1'>
              <AppBar position="static">
              <Tabs className='tabs' value={value} onChange={handleChange}
              TabIndicatorProps={{style: { background: "#32e0c4", background: "#32e0c4", height: "4px"}}}>
                  <Tab className='tab-name' label="Discography" {...a11yProps(0)} />
                  <Tab className='tab-name' label="Members" {...a11yProps(1)} />
                  <Tab className='tab-name' label="Reviews" {...a11yProps(2)} />
              </Tabs>
              </AppBar>
              <TabPanel className='panel-content' value={value} index={0}>
                {bands2[0].albums}
              </TabPanel>
              <TabPanel className='panel-content' value={value} index={1}>
                {bands2[0].members}
              </TabPanel>
              <TabPanel className='panel-content' value={value} index={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi pellentesque, malesuada mauris vel, posuere nibh. 
              Nunc nec sollicitudin magna. Aenean non vulputate ex. Nullam nec mauris accumsan, gravida erat quis, commodo mi. 
              Ut nec erat sit amet dui laoreet aliquet. Duis ut ultrices tellus. Vestibulum ullamcorper venenatis euismod. Vestibulum eu imperdiet purus, vitae venenatis erat. 
              Pellentesque auctor libero molestie urna ultricies imperdiet. Aliquam non est odio. Fusce ac neque eu felis porttitor sollicitudin. Curabitur auctor convallis risus, ut iaculis felis vehicula vitae.<br></br><br></br>
              Nulla sit amet eros sapien. Donec ac justo mi. Sed molestie mauris et commodo iaculis. Mauris pretium posuere tellus sit amet auctor. 
              Praesent a bibendum dui. Morbi eu euismod ante, non tincidunt lacus. Duis consequat elit ut ligula pellentesque, ac faucibus odio porta. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales egestas semper. Donec id auctor magna.<br></br><br></br>
              Curabitur feugiat lorem viverra lacus aliquam facilisis. Quisque ornare malesuada justo, id aliquet ante malesuada eu. 
              Aliquam quis sem augue. Nullam porttitor metus ex, eu convallis massa varius vel. Morbi in dapibus est. Nullam eget dui in lorem sollicitudin blandit. 
              Sed facilisis cursus quam sit amet condimentum. Vivamus augue turpis, lobortis vitae molestie at, iaculis euismod neque. Vivamus iaculis condimentum consequat.<br></br><br></br>
              Fusce egestas quam in nunc elementum, a mattis mauris malesuada. Sed laoreet non risus non pretium. Donec aliquam mollis erat, mollis sodales nunc volutpat nec. 
              Ut porta posuere neque, nec maximus mi sodales in. Nam laoreet, erat vitae maximus molestie, lectus sapien dignissim augue, ac sodales ex ipsum nec risus. Sed id facilisis orci. 
              Donec viverra sodales tortor a pretium.<br></br><br></br>
              Proin elementum varius quam eget aliquet. Phasellus id elit id felis posuere laoreet. Proin in sapien nec justo condimentum sollicitudin ut nec tellus. 
              Donec id dolor porta, sollicitudin tortor vitae, cursus nisl. Curabitur maximus nibh eget finibus suscipit. Praesent quis tempor turpis, sit amet cursus diam. Praesent faucibus purus non ante elementum venenatis. 
              Donec lorem metus, ornare ut nibh et, cursus faucibus nulla. Morbi mauris magna, eleifend eget eleifend in, elementum at turpis. Donec nec dapibus sem, in scelerisque urna.
              </TabPanel>
          </div>
    </div>
  );
}
*/



class Band extends React.Component {
  constructor(props) {
    super(props);

    this.state = { returnData: 'loading' };

    this.state = { message: 'loading' };
    
    this.state = { bandId: 'loading' };
    this.state = { country: 'loading' };
    this.state = { location: 'loading' };

    this.state = { nswf: 'loading' };
    this.state = { bandName: 'loading' };
    this.state = { bandLogo: 'loading' };

    this.state = { status: 'loading' };
    this.state = { formedIn: 'loading' };
    this.state = { yearsactive: 'loading' };
    this.state = { genres: 'loading' };
    this.state = { lyricalThemes: 'loading' };
    this.state = { currentLabel: 'loading' };

  }

  async componentDidMount() 
  {
    //get-songs from backend
    const returnSongs = await Data1.getSongs();
    const returnBands = await Data1.getBand();
    //alert(returnData[0].songName);
    
    alert(returnSongs[0].MP3);
    alert(returnBands);
    /*
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
      });*/

  }

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
}

export default withRouter(Band);

