$(function() {
  
    var $rad = $('#rad'),
        $obj = $('.obj'),
        deg = 0,
        rad = 160.5; //   = 321/2
  
  $obj.each(function(){
    var data = $(this).data(),
        pos = {X:data.x, Y:data.y},
        getAtan = Math.atan2(pos.X-rad, pos.Y-rad),
        getDeg = ~~(-getAtan/(Math.PI/180) + 180);
    $(this).css({left:pos.X, top:pos.Y}).attr('data-atDeg', getDeg);
  });

    (function rotate() {      
      $rad.css({transform: 'rotate('+ deg +'deg)'});
      $('[data-atDeg='+deg+']').stop().fadeTo(0,1).fadeTo(1700,0.2);

        // LOOP
        setTimeout(function() {
            deg = ++deg%360;
            rotate();
        }, 25);
    })();
});
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId      : '530648690430494',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use version 2.2
    });
}