var Ball = {
  _WIDTH: 320,
  _HEIGHT: 480
}; // _WIDTH and _HEIGHT are the width and the height of the game Canvas — they will help us position the elements on the screen

Ball.Boot = function (game) { };

Ball.Boot.prototype = {
  preload: function () { // Loading two images first that will be used later in the Preload state to show the progress of loading all the other assets
    this.load.image('preloaderBg', 'img/loading-bg.png');
    this.load.image('preloaderBar', 'img/loading-bar.png');
  },
  create: function () { // The create function holds some basic configuration, ie. setting up the scaling and alignment of the Canvas, and moving on to the Preload state when everything's ready.
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('Preloader');
  }
};