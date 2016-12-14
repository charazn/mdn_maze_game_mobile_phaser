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

    // The hole’s body will not move when we hit it with the ball and will have the collision detection calculated (which will be discussed later on)    
    this.hole = this.add.sprite(Ball._WIDTH * 0.5, 90, 'hole');
    this.physics.enable(this.hole, Phaser.Physics.ARCADE);
    this.hole.anchor.set(0.5);
    this.hole.body.setSize(2, 2);

    this.bounceSound = this.game.add.audio('audio-bounce');
  },
  initLevels: function () { // initLevels initializes the level data
    this.levels = [];
    // To hold the block information we'll use a level data array: for each block we'll store the top and left absolute positions in pixels (x and y) and the type of the block — horizontal or vertical (t with the 'w' value meaning width and 'h' meaning height)
    this.levelData = [
      [
        { x: 96, y: 224, t: 'w' }
      ],
      [
        { x: 72, y: 320, t: 'w' },
        { x: 200, y: 320, t: 'h' },
        { x: 72, y: 150, t: 'w' }
      ],
      [
        { x: 64, y: 352, t: 'h' },
        { x: 224, y: 352, t: 'h' },
        { x: 0, y: 240, t: 'w' },
        { x: 128, y: 240, t: 'w' },
        { x: 200, y: 52, t: 'h' }
      ],
      [
        { x: 78, y: 352, t: 'h' },
        { x: 78, y: 320, t: 'w' },
        { x: 0, y: 240, t: 'w' },
        { x: 192, y: 240, t: 'w' },
        { x: 30, y: 150, t: 'w' },
        { x: 158, y: 150, t: 'w' }
      ],
      [
        { x: 188, y: 352, t: 'h' },
        { x: 92, y: 320, t: 'w' },
        { x: 0, y: 240, t: 'w' },
        { x: 128, y: 240, t: 'w' },
        { x: 256, y: 240, t: 'h' },
        { x: 180, y: 52, t: 'h' },
        { x: 52, y: 148, t: 'w' }
      ]
    ];
    // To load the level we'll parse the data and show the blocks specific for that level, by adding the blocks into a newLevel array
    for (var i = 0; i < this.maxLevels; i++) {
      var newLevel = this.add.group(); // First, add.group() is used to create a new group of items
      newLevel.enableBody = true;
      newLevel.physicsBodyType = Phaser.Physics.ARCADE; // Then the ARCADE body type is set for that group to enable physics calculations. 
      for (var e = 0; e < this.levelData[i].length; e++) {
        var item = this.levelData[i][e];
        newLevel.create(item.x, item.y, 'element-' + item.t); // The newLevel.create method creates new items in the group with starting left and top positions, and its own image. 
      }
      newLevel.setAll('body.immovable', true); // You can use setAll on a group to apply it to all the items in that group.
      newLevel.visible = false; // The objects are stored in the this.levels array, which is by default invisible.
      this.levels.push(newLevel);
    }
  },
  showLevel: function (level) { // showLevel prints the level data on the screen
    // To load specific levels, we make sure the previous levels are hidden, and show the current one:
    var lvl = level | this.level;
    if (this.levels[lvl - 2]) {
      this.levels[lvl - 2].visible = false;
    }
    this.levels[lvl - 1].visible = true;
  },
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

    // This will tell the framework to execute the wallCollision function when the ball hits any of the walls. We can use the wallCollision function to add any functionality we want like playing the bounce sound and implementing the Vibration API.    
    this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
    this.physics.arcade.collide(this.ball, this.levels[this.level - 1], this.wallCollision, null, this);
  },
  wallCollision: function () {
    if (this.audioStatus) {
      this.bounceSound.play();
    }
  }, // wallCollision is executed when the ball hits the walls or other objects
  handleOrientation: function (e) { // handleOrientation is the function bound to the event responsible for the Device Orientation API, providing the motion controls when the game is running on a mobile device with appropriate hardware
    // The more you tilt the device, the more force is applied to the ball, therefore the faster it moves (the velocity is higher).
    var x = e.gamma;
    var y = e.beta;
    Ball._player.body.velocity.x += x;
    Ball._player.body.velocity.y += y;
  },
  finishLevel: function () { } // finishLevel loads a new level when the current level is completed, or finished the game if the final level is completed
};