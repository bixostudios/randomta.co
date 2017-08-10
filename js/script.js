var clickedOnce = false;
var cords;
var ingredients = $('.base-layer-text p, .condiment-text p, .mixin-text p');

/*
Special thanks to tacofancy-api

https://github.com/evz/tacofancy-api
*/

function makeTaco() {
  var tacosAPI = "https://taco-randomizer.herokuapp.com/random/";
  $('#loading-icon').fadeIn(250);
  ingredients.hide(500);
  setTimeout(function() {
    ingredients.html('');
    $.ajax({
      url: tacosAPI,
      dataType: "json"
    }).done(function(data) {
      $('.base-layer-text p').html(data.base_layer.name);
      $('.condiment-text p').html(data.condiment.name);
      $('.mixin-text p').html(data.mixin.name);
      ingredients.show(400);
      $('#loading-icon').delay(600).fadeOut(500);
    });
  }, 500);
}

function getCords() {
  //will connect to google maps in the future
  $.get("http://ipinfo.io", function(location) { 
    console.log(location.loc);
    cords = location.loc;
  },"jsonp");
}

$('#btn-3d').click(function() {
  makeTaco();
  if (clickedOnce === false) {
    //first click when page is opened
    setTimeout(function() {
      $('#btn-3d p').html('NEW <i class="fa fa-random" aria-hidden="false"></i>');
    },2500);
    
    $('#taco,#info,#intro').removeClass('closed');
    clickedOnce = true;
  } 
})