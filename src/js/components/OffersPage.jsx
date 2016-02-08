import React from 'react';
import Firebase from 'firebase'

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");

var checkCookie = () => {
  if(document.cookie.match('havaid')) {
    return 'true';
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/public/#customer';
}

var displayOffers = () => {
  firebaseRef.limitToLast(100).on("child_added", function(snapshot) {
    snapshot.forEach(function(offerkey){
      var child = React.createElement('li', null, 'Text Content');
      console.log(offerkey);
    });
  });
}

var OffersPage = React.createClass({

  componentWillMount: function() {
    var havaIdCookie = checkCookie();
    if (havaIdCookie === 'true') {
      displayOffers();
    } else {
      console.log('no havaId, ~line34 OffersPage.jsx');
    }
  },

  render: function() {
    return (
      <div>
        <h2>HELLO!</h2>
        <ul>
        </ul>
      </div>
    )
  }
});

export default OffersPage;
