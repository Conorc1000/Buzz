import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");

var checkCookie = () => {
  if(document.cookie.match('havaBarName')) {
    navigateToNextPage();
  } else {
    return;
  }
}

var navigateToNextPage = () => {
  window.location = '/public/#create-offers';
}

var BarLogin = React.createClass({

  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    var self = this;
    document.getElementById('button').addEventListener('click', function(){
      var barName = document.getElementById('barName').value;
      firebaseRef.authWithPassword({
        email    : document.getElementById('email').value,
        password : document.getElementById('password').value
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          alert('Login failed. Check your username or password.')
        } else {
          console.log('barname cookified')
          document.cookie = 'havaBarName=' + JSON.stringify(barName) + "; path='/'";
          console.log("Authenticated successfully with payload:", authData);
          navigateToNextPage();
        }
      });
    })
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   //ROUTE TO NEXT PAGE
  //   return true
  // },

  render: function() {
    return (
      <div>
         <h2> Bar Login</h2>
            <div>
              <label for="txtRegEmail">Email address</label>
              <input value="conorc1000@gmail.com" type="email" id="email" placeholder="Enter email" name="email" />
            </div>
            <div>
              <label>Bar Name</label>
              <input placeholder="Enter Bar Name" id="barName" />
            </div>
            <div>
              <label for="txtRegPassword">Password</label>
              <input type="password" id="password" placeholder="password" />
            </div>
          <button id="button">Login</button>

      </div>
    )
  }
});

export default BarLogin;
