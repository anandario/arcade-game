// Selecting involved elements only once
const scoreDiv = document.getElementById('score');

const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;

const ENEMY_SPRITE = 'images/enemy-bug.png';
const COLISION_LIMIT = 60;
// Position ("y" only) to create the enemies
const ENEMIES_POSITION = [65, 145, 230];

const PLAYER_POS_X = 200;
const PLAYER_POS_Y = 430;
// TODO: Not working
// const PLAYER_SPRITE = 'images/char-cat-girl.png';
const PLAYER_SPRITE = 'images/char-boy.png';
const PLAYER_SPEED = 30;

// Scoring counter
let score = 0;


// Players and Enemies shared stuff
class Character {
    constructor(x, y, sprite) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // Actual position
        this.x = x;
        this.y = y;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = sprite;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Enemies our player must avoid
class Enemy extends Character {
    constructor(x, y, speed) {
        super(x, y, ENEMY_SPRITE);

        // Number of pixels (x) to move in each update
        this.speed = speed;
    }

    // To see if this enemy crashes with the player.
    checkCollision() {
        if (
            this.x < player.x + COLISION_LIMIT &&
            this.x + COLISION_LIMIT > player.x &&
            this.y < player.y + COLISION_LIMIT &&
            this.y + COLISION_LIMIT > player.y
        ) {
            score = 0;
            scoreDiv.innerHTML = score;
            player.reset();
        }
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        // When a bug reached the end, comes back to the init
        if (this.x > 400) {
            this.x = -100;
        }

        this.checkCollision();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x, y) {
        super(PLAYER_POS_X, PLAYER_POS_Y, PLAYER_SPRITE);
    }

    // To move back the player to default position
    reset() {
        this.x = PLAYER_POS_X;
        this.y = PLAYER_POS_Y;
    };

    // Update the player's position
    update() {
        // If the player reaches the end (water)
        if (this.y < 1) {
            this.reset();
            score++;
            scoreDiv.innerHTML = score;
        }
    };

    // Action depending the direction chosen by the user
    handleInput(direction) {
        if (direction == 'left' && this.x > 0) {
            this.x -= TILE_WIDTH;
        }
        if (direction == 'right' && this.x < 400) {
            this.x += TILE_WIDTH;
        }
        if (direction == 'up' && this.y > 0) {
            this.y -= TILE_HEIGHT;
        }
        if (direction == 'down' && this.y < 430) {
            this.y += TILE_HEIGHT;
        }
    };
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

ENEMIES_POSITION.forEach(function (y) {
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
