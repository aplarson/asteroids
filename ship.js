(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, { pos: pos,
                                        vel: [0, 0],
                                        radius: Asteroids.Ship.RADIUS,
                                        color: Asteroids.Util.randomColor(),
                                        game: game });
    this.heading = Math.atan2(0, 1);
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.RADIUS = 10;

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (direction) {
    this.vel[0] += direction * (-Math.cos(this.heading));
    this.vel[1] += direction * Math.sin(this.heading);
  };

  Ship.prototype.turn = function (direction) {
    this.heading += direction;
  };

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[1], this.pos[0]);
    ctx.rotate(this.heading);
    ctx.beginPath();
    ctx.moveTo(0, -1.5 * this.radius);
    ctx.lineTo(15, 1.5 * this.radius);
    ctx.lineTo(-15, 1.5 * this.radius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  Ship.prototype.fireBullet = function () {
    var direction = [-Math.cos(this.heading), Math.sin(this.heading)];
    var bulletVel = [direction[0] * 15, (direction[1] * 15)];
    var bullet = new Asteroids.Bullet(this.pos, this.game, bulletVel);
    this.game.bullets.push(bullet);
  }
})();
