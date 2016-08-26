
var parseAppID = 'myAppId';
var parseJSKey = 'Key';
/*
 Parse has a specialized user class called Parse.User that automatically handles
 much of the functionality required for user account management.
 
 The Parse.FacebookUtils class has a logIn method which takes the Facebook user
 ID along with information about the Facebook session.
 */
function parseLogin(authResponse) {

    console.log(IO);
      console.log(App.mySocketId);

    if (App.mySocketId !== '') {
        IO.socket.emit('authentication', authResponse);
    }
//    $.ajax({
//  type: "POST",
//  url: server_url+"/login",
//  data: authResponse,
// 
//  dataType: "json"
//});

//  return Parse.FacebookUtils.logIn({
//    id: authResponse.userID,
//    access_token: authResponse.accessToken,
//    expiration_date: moment().add(authResponse.expiresIn, 's').format()
//  }).then(function(user) {
//    if( user.existed() ) {
//      return userWithFBIDCheck(authResponse.userID);
//    } else {
//      return setDefaultUserValues();
//    }
//  }, function(error) {
//    return Parse.Promise.error(error);
//  });
}

/*
 Check link between FB ID and Parse user.
 */
function userWithFBIDCheck(userID) {
    console.log('Existing Parse User, checking for FBID');
    if (Parse.User.current().get('fbid')) {
        // FBID was added before, all is well
        return Parse.Promise.as(Parse.User.current());
    } else {
        return Parse.User.current().save('fbid', userID);
    }
}

/*
 Create new Parse user with default values.
 */
function setDefaultUserValues() {
    console.log('New Parse User, setting defaults', defaults);
    Parse.User.current().set('coins', defaults.coins);
    Parse.User.current().set('bombs', defaults.bombs);
    Parse.User.current().set('fbid', friendCache.me.id);
    return Parse.User.current().save();
}

/*
 Save player details into Parse.
 */
function saveParseUser(coins, bombs) {
    Parse.User.current().increment('coins', coins);
    Parse.User.current().increment('bombs', -1 * bombs);
    return Parse.User.current().save();
}

/*
 Fetch and refresh player details from Parse.
 */
function refreshParseUser() {
    return Parse.User.current().fetch();
}
