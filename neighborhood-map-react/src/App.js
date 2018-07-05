import React, { Component } from 'react';
import Map from "./Map";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map isMarkerShown />
      </div>
    );
  }
}

export default App;
