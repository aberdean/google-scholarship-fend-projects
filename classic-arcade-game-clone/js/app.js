/**
 * @description Represent the enemies the player needs to avoid to win the game.
 * Enemies have a default image, a random speed, and an initial position on the
 * screen. They move continuously and stop only when the player wins the game.
 * When a collision between an enemy and the player occurs, the game is reset.
 */
class Enemy {
    /**
     * @description Construct new enemy objects, assigning their default image,
     * their initial position, and their initial speed.
     * @param {number} x The initial position of the enemy in the x direction
     * @param {number} y The initial position of the enemy in the y direction
     * @param {number} speed The initial speed of the enemy
     */
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.victory = false;
    }

    /**
     * @description Update the enemy's position, multiplying the speed by a time
     * delta between ticks to ensure the game runs at the same speed for all
     * computers. When the enemy disappear out of the right side of the screen,
     * it returns back from the left side of the screen.
     * When an enemy collides with the player, the game is reset.
     * @param {number} dt The time delta between ticks
     */
    update(dt) {
        this.x += this.speed * dt;
        // Detect when the enemy disappears from the right side of the screen
        if (this.x >= 500) {
            this.x = -100;
        }

        /* If the horizontal distance between an enemy and the player is less
         * than 60 pixels or the vertical distance is less than 13 pixels, there
         * was a collision between the enemy and the player.
         */
        if (Math.abs(Math.floor(player.x) - Math.floor(this.x)) <= 60 &&
           Math.abs(Math.floor(player.y) - Math.floor(this.y)) <= 13) {
            window.location.reload();
        }
    }

    /**
     * @description Draw an enemy on the screen.
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Represent the player. The player has a default image and an
 * initial position on the screen. The player can move horizontally or
 * vertically, but is not allowed to move off the screen. The player's starting
 * position is on the grass at the bottom of the screen, and the aim is to
 * reach the water at the top of the screen without colliding into any enemy.
 * When the player reaches the water, the game is won. When the player collides
 * with an enemy, the game is reset.
 */
class Player {
    /**
     * @description Construct the player object, assigning their default image
     * and their initial position.
     * @param {number} x The initial position of the player in the x direction
     * @param {number} y The initial position of the player in the y direction
     */
    constructor(x, y) {
        this.sprite = 'images/char-pink-girl.png';
        this.x = x;
        this.y = y;
    }

    /**
     * @description Prevent the player from moving off the screen.
     * @param {number} x The horizontal position of the player
     * @param {number} y The vertical position of the player
     */
    update(x, y) {
        // the player is trying to move off the right side of the screen
        if (this.x >= 402) {
            this.x = 402;
        }

        // the player is trying to move off the left side of the screen
        if (this.x <= -2) {
            this.x = -2;
        }

        // The player is trying to move off the bottom of the screen
        if (this.y > 404) {
            this.y = 404;
        }

        /** 
         * The player is trying to move off the top of the screen. When the
         * player reaches the top of the screen, they win the game. When the
         * game is won, the player's position is reset to their initial
         * position, all the enemies are stopped, and a message appears on the
         * screen announcing the victory.
         */
        if (this.y <= -11) {
            setTimeout(() => {
                // return the player to their initial position
                this.x = 200;
                this.y = 404;
                // stop all enemies
                for (const enemy of allEnemies) {
                    enemy.speed = 0;
                }
                // print the victory message on the screen
                this.victory = true;
                this.render();
            }, 100);
        }
    }

    /**
     * @description Draw the player on the screen.
     * When the game is won, print the victory message to the screen.
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.victory === true) {
            ctx.font = '72px Georgia';
            ctx.fillText('You won!', 100, 280);
            ctx.font = '24px Georgia';
            ctx.fillText('Hit a bug to play again!', 120, 320);
        }
    }

    /**
     * @description Move the player's character in the direction of the arrow
     * key pressed by the player.
     * @param {string} direction The direction of the arrow key pressed by the
     * player
     */
    handleInput(direction) {
        switch(direction) {
            /* When the left key is pressed, move the player's character one
             * column to the left.
             */
            case 'left':
                this.update(this.x -= 101);
                break;
            /* When the up key is pressed, move the player's character one row
             * towards the top.
             */
            case 'up':
                this.update(this.y -= 83);
                break;
            /* When the right key is pressed, move the player's character one
             * column to the right.
             */
            case 'right':
                this.update(this.x += 101);
                break;
            /* When the down key is pressed, move the player's character one
             * row towards the bottom.
             */
            case 'down':
                this.update(this.y += 83);
        }
    }
}

/**
 * @description A list containing all the enemies.
 * @type {object[]}
 */
const allEnemies = [];

//Instantiate all enemies and add them to the allEnemies list.
const enemyOne = new Enemy(-50, 60, Math.floor(Math.random() * 100) + 100);
allEnemies.push(enemyOne);
const enemyTwo = new Enemy(-100, 145, Math.floor(Math.random() * 100) + 100);
allEnemies.push(enemyTwo);
const enemyThree = new Enemy(-200, 225, Math.floor(Math.random() * 100) + 100);
allEnemies.push(enemyThree);
const enemyFour = new Enemy(-300, 60, enemyOne.speed);
allEnemies.push(enemyFour);
const enemyFive = new Enemy(-350, 145, enemyTwo.speed);
allEnemies.push(enemyFive);
const enemySix = new Enemy(-450, 225, enemyThree.speed);
allEnemies.push(enemySix);

// Instantiate the player's object.
const player = new Player(200, 404);

/**
 * @typedef {object} KeyEvent
 */

/**
 * @event {string} 'keyup'
 * @type {KeyEvent}
 * @description When one of the allowed keys is pressed, call the
 * Player.handleInput method to move the player in the direction indicated by
 * the key pressed.
 * The allowed keys are the four arrows keys: left, up, right, and down.
 */
document.addEventListener('keyup', (e) => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
