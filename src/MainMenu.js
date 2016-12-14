Ball.MainMenu = function (game) { };

Ball.MainMenu.prototype = {
  create: function () {
    this.add.sprite(0, 0, 'screen-mainmenu');
    this.gameTitle = this.add.sprite(Ball._WIDTH * 0.5, 40, 'title');
    this.gameTitle.anchor.set(0.5, 0);
    this.startButton = this.add.button(Ball._WIDTH * 0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
    // To create a new button there's add.button method with the following list of optional arguments:
      // Top absolute position on Canvas in pixels.
      // Left absolute position on Canvas in pixels.
      // Name of the image asset the button is using.
      // Function that will be executed when someone clicks the button.
      // The execution context.
      // Frame from the image asset used as the button's "hover" state.
      // Frame from the image asset used as the button's "normal" or "out" state.
      // Frame from the image asset used as the button's "click" or "down" state.
    this.startButton.anchor.set(0.5, 0); // The anchor.set is setting up the anchor point on the button for which all the calculations of the position are applied. In our case it's anchored half the way from the left edge and at the start of the top edge, so it can be easily horizontally centered on the screen without the need to know its width.
    this.startButton.input.useHandCursor = true;
  },
  startGame: function () {
    this.game.state.start('Howto'); // When the start button is pressed, instead of jumping directly into the action the game will show the screen with the information on how to play the game.
  }
};