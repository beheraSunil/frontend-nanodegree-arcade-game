// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Initial Location
    var x = 0;
    var y = 60;
    //Speed of the enemy
    var speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var i = this.x;
    var j = this.y;

    //When the enemy is within the canvas
    if (this.x < 505) {
        //Update location
        this.x = (i + this.speed * 50 * dt);
    }
    //When the enemy is outside the canvas
    else {
        //Location of enemy on x-axis is randomly assigned.
        this.x = Math.random() * 100;
        //Speed of the enemy too is randomly assigned.
        this.speed = getRandomSpeed();
    }

    console.log(player.x, player.y);
    //score: time taken to reach water
    score += 1;
    // $("#currentScore").replace('<h4>Score: '+score+'</h4>');

    //Colision detection
    if (player.x > this.x && player.x < this.x + brickWidth && player.y > this.y && player.y < this.y + brickHeight) {
        console.log("Colision Occured");
        //reset the player
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player Class
var Player = function() {
    //player sprite
    this.sprite = 'images/char-boy.png';
    //variable to store location of palyer
    var x = 100;
    var y = 400;
}

//Does nothing for now.
Player.prototype.update = function() {};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to handle keyboard inputs and update player location
Player.prototype.handleInput = function(key) {
    //To check if the player has reached the water part and won
    if (this.y < 90) {
        console.log("WON Score :", score)
        $("#scoreCard").append('<h3>Your Score: ' + score + '</h3>');
        score = 0;
        this.y = 400;
        this.x = 200;
        $("#c").css('display', 'none')
        $("body").prepend('<div id=playButton><h1>Congratulations!<br> You win!! <br></h1><button id="play" class="button">Once More!!</button></div>')
        $("body").append('<script type="text/javascript">$("#play").click(function(){$("#c").css("display","block");$("#playButton").remove();score = 0; });</script>');
    }
    //Performing operations on the locations based on the keyCode and updating player location
    else {
        if (key === 'up') {
            this.y = this.y - 80;
        }
        if (key === 'down' && this.y < 400) {
            this.y = this.y + 80;
        }
        if (key === 'left' && this.x > 0) {
            this.x = this.x - 100;
        }
        if (key === 'right' && this.x < 400) {
            this.x = this.x + 100;
        }
    }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Enemy objects created
var Enemy1 = new Enemy;
Enemy1.x = 0;
Enemy1.y = 220;
Enemy1.speed = 15;

var Enemy2 = new Enemy;
Enemy2.x = 0;
Enemy2.y = 140;
Enemy2.speed = 10;

var Enemy3 = new Enemy;
Enemy3.x = 0;
Enemy3.y = 60;
Enemy3.speed = 8;

var allEnemies = [Enemy1, Enemy2, Enemy3];

//Player created
var player = new Player;
player.x = 200;
player.y = 400;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Variable to store maximum and mimimum speed of enemy.
// TODO
//Change this variables as per the diffculty level.
var minSpeed = 5;
var maxSpeed = 10;

//the height and width of each box or brick of which the canvas is made up of.
var brickWidth = 50;
var brickHeight = 80;
//Variable to store the score of player.
var score = 0;

//Function to generate random speed values of enemy.
function getRandomSpeed() {
    return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}