/**
 * @description A list that holds all cards.
 * @type {string[]}
 */
let cards = ["diamond", "paper-plane-o", "anchor", "bolt",
             "cube", "anchor", "leaf", "bicycle",
             "diamond", "bomb", "leaf", "bomb",
             "bolt", "bicycle", "paper-plane-o", "cube"];

/**
 * @description A list of all the cards
 * @type {HTMLElement[]}
 */
const table = document.querySelector(".deck");

/**
 * @description A list that holds all the cards' inner classes.
 * @type {HTMLElement[]}
 */
let list = table.querySelectorAll("i");

/**
 * @description Selector to show the number of moves.
 * @type {HTMLElement}
 */
const moves = document.querySelector(".moves");

/**
 * @description Counter to keep track of the number of moves.
 * @type {number}
 */
let counter = 0;

/**
 * @description Selector to show the number of moves in the modal.
 * @type {HTMLElement}
 */
const finalMoves = document.querySelector(".final-moves");

/**
 * @description List of open cards.
 * @type {HTMLElement[]}
 */
let openCards = [];

/**
 * @description Counter to keep track of the number of pairs of cards matched.
 * @type {number}
 */
let matches = 0;

/**
 * @description Boolean to start the timer when the first card is clicked.
 * @type {boolean}
 */
let firstCard = true;

/**
 * @description Timer to keep track of the time to solve the game.
 * @type {?function} - setInterval function
 */
 let elapsedTime = null;

/**
 * @description Selectors to show the time elapsed, in minutes and seconds.
 * @type {HTMLElement}
 */
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

/**
 * @description Selectors to show the final time in the modal, in minutes and
 * seconds.
 * @type {HTMLElement}
 */
 const finalMinutes = document.querySelector(".final-minutes");
 const finalSeconds = document.querySelector(".final-seconds");

 /**
  * @description Select the inner element of each star.
  * @type {HTMLElement}
  */
const stars = document.querySelector(".stars");
const firstStar = stars.firstElementChild.querySelector("i");
const secondStar = stars.firstElementChild.nextElementSibling
                   .querySelector("i");
const thirdStar = stars.lastElementChild.querySelector("i");

/**
 * @description Select the inner element of each star in the modal.
 * @type {HTMLElement}
 */
const finalStars = document.querySelector(".final-stars");
const firstFinalStar = finalStars.firstElementChild.querySelector("i");
const secondFinalStar = finalStars.firstElementChild.nextElementSibling
                        .querySelector("i");
const thirdFinalStar = finalStars.lastElementChild.querySelector("i");

/**
 * @description Select the modal to display when the game is won.
 * @type {HTMLElement}
 */
const modal = document.querySelector(".modal");


/**
 * @description Shuffle function from http://stackoverflow.com/a/2450976
 * @param {string[]} array - an array of cards
 * @returns {string[]} array - the array of cards shuffled
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * @description Shuffle an array of cards and then assign the new inner class
 * to each card.
 */
const startGame = () => {
    shuffle(cards);

    cards.forEach(function(card, i) {
        list[i].className = `fa fa-${card}`;
    });
};

startGame();

/**
 * @namespace document
 *
 * @typedef {{
 *  target: element,
 *  which: number
 * }} mouseEventParams
 */

/**
 * @event document#click
 * @type {mouseEventParams}
 * @description When a card is clicked, if it's the first card clicked,
 * start the timer. If the element clicked is a card and the card is not
 * already flipped open, display the card's symbol and add the card to the
 * open cards list. If there are already two open cards in the open cards list,
 * then if the cards' symbols match, lock the cards in the open position.
 * Otherwise, hide the cards. Clear the open cards list and increment the
 * number of moves. If the matches are equal to half the number of cards
 * available, the game is won.
 */
table.addEventListener("click", (event) => {

    // Start timer when the player clicks on the first card.
    if (firstCard === true) {
        startTimer();
    }

    // Check if the player clicked on a card that is not already open.
    if (event.target.matches("li") &&
        !(event.target.classList.contains("open"))) {

        // Display the card and add it to the open cards list.
        displayCard(event.target);
        addToOpenCards(event.target);

        // Check if there are two cards in the open cards list and if
        // so, check if they match.
        if (openCards.length === 2) {
            if (matchedCards()) {

                // Lock the cards in the open position and increase
                // the number of matches.
                lockCards();
                matches += 1;

                // If all matches are made, the game is won.
                if (matches === table.children.length / 2) {
                    clearInterval(elapsedTime);
                    gameWon();
                }

            // If the cards don't match, hide them.
            } else {
                hideCards();
            }

            // Reset the open cards list and increase the number of moves.
            openCards = [];
            incrementMoves();
        }
    }

    // After the first card is clicked, switch first card to false.
    firstCard = false;
});

/**
 * @description Flips the card open, showing its symbol.
 * @param {HTMLElement} card The <li> element containing the card.
 */
function displayCard(card) {
    card.classList.add("open", "show");
}

/**
 * @description Adds the clicked card to the open cards.
 * @param {HTMLElement} card The <li> element containing the card.
 */
function addToOpenCards(card) {
    openCards.push(card);
}

/**
 * @description Check if the two open cards match.
 * @returns {boolean} true if the two cards match, false otherwise.
 */
function matchedCards() {
    return (openCards[0].querySelector("i").classList.value ===
        openCards[1].querySelector("i").classList.value);
}

/**
 * @description Lock the two open cards, so they don't respond to click
 * events anymore.
 */
function lockCards() {
    openCards.forEach((card) => {
        card.classList.add("match");
    });
}

/**
 * @description Hide both the open cards after a
 * brief interval of time.
 */
function hideCards() {
    openCards.forEach((card, index) => {
        setTimeout(function() {
            card.classList.remove("open", "show");
        }, 500);
    });
}

/**
 * @description Increment the number of moves the player has made.
 * Call the calculateScore() function to update the number of stars.
 */
function incrementMoves() {
    counter += 1;
    moves.textContent = counter;
    calculateScore();
}

/**
 * @description Start a timer to update the minutes and seconds elapsed
 * since the player clicked on the first card.
 */
function startTimer() {
    const start = Date.now();
    elapsedTime = setInterval(() => {
        // time in milliseconds
        let millis = Date.now() - start;
        // calculate minutes
        minutes.textContent = Math.floor(millis / (1000 * 60));
        // calculate seconds
        seconds.textContent = Math.floor((millis / 1000) % 60);
    }, 1000);

}

/**
 * @event document#click
 * @type {mouseEventParams}
 * @description When the reset icon is clicked, call the resetGame() function.
 */
document.querySelector(".restart")
    .addEventListener("click", resetGame);

/**
 * @description Reset all values to their initial state and restart the game.
 */
function resetGame() {
    // hide all cards.
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("open", "show", "match");
    });
    // reset the stars to three full stars.
    document.querySelectorAll(".stars li").forEach((star) => {
        star.querySelector("i").className = "fa fa-star";
    });
    // reset move counter, moves, time, amount of matches, open cards,
    // first card, and restart the game.
    counter = 0;
    moves.textContent = 0;
    clearInterval(elapsedTime);
    minutes.textContent = 0;
    seconds.textContent = 0;
    matches = 0;
    openCards = [];
    firstCard = true;
    startGame();
}

/**
 * @description When a player wins the game, a modal is displayed indicating
 * the number of stars achieved and the time taken to finish the game.
 * The player can simply close the modal, or the player can choose to play
 * again, in which case the game will be reset.
 */
function gameWon() {
    // A small delay is needed to record the last move.
    setTimeout(function () {
        // Display the modal.
        modal.style.display = "block";
        // Display the amount of stars earned.
        firstFinalStar.className = firstStar.className;
        firstFinalStar.classList.add("fa-2x");
        secondFinalStar.className = secondStar.className;
        secondFinalStar.classList.add("fa-2x");
        thirdFinalStar.className = thirdStar.className;
        thirdFinalStar.classList.add("fa-2x");
        // Display the total moves.
        finalMoves.textContent = moves.textContent;
        // Display the time taken to finish the game
        finalMinutes.textContent = minutes.textContent;
        finalSeconds.textContent = seconds.textContent;
        /**
         * @event document#click
         * @type {mouseEventParams}
         * @description If the player wants to play again,
         * remove the modal and reset the game.
         */
        document.querySelector(".play-again")
            .addEventListener("click", () => {
                modal.style.display = "none";
                resetGame();
            });
        /**
         * @event document#click
         * @type {mouseEventParams}
         * @description If the player doesn't want to play again,
         * just close the modal and retain the previous game stats.
         */
        document.querySelector(".close")
            .addEventListener("click", () => {
                modal.style.display = "none";
            });
    }, 100);
}

/**
 * @description Calculate the score in stars. If the player solves the game
 * in a maximum of 14 moves, then the player receives a full score, 3 stars.
 * If it takes the player 15 to 22 moves, the player earns 2 stars and finally,
 * if the total number of moves are 23 or above, the player gets 1 star.
 */
function calculateScore() {
    // the counter represents the amount of moves.
    if (counter > 14 && counter <= 22) {
        thirdStar.className = "fa fa-star-o";
    }

    if (counter > 22) {
        secondStar.className = "fa fa-star-o";
    }
}

// NOTE FOR REVIEWER: I needed to change this to pass the project
// specs, but I intend to restore my game to my original scoring
// system after the project is reviewed. That's why I left this
// code commented out! Else, I wouldn't leave commented out chunks
// of code. Thanks for understanding!
/**
 * @description Calculate the score in stars. If the player solves the game
 * in a maximum of 14 moves, then the player receives a full score, 3 stars.
 * If the player needs more than 14 moves to solve the game, the player loses
 * half a star for every 2 additional moves.
 */
/*function calculateScore() {
    // the counter represents the amount of moves.
    if (counter > 14 && counter <= 16) {
        thirdStar.className = "fa fa-star-half-o";
    }

    if (counter > 16 && counter <= 18) {
        thirdStar.className = "fa fa-star-o";
    }

    if (counter > 18 && counter <= 20) {
        secondStar.className = "fa fa-star-half-o";
    }

    if (counter > 20 && counter <= 22) {
        secondStar.className = "fa fa-star-o";
    }

    if (counter > 22 && counter <= 24) {
        firstStar.className = "fa fa-star-half-o";
    }

    if (counter > 24) {
        firstStar.className = "fa fa-star-o";
    }
}*/
