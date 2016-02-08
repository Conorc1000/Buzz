import React from 'react';
import Firebase from 'firebase';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");
var firebaseRefPush = firebaseRef.push();

var checkCookie = () => {
  if(document.cookie.match('havaid')) {
    navigateToNextPage();
  } else {
    console.log('no havaid');
    return;
  }
}

var checkInput = () => {
  console.log('checking input');
  var userPhoneNumber = document.getElementById('phoneNumber').value.replace("+44", "0").replace(/\s/g, "");
  console.log(userPhoneNumber);
  (userPhoneNumber.match(/^\d{11}$/)) ? checkUser(userPhoneNumber) : alert('Please enter a valid phone number');
}

var checkUser = (userPhoneNumber) => {
  console.log('inside check user');
  var userPhoneNumberRegex = new RegExp('\\b' + userPhoneNumber.toString() + '\\b');
  firebaseRef.on('value', function(snapshot){
    var databaseSnapshot = JSON.stringify(snapshot.val());
    databaseSnapshot.match(userPhoneNumberRegex) ? setCookie() : submitUser();
  });
}

var submitUser = () => {
  console.log('user details submitted');
  firebaseRefPush.set({
    email: document.getElementById('email').value,
    phoneNumber: document.getElementById('phoneNumber').value
  })
  setCookie();
}

var setCookie = () => {
  console.log('setting cookie')
  firebaseRef.on('value', function(snapshot){
    var allUsersArr = Object.keys(snapshot.val())
    var userNo = allUsersArr.length - 1;
    var user = allUsersArr[userNo].toString();
    document.cookie = "havaid=" + user + "; path=/";
  });
  navigateToNextPage();
}

var navigateToNextPage = () => {
  window.location = '/public/#live-offers';
}

var CustomerLogin = React.createClass({

  componentWillMount: function() {
    checkCookie();
  },
  componentDidMount: function() {
    document.getElementById('button').addEventListener('click', function(){
      checkInput();
    })
  },
  render: function() {
    return (
      <div>
           <h2>To get details please enter your:</h2>
              <div>
              <label for="txtRegEmail">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" />
              </div>
              <div>
              <label>Mobile Number</label>
              <input class="form-control" id="phoneNumber" placeholder="07xxxxxxxxx" />
              </div>
          <button id="button">Register</button>
      </div>
    )
  }
});

export default CustomerLogin;
