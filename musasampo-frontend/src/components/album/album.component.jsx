import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './album.styles.scss';
import ALBUMS from '../../data/albums';
import { Divider } from '@material-ui/core';

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


/*export class ShopPage extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    albums: SHOP_DATA
  };
}

render() {
  const { albums } = this.state;
  return (
    <div className='shop-page'>
      {albums.map(({ id, ...otherAlbumProps }) => (
        <AlbumPreview key={id} {...otherAlbumProps} />
      ))}
    </div>
  );
}
}*/

/*const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
}));*/

export default function SimpleTabs(props) {

  const albumId = props.match.params.albumId;
  //console.log(albumId);
  const albums = ALBUMS;
  const albums2 = albums
    .filter(album => album.albumId == albumId)
    

    console.log(JSON.stringify(albums2[0].albumName));


  //const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>

      <div className='titles'>
        <div className='title'>
          {albums2[0].albumName}
                    </div>
        <div className='subtitle'>
          {albums2[0].bandName}
                    </div>
      </div>

      <div className='description'>
        <div className='descriptor'>
          <dt>Genre:</dt>
          <dt>Type:</dt>
          <dt>Release date:</dt>
          <dt>Label:</dt>
          <dt>Format:</dt>
        </div>

        <div className='infotext'>
          <dt>{albums2[0].albumGenre}</dt>
          <dt>{albums2[0].albumType}</dt>
          <dt>{albums2[0].releaseDate}</dt>
          <dt>{albums2[0].albumLabel}</dt>
          <dt>{albums2[0].albumFormat}</dt>
        </div>

        <div className='albumImage'>
          <img className='img' src={albums2[0].albumCover} />
        </div>
      </div>

      <div className='tabpanel1'>
        <AppBar position="static">
          <Tabs className='tabs' value={value} onChange={handleChange}
            TabIndicatorProps={{ style: { background: "#32e0c4", background: "#32e0c4", height: "4px" } }}>
            <Tab className='tab-name' label="Songs" {...a11yProps(0)} />
            <Tab className='tab-name' label="Lineup" {...a11yProps(1)} />
            <Tab className='tab-name' label="Description" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel className='panel-content' value={value} index={0}>
        {albums2[0].trackList}
                </TabPanel>
        <TabPanel className='panel-content' value={value} index={1}>
          {albums2[0].lineup}
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