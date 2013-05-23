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


  function Ship(cornerX, cornerY, velocity, ctx){
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.velocity = velocity;
    this.ctx = ctx;
  }


  function Game(boardWidth, boardHeight, numAsteroids, ctx){
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    this.asteroids = [];
    for (var i =0; i < numAsteroids; i++){
      var roid = randomAsteroid(this.boardWidth, this.boardHeight, ctx);
      this.asteroids.push(roid);
    }

    this.ctx = ctx;
  }

  Game.prototype.draw = function(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);
    // console.log("hallo");
    // console.log(this.ctx);
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw();
    }
  }

  Game.prototype.update = function(){
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].update();
      console.log(!this.asteroids[i].inBoard());
      console.log(i);
      console.log(this.asteroids[i].velocity);
      if (!this.asteroids[i].inBoard(this.boardWidth, this.boardHeight)){
        this.asteroids.splice(i, 1);
      }
    }
  }

  Game.prototype.start = function(){
    var that = this;
    window.setInterval(function(){
      // console.log(that.asteroids[0]);
      that.draw();
      that.update();
    }, 25);
  }
  return {
    Asteroid: Asteroid,
    Game: Game
  };
}();
