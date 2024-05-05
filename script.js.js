'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const current0 = document.getElementById('current--0');
// another way to select id
const score1El = document.getElementById('score--1');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//stating conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    //we can also toggle the list without using the add and remove
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

let scores = [0, 0];
let activePlayer = 0;
//current score
let currentScore = 0;
//rolling the dice
let playing = true;

btnRoll.addEventListener('click', function () {
    //Generate a random dice roll
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        //with this we are changing the image according to random number generated
        diceEl.src = `dice-${dice}.png`;

        //check if rolled dice is 1
        if (dice !== 1) {
            //adding the dice 
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0.textContent = currentScore;// change later 
        }
        else {
            //switch to next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {

    if (playing) {
        //add current score to the active player score
        scores[activePlayer] = scores[activePlayer] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if score is >= 100 //finish the game
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            //switch to next player
            switchPlayer();
        }
    }

})

bntNew.addEventListener('click', function () {

    //removing the winner color
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    //making both scores as 0
    scores = [0, 0];
    //rolling the dice will add up from zero
    currentScore = 0;
    //making the playing true if the game is won 
    playing = true;
    //making player-0 as active
    activePlayer = 0;
    //making the dice image hidden
    diceEl.classList.add('hidden');
    //giving back the control to player 1
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current1.textContent = 0;
    current0.textContent = 0;
})