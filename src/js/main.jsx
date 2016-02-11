'use strict';

import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import CustomerLogin from './components/CustomerLogin.jsx';
import BarLogin from './components/BarLogin.jsx';
import CreateOffers from './components/CreateOffers.jsx';
import OffersPage from './components/OffersPage.jsx'
import CustomerContact from './components/CustomerContact.jsx'
import BarContact from './components/BarContact.jsx'


let Home = require('./components/views/home.jsx');

require('../styles/main.js');

let rootElement = document.getElementById('react-content');

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router>
        <Route path="/">
          <Route path="bar" component={BarLogin} />
          <Route path="create-offers" component={CreateOffers} />
          <Route path="customer-contact" component={CustomerContact} />
          <Route path="bar-contact" component={BarContact} />
          <Route path="customer" component={CustomerLogin} />
          <Route path="live-offers" component={OffersPage} />
        </Route>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.react-content'));
