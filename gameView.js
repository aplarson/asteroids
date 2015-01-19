(function () {

if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var GameView = Asteroids.GameView = function(game, ctx) {
  this.game = game,
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  var gameView = this;
  var ship = this.game.ship;
  gameView.bindKeyHandlers(ship);
  setInterval(function () {
    gameView.game.addAsteroids();
    gameView.game.step();
    gameView.game.draw(gameView.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function (ship) {
  window.key('up, w', function() { ship.power(1); });
  window.key('down, s', function() { ship.power(-1); });
  window.key('left, a', function() { ship.turn(-.3); });
  window.key('right, d', function() { ship.turn(.3); });
  window.key('space', function () { ship.fireBullet(); });
}

})();
