var Asteroids = function(){

  MAXSIZE = 40;
  function Asteroid(cornerX, cornerY, radius, velocity, ctx){
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.radius = radius;
    this.velocity = velocity;
    this.ctx = ctx;
    //this.alive = true;
  };


  function randomAsteroid(boardWidth, boardHeight, ctx){
    return new Asteroid(
      boardWidth * Math.random(),
      boardHeight * Math.random(),
      MAXSIZE*Math.random(),
      { x: (Math.random()*(10) - 5), y: (Math.random()*(10)-5) },
      ctx
    )
  };

  Asteroid.prototype.draw = function(){
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();

    this.ctx.arc(
      (this.cornerX + this.radius),
      (this.cornerY + this.radius),
      this.radius,
      0,
      2 * Math.PI,
      false);

    this.ctx.fill();
  };

  Asteroid.prototype.update = function(){
    this.cornerX += this.velocity.x;
    this.cornerY += this.velocity.y;

  }

  Asteroid.prototype.inBoard = function(boardWidth, boardHeight){
    var max = this.radius * 2;

    if(this.cornerX < (-1 * max) || this.cornerX > (boardWidth)){
      return false;
    }

    if(this.cornerY < (-1 * max) || this.cornerY > (boardHeight)){
      return false;
    }

    return true;
  }


  function Ship(noseX, noseY, velocity, ctx, game){
    this.noseX = noseX;
    this.noseY = noseY;
    this.velocity = velocity;
    this.ctx = ctx;
    this.game = game;
  }

  Ship.startShip = function(boardWidth, boardHeight, ctx, game){
    return new Ship(boardWidth / 2, boardHeight / 2,
                    {x: 0, y: 0}, ctx, game);
  }

  Ship.prototype.draw = function(){
    var radius = 10;
    // this.ctx.strokeStyle = "red";
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.noseX, this.noseY);
    // this.ctx.lineTo(this.noseX - 10, this.noseY + 20);
    // this.ctx.lineTo(this.noseX + 10, this.noseY + 20);
    // this.ctx.closePath();
    // this.ctx.stroke();
    this.ctx.strokeStyle = "red";

    this.ctx.beginPath();
    this.ctx.arc(
      (this.noseX),
      (this.noseY),
      radius,
      0,
      2 * Math.PI,
      true);
    this.ctx.stroke();
  }

  Ship.prototype.update = function(){
    this.noseX += this.velocity.x;
    this.noseY += this.velocity.y;

    if(this.noseX <= 0){
      console.log(this.noseX)
      this.noseX = this.game.boardWidth - 1;
    }

    if(this.noseX >= this.game.boardWidth){
      this.noseX = 0
    }

    if(this.noseY <= 0){
      this.noseY = this.game.boardHeight -1;
    }

    if(this.noseY >= this.game.boardHeight){
      this.noseY = 0
    }
  }

  Ship.prototype.power = function(dx, dy){
    console.log("MOA POWA!")
    this.velocity.x += dx;
    this.velocity.y += dy;
  }

  Ship.prototype.isHit = function(){
    var centerX;
    var centerY;
    var xDiff;
    var yDiff;
    var distance;

    for(var i = 0; i < this.game.asteroids.length; i++){
      centerX = this.game.asteroids[i].cornerX +
                    this.game.asteroids[i].radius;
      centerY = this.game.asteroids[i].cornerY +
                    this.game.asteroids[i].radius;

      xDiff = this.noseX - centerX;
      yDiff = this.noseY - centerY;

      distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

      if(distance <= this.game.asteroids[i].radius + 10){
        return true;
      }
    }

    return false;
  }

  function Game(boardWidth, boardHeight, numAsteroids, ctx){
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.ship = Ship.startShip(boardWidth, boardHeight, ctx, this);

    this.asteroids = [];
    for (var i =0; i < numAsteroids; i++){
      var roid = randomAsteroid(this.boardWidth, this.boardHeight, ctx);
      this.asteroids.push(roid);
    }

    this.ctx = ctx;
    this.intervalId = null;
  }

  Game.prototype.bind = function(){
    var that = this
    key('up', function(){that.ship.power(0, -1)});
    key('down', function(){that.ship.power(0, 1)});
    key('left', function(){that.ship.power(-1, 0)});
    key('right', function(){that.ship.power(1, 0)});
  }

  Game.prototype.draw = function(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);
    this.ship.draw();

    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw();
    }
  }

  Game.prototype.update = function(){
    this.ship.update();

    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].update();

      if (!this.asteroids[i].inBoard(this.boardWidth, this.boardHeight)){
        this.asteroids.splice(i, 1);
      }
    }

    if (this.ship.isHit()){
      alert("YOUVE BEEN HIT!")
    }

  }

  Game.prototype.gameStep = function(){
    this.draw();
    this.update();
    if(this.ship.isHit()){
      window.clearInterval(this.intervalId);
    }
  }

  Game.prototype.start = function(){
    this.bind();
    this.intervalId = window.setInterval(this.gameStep.bind(this), 25);
  }

  return {
    Asteroid: Asteroid,
    Game: Game
  };
}();
