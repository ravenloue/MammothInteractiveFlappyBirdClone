const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var x = 0;        // Position X of player
var y = 0;        // Position Y of player
var key = 0;      // Value of key pressed
var keyState = 0; // Stores boolean value for player movement

// Creates a player using the image and draws it on the canvas
var player = new Image();
player.src = 'src/playerImg.png';
player.onload = function() {
  ctx.drawImage(player, x, y);
};

/**
 * chooseRandNum takes an input of minimum and maximum and generates a 
 * random number that fits within the set boundaries
 */
function chooseRandNum(min, max){
    return Math.random() * (max-min) + min;
}// end of chooseRandNum()

// The size and initial location of the obstacles on the canvas
var obstacles = [
  { x: 600, y: chooseRandNum(0, 500), w: 50, h: chooseRandNum(50, 500) },
  { x: 800, y: chooseRandNum(0, 500), w: 50, h: chooseRandNum(50, 500) },
  { x: 1000, y: chooseRandNum(0, 500), w: 50, h: chooseRandNum(50, 500) },
  { x: 1200, y: chooseRandNum(0, 500), w: 50, h: chooseRandNum(50, 500) },
  { x: 1400, y: chooseRandNum(0, 500), w: 50, h: chooseRandNum(50, 500) }
];

/**
 * handleCollision detects if the player's boundary box collides with 
 * any of the boundary boxes for the objects on the canvas
 */
function handleCollision(obstacle){

  // Setting up the boundaries for the player
  const playerLeft = x + 32;
  const playerRight = playerLeft + 118;
  const playerTop = y + 23;
  const playerBot = playerTop + 127;

  // Setting up the boundaries for the obstacle
  const objLeft = obstacle.x;
  const objRight = obstacle.x + obstacle.w;
  const objTop = obstacle.y;
  const objBot = obstacle.y + obstacle.h;

  // If these conditions are met, there is no collision
  if(playerBot < objTop || playerTop > objBot ||
     playerRight < objLeft || playerLeft > objRight){
       
       return false;
  }

  // If there is a collision
  return true;    
}// end of handleCollision()

// These two statements set the boolean value of keyState 
document.onkeydown = function(evt){
  key = evt.key;
  keyState=true;
};
document.onkeyup = function(evt){keyState=false;};

/*
 * The interior function controls the state of the game on the canvas.
 * At the given interval, the game will update the location of the player, 
 * the obstacles, and check for collisions
 */
setInterval(function(){

  // If the keystate is true, the player will move
  if (keyState === true) {
   // Checking key press to determine which direction to move the player
    if(key === "w") y -= 5;
    if(key === "s") y += 5;
  }

  /*
   * Removes previous image locations from view on the canvas before 
   * redrawing with updated image locations for player and obstacles
   */
  ctx.clearRect(0,0,2000,2000);
  ctx.drawImage(player, x, y);

  // Controls generation of obstacles, their movement and checks collision
  for(var i = 0; i < obstacles.length; i++){

    const obstacle = obstacles[i];
    ctx.fillStyle="red";
    obstacle.x -=5;

    if(obstacle.x < -50) {
      obstacle.x = 1000;
      obstacle.y = chooseRandNum(0, 500);
      obstacle.h = chooseRandNum(50, 500);
    }
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);

    if (handleCollision(obstacle)) location.reload();
  }
}, 5);
