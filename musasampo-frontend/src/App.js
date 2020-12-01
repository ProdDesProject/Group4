import { Switch, Route, Redirect, Link } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';

import Mp3 from './pages/mp3-upload/mp3.component';

import ChatPage from './pages/chat/chat.component';
import GuitarOverview from './pages/guitartuner-page/guitartuner-page.component';
import GuitarTuner from './components/guitar-tuner/guitar-tuner.component';
import SearchPage from './pages/search/search.component';
import GenrePage from './pages/genre-page/genre-page.component';
import BandPage from './components/band/band.component';
import AlbumComponent from './components/album/album.component';
import Header from './components/header/header.component';
import LoginPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Profile from './pages/profile/profile.component';

import { stringify } from 'querystring';
import ProfileEdit from './pages/profile-edit/profile-edit.component';
import ProfileChangePassword from './pages/profile-change-password/profile-change-password.component';
import NewBand from './pages/profile-new-band/profile-new-band.component';
import NewAlbum from './pages/profile-new-album/profile-new-album.component';


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
                    <Switch>
                      <Route exact path='/' component={HomePage} />
                      <PrivateRoute exact path='/chat' component={ChatPage} />
                      <Route exact path='/login' component={LoginPage} />
                      <PrivateRoute exact path='/mp3-upload' component={Mp3} />
                      <PrivateRoute exact path='/shop' component={ShopPage} />
                      <Route exact path='/search' component={SearchPage}/>
                      <PrivateRoute exact path='/profile' component={Profile} />
                      <PrivateRoute exact path='/profile/edit' component={ProfileEdit} />
                      <PrivateRoute exact path='/profile/password' component={ProfileChangePassword} />
                      <PrivateRoute exact path='/profile/newband' component={NewBand} />
                      <PrivateRoute exact path='/profile/newalbum' component={NewAlbum} />
                      <PrivateRoute exact path='/bands/:bandId' component={BandPage} /> 
                      <PrivateRoute exact path='/shop/albums/genre/:genre' component={GenrePage} />          
                      <PrivateRoute exact path='/shop/albums/:albumId' component={AlbumComponent} />
                      <PrivateRoute exact path='/guitartuner' component={GuitarOverview} />    
                      <PrivateRoute exact path='/guitartuner/:guitarId' component={GuitarTuner} />  
                    </Switch>
                </header> 

            </div>
        );
    }
}

//<p className="App-intro">{this.state.apiResponse}</p>
export default App;