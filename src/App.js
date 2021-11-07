import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Secured from './Secured';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">                        
          <Route path="/" component={Secured} />
        </div>
      </BrowserRouter>
      
    )
  }
}
export default App;