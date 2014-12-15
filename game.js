(function () {

if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Game = Asteroids.Game = function () {
  this.asteroids = [],
  this.ship = new Asteroids.Ship (Asteroids.Game.randomPosition(), this),
  this.bullets = [];
};

Game.DIM_X = window.innerWidth;

Game.DIM_Y = window.innerHeight;

Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for(var i = this.asteroids.length; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroids.Asteroid(Game.randomPosition(), this));
  }
};

Game.randomPosition = function() {
  return [Asteroids.Util.randomGen(Game.DIM_Y),
          Asteroids.Util.randomGen(Game.DIM_X)];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function (el) { el.draw(ctx); });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function(el) { el.move(); });
};

Game.prototype.wrap = function (pos) {
  var newPos = pos;
  if (pos[0] < 0 || pos[0] > Game.DIM_Y) {
    newPos[0] = Math.abs(pos[0] - Game.DIM_Y);
  }
  if (pos[1] < 0 || pos[1] > Game.DIM_X) {
    newPos[1] = Math.abs(pos[1] - Game.DIM_X);
  }
  return newPos;
};

Game.prototype.checkCollisions = function () {
  var allObjects = this.allObjects()
  for(var i = 0; i < allObjects.length; i++) {
    for(var j = i + 1; j < allObjects.length; j++) {
      if (allObjects[i].isCollidedWith(allObjects[j])) {
        allObjects[i].collideWith(allObjects[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    var index = this.asteroids.indexOf(obj);
    this.asteroids.splice(index, 1);
  } else if (obj instanceof Asteroids.Bullet) {
    var index = this.bullets.indexOf(obj);
    this.bullets.splice(index, 1);
  }
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] < 0 || pos[0] > Game.DIM_Y) {
    return true;
  }
  if (pos[1] < 0 || pos[1] > Game.DIM_X) {
    return true;
  }
  return false;
}
})();