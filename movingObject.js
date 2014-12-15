(function () {

if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var MovingObject = Asteroids.MovingObject = function (newMovingObject) {
  this.pos = newMovingObject.pos,
  this.vel = newMovingObject.vel,
  this.radius = newMovingObject.radius,
  this.color = newMovingObject.color,
  this.game = newMovingObject.game,
  this.isWrappable = true;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[1], this.pos[0], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function () {
  newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  if (this.game.isOutOfBounds(newPos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(newPos);
    } else {
      this.game.remove(this);
    }
  } else {
    this.pos = newPos
  }

};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance = Asteroids.Util.distanceBetween(this.pos, otherObject.pos);
  var radii = this.radius + otherObject.radius;
  if (distance <= radii) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {

};
})();