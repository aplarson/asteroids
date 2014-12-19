(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, game, vel) {
    Asteroids.MovingObject.call(this, { pos: pos,
                                        vel: vel,
                                        radius: Asteroids.Bullet.RADIUS,
                                        color: Asteroids.Util.randomColor(),
                                        game: game });
    this.isWrappable = false;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.RADIUS = 5;
})();
