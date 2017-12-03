var numItems = 6;
var colors = [];
var pickedColor;
var isWinner = false;

var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.getElementById('play');
var modeButtons = document.querySelectorAll('.mode');
var squares = document.querySelectorAll(".square");
var rgbColor = document.querySelector("#rgbColor");

init();

function init(){

	modeButtonsLogic();
	squareLogic();
	resetButtonLogic();
	regenerate(numItems);
}


function modeButtonsLogic(){
	//easy-hard mode buttons
	modeButtons.forEach(function(button){
		//listen for a click
		button.addEventListener("click", function(){
			//if  a button is clicked
			modeButtons.forEach(function(button){
				//remove selected class from all buttons
				button.classList.remove('selected');
			})
			//add it to the button that was actually clicked
			this.classList.add('selected');
			//if easy mode change num items to 3
			this.textContent === 'Easy' ? numItems = 3: numItems = 6;
			regenerate(numItems);
		})
	})
}

function squareLogic(){
	//color squares logic
	for(var i=0; i<squares.length; i++){
		//add click listeners
		squares[i].addEventListener("click", function(){
			//if this square is the winning square
			if(IsWinner(this)){
				winner();
			}else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try again';
			}
		});
	}
}

function resetButtonLogic(){
	//new colors-play again button
	resetButton.addEventListener("click", function(){
		regenerate(numItems);
	})
}

//reset board to initial starting position based on easy or hard mode
function regenerate(num){
	//generate all new colors
	colors = generateRandomColors(num);
	//pick a new random color from array
	pickedColor = pickColor();

	for(var i=0; i<squares.length; i++){
		//change colors of all squares, if it is easy mode, hide the bottom three
		if(i<colors.length){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = 'block';
		}else{
			squares[i].style.display = 'none';
		}
	}

	//update text content
	isWinner = false;
	defaultText();
}

//reset text to default
function defaultText(){
	h1.style.backgroundColor = 'steelblue';
	messageDisplay.textContent = "Click a square!";
	resetButton.textContent = 'New Colors';
	rgbColor.textContent = pickedColor;
}

//check if the square is a winning square
function IsWinner(square){
	if(square.style.backgroundColor === pickedColor){
		isWinner = true;
	}
	return isWinner;
}

//update to winner text
function winner(){

	for(var i=0; i<colors.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}

	h1.style.backgroundColor = pickedColor;
	messageDisplay.textContent = 'Correct';
	resetButton.textContent = 'Play again?';
}

//pick a random color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//add num random colors to array
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return the array
	return arr;
}

function randomColor(){
	//pick three number 0 to 255
	return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}