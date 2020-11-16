/*import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import GuitarOverview from './pages/guitar-tuner-overview/guitar-tuner-overview.component';
import GuitarTuner from './components/guitar-tuner/guitar-tuner.component';
import AlbumPage from './pages/albums/albums.component';
import AlbumComponent from './components/album/album.component';

import Login from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';


class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route exact path='/login' component={Login} />  
          <Route exact path='/guitartuner' component={GuitarOverview} />    
          <Route exact path='/guitartuner/:guitarId' component={GuitarTuner} />      
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/shop/albums' component={ShopPage} />
          <Route exact path='/shop/albums/:genre' component={AlbumPage} />          
          <Route exact path='/shop/albums/:genre/:albumId' component={AlbumComponent} />
         
        </Switch>
      </div>
    );
  }
}



export default App;*/
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import AlbumPage from './pages/albums/albums.component';
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
                      <Route exact path='/login' component={LoginPage} />
                      <Route exact path='/shop' component={ShopPage} />
                      <Route exact path='/shop/albums' component={ShopPage} />
                      <Route exact path='/shop/albums/:genre' component={AlbumPage} />          
                      <Route exact path='/shop/albums/:genre/:albumId' component={AlbumComponent} />
                    </Switch>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
