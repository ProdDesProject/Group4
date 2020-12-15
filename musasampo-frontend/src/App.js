import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';

import Mp3 from './components/mp3-upload/mp3.component';

import ChatPage from './pages/chat/chat.component';
import GuitarOverview from './pages/guitartuner-page/guitartuner-page.component';
import GuitarTuner from './components/guitar-tuner/guitar-tuner.component';
import SearchPage from './pages/search/search.component';
import GenrePage from './pages/genre-page/genre-page.component';
import BandPage from './components/band/band.component';
import BandsPage from './components/bands/bands.component';

import AlbumComponent from './components/album/album.component';
import Header from './components/header/header.component';
import LoginPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ProfilePage from './pages/profile-page/profile-page.component';

import ProfileAlbums from './components/profile-albums/profile-albums.component';

import ProfileEditPage from './components/profile-edit/profile-edit.component';
import NewBandPage from './components/profile-new-band/profile-new-band.component';
import NewAlbumPage from './components/profile-new-album/profile-new-album.component';
import AlbumsPage from './components/albums/albums.component';
import SongsPage from './components/songs/songs.component';


import React, { Component } from "react";
import "./App.css";

import {SignInServices} from './services/sign-in-service';
import {PrivateRoute} from './components/private-route/PrivateRoute'

class App extends Component {
    
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            currentToken: null
        }
    }

    componentDidMount()
    {
        //get the token from the auth services
        SignInServices.currentToken.subscribe(x => this.setState({currentToken: x}));
    }
    
    render() {
     
        return (
            <div className="App">
                <header className="App-header">
                <Header />
                </header>
                <body>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <PrivateRoute exact path='/chat' component={ChatPage} />
                        <Route exact path='/login' component={LoginPage} />
                        <PrivateRoute exact path='/mp3-upload' component={Mp3} />
                        <PrivateRoute exact path='/shop' component={ShopPage} />
                        <Route exact path='/search' component={SearchPage}/>
                        <Route exact path='/profile-albums' component={ProfileAlbums}/>
                        <PrivateRoute exact path='/profile' component={ProfilePage} />
                        <PrivateRoute exact path='/profile/edit' component={ProfileEditPage} />
                        <PrivateRoute exact path='/profile/newband' component={NewBandPage} />
                        <PrivateRoute exact path='/profile/newalbum' component={NewAlbumPage} />
                        <PrivateRoute exact path='/bands/' component={BandsPage} /> 
                        <PrivateRoute exact path='/albums/' component={AlbumsPage} />
                        <PrivateRoute exact path='/songs/' component={SongsPage} />
                        <PrivateRoute exact path='/bands/:bandId' component={BandPage} /> 
                        <PrivateRoute exact path='/albums/genre/:genre' component={GenrePage} />          
                        <PrivateRoute exact path='/albums/:albumId' component={AlbumComponent} />
                        <PrivateRoute exact path='/guitartuner' component={GuitarOverview} />    
                        <PrivateRoute exact path='/guitartuner/:guitarType' component={GuitarTuner} />  
                    </Switch>  
                </body>
            </div>
        );
    }
}

export default App;