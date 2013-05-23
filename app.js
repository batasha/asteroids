var game
var canvas = $("<canvas width=\"500\" height=\"500\"></canvas>")
  $("body").append(canvas.get(0));


$(document).ready(function(){

  $("body").append(canvas);

  var context = $("canvas").get(0).getContext("2d");

  game = new Asteroids.Game(500, 500, 100, context);
  game.start();

});
