$(function(){

  var app_id='1631387813743280';
  var scopes='public_profile,email';

  var btn_login='<a  href="#" id="login" class="btn btn-primary" >Iniciar session</a>';

  var div_session="<div id='facebook-session'>"+
                  " <strong> </strong>"+
                  " <img>"+
                  " <a href='#' id='logout' class='btn btn-danger'>Cerrar session</a>"+
                  " </div>";

                  window.fbAsyncInit = function() {
                           FB.init({
                             appId      : app_id,
                             cookie     : true,  // enable cookies to allow the server to access
                                                 // the session
                             xfbml      : true,  // parse social plugins on this page
                             version    : 'v2.2' // use version 2.2
                           });

                           // Now that we've initialized the JavaScript SDK, we call
                           // FB.getLoginStatus().  This function gets the state of the
                           // person visiting this page and can return one of three states to
                           // the callback you provide.  They can be:
                           //
                           // 1. Logged into your app ('connected')
                           // 2. Logged into Facebook, but not your app ('not_authorized')
                           // 3. Not logged into Facebook and can't tell if they are logged into
                           //    your app or not.
                           //
                           // These three cases are handled in the callback function.

                           FB.getLoginStatus(function(response) {
                             statusChangeCallback(response,function(){

                             });
                           });

                           };


               var statusChangeCallback=function(response,callback) {
                               console.log('statusChangeCallback');
                               console.log(response);
                               // The response object is returned with a status field that lets the
                               // app know the current login status of the person.
                               // Full docs on the response object can be found in the documentation
                               // for FB.getLoginStatus().
                               if (response.status === 'connected') {
                                 // Logged into your app and Facebook.
                              getFacebookData();
                               } else if (response.status === 'not_authorized') {
                                 // The person is logged into Facebook, but not your app.
                                // document.getElementById('status').innerHTML = 'Please log ' +
                                //   'into this app.';
                                callback(false);
                               } else {
                                callback(false);
                               }
                             }



  var  checkLoginState=function(callback){
    FB.getLoginStatus(function(response){
      statusChangeCallback(response,function(data){
        callback(data);
      });

    });
  };

var getFacebookData=function(){
  FB.api('/me',  function(response) {
    console.log(response);
    $('#login').after(div_session);
    $('#login').remove();
    $('#facebook-session strong').text("Bienvenido: "+response.name);
    $('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');

    });

}


var facebookLogin=function(){
  checkLoginState(function(response){
    if(!response){
      FB.login(function(response){
          if(response.status==='connected'){
            getFacebookData();
          }
      },{scope:scopes})
    }
  })
}

var facebookLogout=function(){
  FB.getLoginStatus(function(response){
    if(response.status==='connected'){
      FB.logout(function(response) {
  // user is now logged out
        $('#facebook-session').before(btn_login);
        $('#facebook-session').remove();
      });


    }
  });

}

$(document).on('click','#login',function(e){


facebookLogin();

});

$(document).on('click','#logout',function(e){


facebookLogout();

});






});
