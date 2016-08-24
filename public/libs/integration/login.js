
var friendCache = {
  me: {},
  user: {},
  permissions: [],
  friends: [],
  invitable_friends: [],
  apprequests: [],
  scores: [],
  games: [],
  reRequests: {}
};


function getFriendCacheData(endpoint, callback, options) {
  if(endpoint) {
    var url = '/';
    if(endpoint == 'me') {
      url += endpoint;
    } else if(endpoint == 'scores') {
      url += appId + '/' + endpoint;
    } else {
      url += 'me/' + endpoint;
    }
    FB.api(url, options, function(response) {
      if( !response.error ) {
        console.log('getFriendCacheData',endpoint, response);
        friendCache[endpoint] = response.data ? response.data : response;
        if(callback) callback();
      } else {
        console.error('getFriendCacheData',endpoint, response)
      }
    });
  } else {
    getMe(function() {
      getPermissions(function() {
        getFriends(function() {
          getInvitableFriends(function() {
            getScores(callback);
          });
        });
      });
    });
  }
}

function getMe(callback) {
  getFriendCacheData('me', callback,
    {fields: 'id,name,first_name,picture.width(120).height(120)'});
}

function getFriends(callback) {
  getFriendCacheData('friends', callback,
    {fields: 'id,name,first_name,picture.width(120).height(120)',limit: 8});
}
function login(callback) {
  FB.login(callback, {scope: 'user_friends,publish_actions', return_scopes: true});
}
function loginCallback(response) {
  console.log('loginCallback',response);
  if(response.status != 'connected') {
    top.location.href = appCenterURL;
  }
}
function reRequest(scope, callback) {
  FB.login(callback, { scope: scope, auth_type:'rerequest'});
}

function getPermissions(callback) {
    getFriendCacheData('permissions', callback);
}

function hasPermission(permission) {
  for( var i in friendCache.permissions ) {
    if(
      friendCache.permissions[i].permission == permission
      && friendCache.permissions[i].status == 'granted' )
      return true;
  }
  return false;
}

/*
Invitable Friends
---------------------------
Get a list of the player's friends who aren't yet using the app via:
https://developers.facebook.com/docs/graph-api/reference/user/invitable_friends

Nodes returned are of the type:
https://developers.facebook.com/docs/graph-api/reference/user-invitable-friend/

These nodes have the following fields: profile picture, name and ID, which can
be used in a custom Request dialog.
---------------------------
Note! This is different from the following Graph API:
https://developers.facebook.com/docs/graph-api/reference/user/friends

Which returns the following nodes:
https://developers.facebook.com/docs/graph-api/reference/user/
*/
function getInvitableFriends(callback) {
  getFriendCacheData('invitable_friends', callback,
    {fields: 'name,first_name,picture',limit: 8});
}

/*
With player scores being written to the Graph API, we now have a data set on
which to build a social leaderboard. By calling the /app/scores endpoint for
your app, with a user access token, you get back a list of the current player's
friends' scores, ordered by score. We can turn this data into a list and use it
for launching challenges to high-scoring friends.
*/
function getScores(callback) {
  getFriendCacheData('scores', callback,
    {fields: 'score,user.fields(first_name,name,picture.width(120).height(120))'});
}

/*
Handle the login flow for non-authenticated players.
Update the UI for authenticated players.
*/
function onStatusChange(response) {
  console.log('onStatusChange', response);
  if( response.status != 'connected' ) {
      showLogin();
  } else {
      showMenu();
    parseLogin(response.authResponse).then(function(user){
      console.log('Parse login success', user);
//      getMe(function(){
//        getPermissions(function(){
//          if(hasPermission('user_friends')) {
//            getFriends(function(){
//              renderWelcome();
//              onLeaderboard();
//              showHome();
//              urlHandler(window.location.search);
//            });
//          } else {
//            renderWelcome();
//            showHome();
//            urlHandler(window.location.search);
//          }
//        });
//      });
    },function(error){
      console.log('Parse login failed', error);
    });
  }
}

/*
Handle authentication response and retrieve FB permissions.
*/
function onAuthResponseChange(response) {
  console.log('onAuthResponseChange', response);
  if( response.status == 'connected' ) {
    getPermissions();
  }
}

/*
Retrieve information on a specific player from the Graph API.
*/
function getOpponentInfo(id, callback) {
  FB.api(String(id), {fields: 'id,first_name,name,picture.width(120).height(120)' }, function(response){
    if( response.error ) {
      console.error('getOpponentInfo', response.error);
      return;
    }
    if(callback) callback(response);
  });
}
