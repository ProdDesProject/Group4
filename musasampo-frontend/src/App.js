import { Switch, Route, Redirect, Link } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';

import Mp3 from './pages/mp3-upload/mp3.component';

import GuitarOverview from './pages/guitartuner-page/guitartuner-page.component';
import GuitarTuner from './components/guitar-tuner/guitar-tuner.component';
import SearchPage from './pages/search/search.component';
import GenrePage from './pages/genre-page/genre-page.component';
import BandPage from './components/band/band.component';
import AlbumComponent from './components/album/album.component';

import Header from './components/header/header.component';
import LoginPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Profile from './pages/profile/profile.component';

import data from './components/data/data.jsx';


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

    getStateVariables() {
        return this.state.data;
    }

    async componentDidMount() {
        this.callAPI();

        //ACCESS TO DATA.jsx WHERE ARE METHODS FOR GETTING DATA
        var result1 = await data.getBand();
        var result2= await data.getSongs();

        //var country2 = result1[0].country;
        //this.setState({ returnData : returnData[0].songName });

        //setting setSate global variables from band¨
        this.setState({ 
           data: result1
            });

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
        });

        //works
        //alert(result2[0].songName);
        //alert(this.state.country);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <Header />
                    <Switch>
                      <Route exact path='/' component={HomePage} />
                      <Route exact path='/login' component={LoginPage} />
                      <Route exact path='/mp3-upload' component={Mp3} />
                      <Route exact path='/shop' component={ShopPage} />
                      <Route exact path='/search' component={SearchPage}/>

                      <Route exact path='/profile' component={Profile} />

                      <Route exact path='/bands/:bandId' component={BandPage} /> 
                      <Route exact path='/shop/albums/genre/:genre' component={GenrePage} />          
                      <Route exact path='/shop/albums/:albumId' component={AlbumComponent} />
                      <Route exact path='/guitartuner' component={GuitarOverview} />    
                      <Route exact path='/guitartuner/:guitarId' component={GuitarTuner} />  
                      

                    </Switch>
                </header>
                
            </div>
        );
    }
}

//<p className="App-intro">{this.state.apiResponse}</p>
export default App;