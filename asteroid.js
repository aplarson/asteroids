(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this, { pos: pos,
                                        vel: Asteroids.Util.randomVec(1),
                                        radius: Asteroid.RADIUS,
                                        color: Asteroids.Util.randomColor(),
                                        game: game })
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 30;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      game = this.game;
      game.remove(this);
      game.remove(otherObject);
    } else if (otherObject instanceof Asteroids.Asteroid) {
      var collisionDir = [this.pos[0] - otherObject.pos[0],
                          this.pos[1] - otherObject.pos[1]];
    }
  };
})();
