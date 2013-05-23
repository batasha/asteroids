var game

$(document).ready(function(){

  var context = $("canvas").get(0).getContext("2d");

  game = new Asteroids.Game(500, 500, 10, context);
  game.start();

});
