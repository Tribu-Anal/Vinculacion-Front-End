$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    $(".login-page").css("width", "500px");
});

$('.message.login a').click(function(){
    $(".login-page").css("width", "360px");
});