// Selecting involved elements only once
const scoreDiv = document.getElementById('score');
let score = 0;

// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Actual position
    this.x = x;
    this.y = y;

    // Number of pixels (x) to move in each update
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// To see if this enemy crashes with the player.
Enemy.prototype.checkCollision = function () {
    const distanceLimit = 60;

    if (
        this.x < player.x + distanceLimit &&
        this.x + distanceLimit > player.x &&
        this.y < player.y + distanceLimit &&
        this.y + distanceLimit > player.y
    ) {
        score = 0;
        scoreDiv.innerHTML = score;
        player.reset();
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // When a bug reached the end, comes back to the init
    if (this.x > 400) {
        this.x = -100;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function () {
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/char-boy.png';
    // TODO: Not working.
    // this.sprite = Resources.get('images/char-cat-girl.png');
    // Number of pixels to move the player with each key press
    this.speed = 30;
};

// To move back the player to default position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 430;
};

// Update the player's position
Player.prototype.update = function () {
    // If the player reaches the end (water)
    if (this.y < 1) {
        this.reset();
        score++;
        scoreDiv.innerHTML = score;
    }
};

// Draw the enemy on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Action depending the direction chosen by the user
Player.prototype.handleInput = function (direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= this.speed;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += this.speed;
    }
    if (direction == 'up' && this.y > 0) {
        this.y -= this.speed;
    }
    if (direction == 'down' && this.y < 430) {
        this.y += this.speed;
    }
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Position ("y" only) to create the enemies
const enemiesPosition = [65, 145, 230];

enemiesPosition.forEach(function (y) {
    const enemy = new Enemy(
        0, // x, all at the init
        y,
        // random speed
        50 + Math.floor(Math.random() * 400),
    );
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});