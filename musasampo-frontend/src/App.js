import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import GuitarTuner from './pages/guitar-tuner/guitar-tuner.component';
import AlbumPage from './pages/albums/albums.component';
import AlbumComponent from './components/album/album.component';

import Header from './components/header/header.component';


class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />    
          <Route exact path='/guitartuner' component={GuitarTuner} />       
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/shop/albums' component={ShopPage} />
          <Route exact path='/shop/albums/:genre' component={AlbumPage} />          
          <Route exact path='/shop/albums/:genre/:albumId' component={AlbumComponent} />
         
        </Switch>
      </div>
    );
  }
}



export default App;
