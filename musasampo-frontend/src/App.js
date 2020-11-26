import { Switch, Route, Redirect } from 'react-router-dom';

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


import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/users/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        //this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <Header />
                    <Switch>
                      <Route exact path='/' component={HomePage} />
                      <Route exact path='/chat' component={ChatPage} />
                      <Route exact path='/login' component={LoginPage} />
                      <Route exact path='/mp3-upload' component={Mp3} />
                      <Route exact path='/shop' component={ShopPage} />
                      <Route exact path='/search' component={SearchPage} />
                      <Route exact path='/bands/:bandId' component={BandPage} /> 
                      <Route exact path='/shop/albums/genre/:genre' component={GenrePage} />          
                      <Route exact path='/shop/albums/:albumId' component={AlbumComponent} />
                      <Route exact path='/guitartuner' component={GuitarOverview} />    
                      <Route exact path='/guitartuner/:guitarId' component={GuitarTuner} />      
                    </Switch>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;