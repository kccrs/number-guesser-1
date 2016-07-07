var lastGuess = document.querySelector('.last-guess')
var guessInput = document.querySelector('.number-guess');
var theGuess = parseInt(guessInput.value);
var guessButton = document.querySelector('.guess-button');
var rightOrWrong = document.querySelector('.right-or-wrong');
var clearButton = document.querySelector('.clear');
var randomNumber = Math.floor(Math.random() * 100);
var resetButton = document.querySelector('.reset');
var pickANumber = document.querySelector('.pick-a-number');
var minRangeInput = document.querySelector('.min-range')
var maxRangeInput = document.querySelector('.max-range')

function changeClearButton() {
  if (guessInput.value === '') {
  clearButton.disabled = true;
} else {
  clearButton.disabled = false;
  }
};

function changeResetButton() {
  if (guessInput.value !== '' || rightOrWrong.innerText !== '') {
    resetButton.disabled = false;
  }
  else {
    resetButton.disabled = true;
  }
};

guessButton.addEventListener('click', function () {

  lastGuess.innerText = parseInt(guessInput.value, 10);
  pickANumber.innerText = 'Your last guess was...';

  if (parseInt(guessInput.value, 10) < randomNumber) {
  rightOrWrong.innerText = 'Sorry that guess is too low. Pick a higher number.';
}
  else if (parseInt(guessInput.value, 10) > randomNumber) {
  rightOrWrong.innerText = 'Sorry that guess is too high. Pick a lower number.';
}
  else {
  rightOrWrong.innerText = 'Nailed it.'
};

  if (parseInt(guessInput.value,10) < 0 || parseInt(guessInput.value,10) > 100) {
    rightOrWrong.innerText = 'That number is not between 1 and 100. Try again.'
  }

});

clearButton.addEventListener('click', function() {
  guessInput.value = '';
  clearButton.disabled = true;
});

guessInput.addEventListener('change', function() {
  changeClearButton();
  changeResetButton();
});

guessInput.addEventListener('keyup', function() {
  changeClearButton();
  changeResetButton();
});

resetButton.addEventListener('click', function() {
  lastGuess.innerText = '';
  guessInput.value = '';
  rightOrWrong.innerText = '';
  pickANumber.innerText = 'Pick a number between 1 and 100.'
  randomNumber = Math.floor(Math.random() * 100);
  changeResetButton();
});
