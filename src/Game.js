Ball.Game = function (game) { }; // The Game state from the Game.js file is where all the magic happens

Ball.Game.prototype = { // The create and update functions are framework-specific, while others will be our own creations.
  create: function () { }, // All the initialization is in the create() function (launched once at the beginning of the game)
  initLevels: function () { }, // initLevels initializes the level data
  showLevel: function (level) { }, // showLevel prints the level data on the screen
  updateCounter: function () { }, // updateCounter updates the time spent playing each level and records the total time spent playing the game
  managePause: function () { }, // managePause pauses and resumes the game
  manageAudio: function () { }, // manageAudio turns the audio on and off
  update: function () { }, // Take note of the update() function (executed at every frame), which updates things such as the ball position
  wallCollision: function () { }, // wallCollision is executed when the ball hits the walls or other objects
  handleOrientation: function (e) { }, // handleOrientation is the function bound to the event responsible for the Device Orientation API, providing the motion controls when the game is running on a mobile device with appropriate hardware
  finishLevel: function () { } // finishLevel loads a new level when the current level is completed, or finished the game if the final level is completed
};