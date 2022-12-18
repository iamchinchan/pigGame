'use strict';

let playerActice = 0;
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player = document.querySelectorAll('.player');
const name = document.querySelectorAll('.name');
const score = document.querySelectorAll('.score');
const currentScore = document.querySelectorAll('.current-score');

const generateDiceNumber = function () {
  return Number(Math.trunc(Math.random() * 6) + 1);
};

let currentScoreVal = 0;

//to toggle playerActive state
const togglePlayerActive = function () {
  if (playerActice) playerActice = 0;
  else playerActice = 1;
};
//function to dtop further playing of game:
const stopGame = function () {
  btnRoll.setAttribute('disabled', '');
  btnHold.setAttribute('disabled', '');
};
//when a player wins
const playerWins = function () {
  player[playerActice].classList.remove('player--active');
  player[playerActice].classList.add('player--winner');
  dice.classList.remove('showDice');
  // console.log(`player number ${playerActice + 1} wins`);
  //stop game
  stopGame();
};

//switch player
const switchPlayer = function () {
  player[playerActice].classList.remove('player--active');
  togglePlayerActive();
  player[playerActice].classList.add('player--active');
  // console.log(`switching to player ${playerActice + 1}`);
};

//when a person rolls a dice
const rollDice = function () {
  const generatedDiceVal = generateDiceNumber();
  dice.classList.add('showDice');
  dice.setAttribute('src', `dice-${generatedDiceVal}.png`);
  if (generatedDiceVal === 1) {
    currentScoreVal = 0;
    currentScore[playerActice].textContent = currentScoreVal;
    switchPlayer();
  } else {
    currentScoreVal += generatedDiceVal;
    currentScore[playerActice].textContent = currentScoreVal;
  }
};

//when a person tries to hold the score
const holdScore = function () {
  if (currentScoreVal) {
    score[playerActice].textContent =
      Number(score[playerActice].textContent) + currentScoreVal;
    currentScoreVal = 0;
    currentScore[playerActice].textContent = currentScoreVal;
    if (Number(score[playerActice].textContent) >= 20) {
      playerWins();
    } else {
      switchPlayer();
    }
  } else {
    alert('You have not rolled a dice yet, not even once!!');
  }
};
const newGame = function () {
  btnRoll.removeAttribute('disabled', '');
  btnHold.removeAttribute('disabled', '');
  // console.log('new game has started! play again yipee!');
  playerActice = 0;
  currentScore.forEach(score => {
    score.textContent = 0;
  });
  score.forEach(playerScore => {
    playerScore.textContent = 0;
  });
  dice.classList.remove('showDice');
  player.forEach(p => {
    if (p.classList.contains('player--winner')) {
      p.classList.remove('player--winner');
      // break; // causing error
    }
  });
  // if (player[1].classList.contains('player--active')) {
  player[1].classList.remove('player--active'); //will auto check no error
  // }
  player[0].classList.add('player--active');
};
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
