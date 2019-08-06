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
let score, gamePattern, userPattern;

/*----- cached element references -----*/



/*----- event listeners -----*/
yellow.buttonLocation.addEventListener('click', addUserPattern);
blue.buttonLocation.addEventListener('click', addUserPattern);
red.buttonLocation.addEventListener('click', addUserPattern);
green.buttonLocation.addEventListener('click', addUserPattern);


/*----- functions -----*/
init();

//inirializes game/user Pattern to empty arrays
function init (){
  gamePattern= [];
  userPattern = [];
};

//!!!!!!!!!!!!!!!!!!Writing currently to light up buttons for computer turn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
function computerTurn() {
  addGamePattern();
  gamePattern.forEach(function (colorObject, i) {
      setTimeout(function (i) {
        colorObject.buttonLocation.id += "-running";
        setTimeout(function(){
          colorObject.buttonLocation.id = `${colorObject.colorName}-button`;
        }, 1500);
      }, i * 1500);
  });
}

//

//Adds random color to gamePattern array
function addGamePattern() {
  //Pushes random color into game Pattern
  gamePattern.push(getRandomColor());
}

//Gets random color and returns color object
function getRandomColor() {
  //get random number 0-3 
  //will correlate to colors in colors array
  let colorIndex = Math.floor(Math.random() * Math.floor(4));
  //return the color object 
  return colors[colorIndex];
}

//Adds clicked color to userPattern
function addUserPattern(evt){
  //exit out of click event if user has already made number of guesses in gameArray
  if(userPattern.length > gamePattern.length){return;}
  //finds object that triggered click event
  let clickedColor = evt.target;
  //checks to see what color the clicked button was and adds that color to userPattern
  if(clickedColor.id === 'yellow-button'){userPattern.push(colors[0])}
  if(clickedColor.id === 'blue-button'){userPattern.push(colors[1])}
  if(clickedColor.id === 'red-button'){userPattern.push(colors[2])}
  if(clickedColor.id === 'green-button'){userPattern.push(colors[3])}
}



