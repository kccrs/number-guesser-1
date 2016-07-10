var lastGuess = document.querySelector('.last-guess')
var guessInput = document.querySelector('.number-guess');
var guessButton = document.querySelector('.guess-button');
var rightOrWrong = document.querySelector('.right-or-wrong');
var clearButton = document.querySelector('.clear');
var resetButton = document.querySelector('.reset');
var pickANumber = document.querySelector('.pick-a-number');
var rangeButton = document.querySelector('.range-button');
var storedNumber;

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMinNumber() {
  return parseInt(document.querySelector('.min-range').value);
}

function getMaxNumber() {
  parseInt(document.querySelector('.max-range').value);
}

function updateGuessLimits(min, max) {
  guessInput.setAttribute('min', min);
  guessInput.setAttribute('max', max);
}



rangeButton.addEventListener('click', function(){
  var userMin = getMinNumber();
  var userMax = getMaxNumber();

  updateGuessLimits(userMin, userMax);

  var randomNumber = randomNumberGenerator(userMin, userMax);

  if (userMin !== '' || userMax !== '') {
    resetButton.disabled = false;
    guessButton.disabled = false;
  }

  if (userMin > userMax) {
    guessButton.disabled = true;
    pickANumber.innerText = 'That is not an acceptable range.';
  }
});

guessButton.addEventListener('click', function () {
  var theGuess = parseInt(document.querySelector('.number-guess').value);
  var userMin = parseInt(document.querySelector('.min-range').value);
  var userMax = parseInt(document.querySelector('.max-range').value);
  var minInputBox = document.querySelector('.min-range');
  var maxInputBox = document.querySelector('.max-range');

  lastGuess.innerText = parseInt(guessInput.value, 10);
  pickANumber.innerText = "Your last guess was...";

  if (isNaN(storedNumber)) {
    rightOrWrong.innerText = "You haven't picked a range yet. Please pick a range and try again."
  }
  if (isNaN(theGuess)) {
    rightOrWrong.innerText = "That's not a number. Try again.";
    lastGuess.innerText = "Not a number."
  }

  if (theGuess < userMin || theGuess > userMax) {
    rightOrWrong.innerText = "That number is outside of the acceptable range. Try again."
  }

  if (theGuess < storedNumber) {
  rightOrWrong.innerText = 'Sorry that guess is too low. Pick a higher number.';
  }

  if (theGuess > storedNumber) {
  rightOrWrong.innerText = 'Sorry that guess is too high. Pick a lower number.';
  }

  if (theGuess === storedNumber) {
  guessInput.value = '';
  clearButton.disabled = true;
  rightOrWrong.innerText = 'Now try again, with more numbers to guess from.';
  userMin = userMin - 10;
  userMax = userMax + 10;
  minInputBox.value = userMin;
  maxInputBox.value = userMax;
  pickANumber.innerText = 'Nailed it.'
  randomNumberGenerator(userMin, userMax);
  rangeButton.disabled = true;
  document.querySelector('.min-range').readOnly = true;
  document.querySelector('.max-range').readOnly = true;
  };
});

function changeButtons() {
  changeClearButton();
  changeResetButton();
}


guessInput.addEventListener('change', changeButtons);
guessInput.addEventListener('keyup', changeButtons);

function changeClearButton() {
  clearButton.disabled = guessInput.value === '';
};

clearButton.addEventListener('click', function() {
  guessInput.value = '';
  clearButton.disabled = true;
});

function changeResetButton() {
  var minInput = document.querySelector('.min-range');
  var maxInput = document.querySelector('.max-range');
  if (guessInput.value !== '' || rightOrWrong.innerText !== '') {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
};

resetButton.addEventListener('click', function() {
  var minInput = document.querySelector('.min-range');
  var maxInput = document.querySelector('.max-range');
  minInput.value = '';
  maxInput.value = '';
  lastGuess.innerText = '';
  guessInput.value = '';
  rightOrWrong.innerText = '';
  pickANumber.innerText = 'Pick a minimum and maximum number.'
  randomNumber = Math.floor(Math.random() * 100);
  changeResetButton();
  clearButton.disabled = true;
  rangeButton.disabled = false;
});
