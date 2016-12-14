Ball.Game = function (game) { }; // The Game state from the Game.js file is where all the magic happens

Ball.Game.prototype = { // The create and update functions are framework-specific, while others will be our own creations.
  create: function () { // All the initialization is in the create() function (launched once at the beginning of the game)
    this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball'); // Here we’re adding a sprite at the given place on the screen and using the 'ball' image from the loaded graphic assets. 
    this.ball.anchor.set(0.5); // We’re also setting the anchor for any physics calculations to the middle of the ball, ...
    this.physics.enable(this.ball, Phaser.Physics.ARCADE); // enabling the Arcade physics engine (which handles all the physics for the ball movement), and ...
    this.ball.body.setSize(18, 18); // setting the size of the body for the collision detection. 
    this.ball.body.bounce.set(0.3, 0.3); // The bounce property is used to set the bounciness of the ball when it hits the obstacles. This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return.

    this.keys = this.game.input.keyboard.createCursorKeys(); // Add the ability to control the ball with the keyboard on the desktop devices
    // There is the Phaser function called createCursorKeys(), which will give us an object with event handlers for the four arrow keys to play with: up, down, left and right.
    
    // The most interesting part of the game is its usage of the Device Orientation API for control on mobile devices. Thanks to this you can play the game by tilting the device in the direction you want the ball to roll.
    window.addEventListener("deviceorientation", this.handleOrientation, true); // Adding an event listener to the "deviceorientation" event and binding the handleOrientation function
  },
  initLevels: function () { }, // initLevels initializes the level data
  showLevel: function (level) { }, // showLevel prints the level data on the screen
  updateCounter: function () { }, // updateCounter updates the time spent playing each level and records the total time spent playing the game
  managePause: function () { }, // managePause pauses and resumes the game
  manageAudio: function () { }, // manageAudio turns the audio on and off
  update: function () { // The update() function is executed at every frame, which updates things such as the ball position
    // The this.keys object will be checked against player input, so the ball can react accordingly with the predefined force. This way we can check which key is pressed at the given frame and apply the defined force to the ball, thus increase the velocity in the proper direction.
    if (this.keys.left.isDown) {
      this.ball.body.velocity.x -= this.movementForce;
    }
    else if (this.keys.right.isDown) {
      this.ball.body.velocity.x += this.movementForce;
    }
    if (this.keys.up.isDown) {
      this.ball.body.velocity.y -= this.movementForce;
    }
    else if (this.keys.down.isDown) {
      this.ball.body.velocity.y += this.movementForce;
    }

  }, 
  wallCollision: function () { }, // wallCollision is executed when the ball hits the walls or other objects
  handleOrientation: function (e) { // handleOrientation is the function bound to the event responsible for the Device Orientation API, providing the motion controls when the game is running on a mobile device with appropriate hardware
    // The more you tilt the device, the more force is applied to the ball, therefore the faster it moves (the velocity is higher).
    var x = e.gamma;
    var y = e.beta;
    Ball._player.body.velocity.x += x;
    Ball._player.body.velocity.y += y;
  }, 
  finishLevel: function () { } // finishLevel loads a new level when the current level is completed, or finished the game if the final level is completed
};