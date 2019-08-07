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
let running, score, gamePattern, userPattern, win;

/*----- cached element references -----*/
let scoreValue = document.querySelector('#score-val');
let startButton = document.querySelector('button');

/*----- event listeners -----*/
/*-----------------------------------*/
yellow.buttonLocation.addEventListener('click', playerTurn);
blue.buttonLocation.addEventListener('click', playerTurn);
red.buttonLocation.addEventListener('click', playerTurn);
green.buttonLocation.addEventListener('click', playerTurn);
startButton.addEventListener('click', startReset)

/*----- functions -----*/
/*-----------------------------------*/
init();

//rendering
function render(){
  if(win){score++}
  scoreValue.textContent = score;
}

//inirializes game/user Pattern to empty arrays
function init (){
  gamePattern= [];
  userPattern = [];
  score = 0;
  win = true;
  running = false;
};

//start/reset button 
function startReset(){
  //if game not running, turn on game and computer takes turn
  if (!running){
    init();
    running = true;
    computerTurn();
  }
}

//Function for the computers turn
function computerTurn() {
  //adds one random color to game pattern
  gamePattern.push(getRandomColor());
  //for each color in game pattern, light up corresponding button
  gamePattern.forEach(function (colorObject, i) {
      setTimeout(function (i) {
        colorObject.buttonLocation.id += "-running";
        setTimeout(function(){
          colorObject.buttonLocation.id = `${colorObject.colorName}-button`;
        }, 1000);
      }, i * 1000);
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
  //Adds color clicked to user pattern
  addUserPattern(evt);
  //if userPattern correct render score and computer takes turn
  if (userPattern.length === gamePattern.length) {
    checkWin(userPattern, gamePattern);
    if (!win) {
      console.log('lost');
      return;
    } else {
      render();
      //empties user pattern so they 
      //have to start fresh each turn
      userPattern = [];
      computerTurn();
    }
  }

}
  
//Check for win
function checkWin(userPattern, gamePattern){
  //compare userPattern[] to gamePattern[]
  for(let i = 0; i < userPattern.length; i++){
    if (userPattern[i] !== gamePattern[i]){
      win = false;
      running = false;
    }
  }
}

//Adds clicked color to userPattern
function addUserPattern(evt){
  //exit out of click event if user has already made number of guesses in gameArray
  if(userPattern.length > gamePattern.length){return;}
  //exit out of click event if user has lost
  if(win = false){return;}
  //finds object that triggered click event
  let clickedColor = evt.target;
  //checks to see what color the clicked button was and adds that color to userPattern
  if(clickedColor.id === 'yellow-button'){userPattern.push(colors[0])}
  if(clickedColor.id === 'blue-button'){userPattern.push(colors[1])}
  if(clickedColor.id === 'red-button'){userPattern.push(colors[2])}
  if(clickedColor.id === 'green-button'){userPattern.push(colors[3])}
}



