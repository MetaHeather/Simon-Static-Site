/*------------ constants ------------*/
/*-----------------------------------*/

//class to hold color name and button location
class Color {
  constructor(colorName, buttonLocation, audioLocation){
    this.colorName = colorName;
    this.buttonLocation = document.querySelector(buttonLocation);
    this.audioLocation = audioLocation;
  }
}
//instantiations of each color as a Color class
const yellow = new Color('yellow', '#yellow-button','audio/yellow.mp3');
const blue = new Color('blue', '#blue-button','audio/blue.mp3');
const red = new Color('red', '#red-button','audio/red.mp3');
const green = new Color('green', '#green-button','audio/green.mp3');
//Array to hold color objects.
const colors = [yellow, blue, red, green];
//Create sound player
const player = new Audio();
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
  setTimeout(computerTurn, 1000);
}

//Function for the computers turn
function computerTurn() {
  //adds one random color to game pattern
  gamePattern.push(getRandomColor());
  //for each color in game pattern, light up corresponding button
  gamePattern.forEach(function (colorObject, i) {
      setTimeout(function (i) {
        colorObject.buttonLocation.classList.add('running');
        //changes player src to color sound and plays
        player.src = colorObject.audioLocation;
        player.play();
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
  //saves colorObject from event target to variable
  let colorObject = getColorFromTarget(evt.target)
  //changes player src to color sound and plays
  player.src = colorObject.audioLocation;
  player.play();
  //adds that color to userPattern
  userPattern.push(colorObject);
  }

//takes in event target and checks to see what id it has, and returns color object
function getColorFromTarget(target){
  if(target.id === 'yellow-button'){return colors[0]}
  if(target.id === 'blue-button'){return colors[1]}
  if(target.id === 'red-button'){return colors[2]}
  if(target.id === 'green-button'){return colors[3]}
}

