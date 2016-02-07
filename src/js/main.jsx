'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CustomerLogin from './components/CustomerLogin.js';
import BarLogin from './components/BarLogin.js';
import CreateOffers from './components/CreateOffers.js';
import OffersPage from './components/OffersPage.js'


import { Router, Route, Link } from 'react-router'


class App extends Component {
  render(){
    return(
      <div>
        <h1>Hava</h1>
        {this.props.children}
      </div>
    )
  }
}


ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="bar" component={BarLogin} />
      <Route path="create-offers" component={CreateOffers} />
      <Route path="customer" component={CustomerLogin} />
      <Route path="live-offers" component={OffersPage} />
    </Route>
  </Router>
),document.querySelector('.container'))
