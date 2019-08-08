/*------------ constants ------------*/
/*-----------------------------------*/

//class to hold color name and button location
class Color {
  constructor(colorName, buttonLocation){
    this.colorName = colorName;
    this.buttonLocation = buttonLocation;
  }
}
//instantiations of each color as a Color class
const yellow = new Color('yellow', document.querySelector('#yellow-button'));
const blue = new Color('blue', document.querySelector('#blue-button'));
const red = new Color('red', document.querySelector('#red-button'));
const green = new Color('green', document.querySelector('#green-button'));
//Array to hold color objects.
const colors = [yellow, blue, red, green];

/*----- app's state (variables) -----*/
/*-----------------------------------*/
let running, score, gamePattern, userPattern, winning;

/*----- cached element references -----*/
let scoreValue = document.querySelector('#score-val');
let startButton = document.querySelector('button');
let title = document.querySelector('h1');

/*----- event listeners -----*/
/*-----------------------------------*/
yellow.buttonLocation.addEventListener('click', playerTurn);
blue.buttonLocation.addEventListener('click', playerTurn);
red.buttonLocation.addEventListener('click', playerTurn);
green.buttonLocation.addEventListener('click', playerTurn);
startButton.addEventListener('click', startReset);

/*----- functions -----*/
/*-----------------------------------*/
init();

//rendering
function render(){
  if (winning) {
    title.textContent = "Play Simon";
    title.style.color = "black";
  } else {
    title.textContent = "You Lost!";
    title.style.color = 'red';
  }
  scoreValue.textContent = score;
}

//inirializes game/user Pattern to empty arrays
function init (){
  gamePattern= [];
  userPattern = [];
  score = 0;
  winning = true;
  render();
};

//start/reset button 
function startReset(){
  init();
  computerTurn();
}

//Function for the computers turn
function computerTurn() {
  //adds one random color to game pattern
  gamePattern.push(getRandomColor());
  //for each color in game pattern, light up corresponding button
  gamePattern.forEach(function (colorObject, i) {
      setTimeout(function (i) {
        colorObject.buttonLocation.classList.add('running');
        setTimeout(function(){
          colorObject.buttonLocation.classList.remove('running'); 
        }, 1000);
      }, i * 1200);
  });
}

//Gets random color and returns color object
function getRandomColor() {
  //get random number 0-3 
  //will correlate to colors in colors array
  let colorIndex = Math.floor(Math.random() * Math.floor(4));
  //return the color object 
  return colors[colorIndex];
}

//Players Turn
function playerTurn(evt) {
  //If game hasn't started, don't let player take turn
  if(gamePattern.length === 0){return}
  //Adds color clicked to user pattern
  addUserPattern(evt);
  //if userPattern correct then render score and computer takes turn
  checkWin(userPattern, gamePattern);
  if (winning && (userPattern.length === gamePattern.length)) {
    score++;
    render();
    userPattern = [];
    //waits a second 
    setTimeout(computerTurn, 1000);
  } else {
    render();
  }
}
//Check for win
function checkWin(userPattern, gamePattern) {
  console.log(userPattern.map(debugColor), gamePattern.map(debugColor));
    //compare userPattern[] to gamePattern[]
    for (let i = 0; i < userPattern.length; i++) {
      if (userPattern[i] !== gamePattern[i]) {winning = false;}
    }
  }

//Adds clicked color to userPattern
function addUserPattern(evt){
  //exit out of click event if user has already made number of guesses in gameArray
  if(userPattern.length > gamePattern.length){return;}
  //exit out of click event if user has lost
  if(!winning){return;}
  //finds object that triggered click event
  let clickedColor = evt.target;
  //checks to see what color the clicked button was and adds that color to userPattern
  if(clickedColor.id === 'yellow-button'){userPattern.push(colors[0])}
  if(clickedColor.id === 'blue-button'){userPattern.push(colors[1])}
  if(clickedColor.id === 'red-button'){userPattern.push(colors[2])}
  if(clickedColor.id === 'green-button'){userPattern.push(colors[3])}
}

function debugColor(color) {
  return color.colorName
}

