Ball.Preloader = function (game) { }; // The Preloader state takes care of loading all the assets

Ball.Preloader.prototype = {
  preload: function () {
    this.preloadBg = this.add.sprite((Ball._WIDTH - 297) * 0.5, (Ball._HEIGHT - 145) * 0.5, 'preloaderBg');
    this.preloadBar = this.add.sprite((Ball._WIDTH - 158) * 0.5, (Ball._HEIGHT - 50) * 0.5, 'preloaderBar');
    // In this state the preloadBar is showing the progress on the screen. That progress of the loaded assets is visualized by the framework with the use of one image. With every asset loaded you can see more of the preloadBar image: from 0% to 100%, updated on every frame.
    this.load.setPreloadSprite(this.preloadBar);
    this.load.image('ball', 'img/ball.png');
    this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
    this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
  },
  create: function () {
    this.game.state.start('MainMenu'); // After all the assets are loaded, the MainMenu state is launched.
  }
};