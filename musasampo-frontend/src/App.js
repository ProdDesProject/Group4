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
import AlbumComponent from './components/album/album.component';
import Header from './components/header/header.component';
import LoginPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ProfilePage from './pages/profile-page/profile-page.component';

<<<<<<< HEAD
import ProfilePage from './pages/profile/profile.component';
import ProfileEdit from './pages/profile-edit/profile-edit.component';
import ProfileChangePassword from './pages/profile-change-password/profile-change-password.component';
import NewBand from './pages/profile-new-band/profile-new-band.component';
import NewAlbum from './pages/profile-new-album/profile-new-album.component';
=======
import ProfileEditPage from './components/profile-edit/profile-edit.component';
import ProfileChangePasswordPage from './components/profile-change-password/profile-change-password.component';
import NewBandPage from './components/profile-new-band/profile-new-band.component';
import NewAlbumPage from './components/profile-new-album/profile-new-album.component';
>>>>>>> main


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
<<<<<<< HEAD
                    <Switch>
                      <Route exact path='/' component={HomePage} />
                      <Route exact path='/chat' component={ChatPage} />
                      <Route exact path='/login' component={LoginPage} />
                      <Route exact path='/mp3-upload' component={Mp3} />
                      <Route exact path='/shop' component={ShopPage} />
                      <Route exact path='/search' component={SearchPage} />

                      <Route exact path='/profile' component={ProfilePage} />
                      <Route exact path='/profile/edit' component={ProfileEdit} />
                      <Route exact path='/profile/password' component={ProfileChangePassword} />
                      <Route exact path='/profile/newband' component={NewBand} />
                      <Route exact path='/profile/newalbum' component={NewAlbum} />

                      <Route exact path='/bands/:bandId' component={BandPage} /> 
                      <Route exact path='/shop/albums/genre/:genre' component={GenrePage} />          
                      <Route exact path='/shop/albums/:albumId' component={AlbumComponent} />
                      <Route exact path='/guitartuner' component={GuitarOverview} />    
                      <Route exact path='/guitartuner/:guitarId' component={GuitarTuner} />      
                    </Switch>
=======
>>>>>>> main
                </header>
                <body>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <PrivateRoute exact path='/chat' component={ChatPage} />
                        <Route exact path='/login' component={LoginPage} />
                        <PrivateRoute exact path='/mp3-upload' component={Mp3} />
                        <PrivateRoute exact path='/shop' component={ShopPage} />
                        <Route exact path='/search' component={SearchPage}/>
                        <PrivateRoute exact path='/profile' component={ProfilePage} />
                        <PrivateRoute exact path='/profile/edit' component={ProfileEditPage} />
                        <PrivateRoute exact path='/profile/password' component={ProfileChangePasswordPage} />
                        <PrivateRoute exact path='/profile/newband' component={NewBandPage} />
                        <PrivateRoute exact path='/profile/newalbum' component={NewAlbumPage} />
                        <PrivateRoute exact path='/bands/:bandId' component={BandPage} /> 
                        <PrivateRoute exact path='/shop/albums/genre/:genre' component={GenrePage} />          
                        <PrivateRoute exact path='/shop/albums/:albumId' component={AlbumComponent} />
                        <PrivateRoute exact path='/guitartuner' component={GuitarOverview} />    
                        <PrivateRoute exact path='/guitartuner/:guitarId' component={GuitarTuner} />  
                    </Switch>  
                </body>
            </div>
        );
    }
}

export default App;