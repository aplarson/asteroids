(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, { pos: pos,
                                        vel: [0, 0],
                                        radius: Asteroids.Ship.RADIUS,
                                        color: Asteroids.Util.randomColor(),
                                        game: game })
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPosition();
    this.vel = [0, 0]
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.draw = function (ctx) {

    if (this.vel[0] !== 0 || this.vel[1] !== 0) {
      ctx.rotate(Math.atan2(this.vel[0], this.vel[1]))
    }
    ctx.beginPath();
    ctx.moveTo(this.pos[1], this.pos[0] - .5 * this.radius);
    ctx.lineTo(this.pos[1] + 5, this.pos[0] + .5 * this.radius);
    ctx.lineTo(this.pos[1] - 5, this.pos[0] + .5 * this.radius);
    ctx.closePath();
    ctx.fill();
  };

  Ship.prototype.fireBullet = function() {
    var direction = Asteroids.Util.unitVector(this.vel)
    var bulletVel = [this.vel[0] + (direction[0] * 15), this.vel[1] + (direction[1] * 15)];
    var bullet = new Asteroids.Bullet(this.pos, this.game, bulletVel);
    this.game.bullets.push(bullet);
  }
})();
