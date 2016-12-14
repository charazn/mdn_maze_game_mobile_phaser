Ball.Howto = function (game) {
};

Ball.Howto.prototype = {
  create: function () {
    this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
    // The Howto state shows the gameplay instructions on the screen before starting the game. After clicking the screen the actual game is launched.
  },
  startGame: function () {
    this.game.state.start('Game');
  }
};