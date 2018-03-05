/*
 * Create a list that holds all of your cards
 */
let cards = ["diamond", "paper-plane-o", "anchor", "bolt",
			 "cube", "anchor", "leaf", "bicycle",
			 "diamond", "bomb", "leaf", "bomb",
			 "bolt", "bicycle","paper-plane-o", "cube"];

/**
 * Select all HTML elements holding the card classes
 */
const table = document.querySelector(".deck");
let list = table.querySelectorAll("i");

/**
 * Move counter selector and counter
 */
const moves = document.querySelector(".moves");
let counter = 0;

/**
 * List of open cards
 */
 let openCards = [];

/**
 * count the matches
 */
 let matches = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);

cards.forEach(function(card, i) {
	list[i].className = `fa fa-${card}`;
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function 
 *    that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in 
 *    another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this 
 *      functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the 
 *      card's symbol (put this functionality in another function that you call 
 *      from this one)
 *    + increment the move counter and display it on the page (put this 
 *      functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put 
 *      this functionality in another function that you call from this one)
 */

table.addEventListener("click", function(event) {
	if (event.target.matches("li")) {
		displayCard(event.target);
		addToOpenCards(event.target);
		if (openCards.length === 2) {
			if (matchedCards()) {
				lockCards();
				matches += 1;
				if (matches === table.children.length / 2) {
					gameWon();
				}
			} else {
				hideCards();
			}
			openCards = [];
			incrementMoves();
		}
	}
});

function displayCard(card) {
	card.classList.add("open", "show");
}

function addToOpenCards(card) {
	openCards.push(card);
}

function matchedCards() {
	return (openCards[0].querySelector("i").classList.value === 
		openCards[1].querySelector("i").classList.value);
}

function lockCards() {
	openCards.forEach(function(card) {
		card.classList.add("match");
	});
}

function hideCards() {
	openCards.forEach(function(card, index) {
		setTimeout(function() {
			card.classList.remove("open", "show");
		}, 1000);
	});
}

function incrementMoves() {
	counter += 1;
	moves.textContent = counter;
}

function gameWon() {
	console.log("You Won!");
}
