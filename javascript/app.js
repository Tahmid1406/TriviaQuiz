

// variables for quiz question innerHTML setter

const questionNo = document.querySelector('.correct-ans');
const qText = document.querySelector('.question');
const startGameSection = document.querySelector('.game-info-area');
const gameArea = document.querySelector('.game-area');
const resultArea = document.querySelector('.results');
const resultAreaText = document.querySelector('.quiz-result-text');

//options for the question
const option = document.querySelector('.option-container');


// variables for counting remaining, already done and current question


let quesCounter = 0;
let currentQues ;
let stillAvailable = [];
let questionList = [];



// random option array for answers
var loop = true;

var random_order_options = [true,true,true,true];

var found_count = 0;
while(loop){
	if(found_count === 4) break;
	var random_option = Math.floor(Math.random() * 4);
	if(random_order_options.indexOf(random_option) == -1){
		random_order_options[found_count] = random_option;
		found_count++;
	}else{
		continue;
	}
}

// console.log(random_order_options)



function setAvailableQues(){
	const qNo = questions.length;

	for(let i=0; i<qNo; i++){
		questionList.push(questions[i]);
		stillAvailable[i] = true;
	}
}

// function uniqueRandom(){
// 	const randomQIndex = Math.abs(Math.floor(Math.random() * 5));
// 	return randomQIndex;

// 	if(stillAvailable[randomQIndex] === 6){
// 		stillAvailable[randomQIndex] = 0;
// 		console.log(randomQIndex);
// 		return randomQIndex;
// 	}else{
// 		uniqueRandom();
// 	}

// }

function setNewRandomQues(){
	// 1. Change the question quesCounter
	// 2. Generate new random ques and update html
	// 3. make the existance of available question index

	option.innerHTML = '';

	questionNo.innerHTML = "Correct Answers : " + (quesCounter);
	var uniqueFinder = true;
	while(uniqueFinder){
		const ind = Math.abs(Math.floor(Math.random() * 5));
		if(stillAvailable[ind] === true){
			currentQues = questionList[ind];
			qText.innerHTML = currentQues.ques;
			stillAvailable[ind] = false;
			uniqueFinder = false;	
			
			console.log(ind+1);
		}
	}

	for(let i=0; i<4; i++){
		const opt = document.createElement("div");
		opt.id = random_order_options[i];
		opt.innerHTML = currentQues.option[random_order_options[i]];
		opt.className = "opt";
		option.appendChild(opt);
		opt.setAttribute("onclick", "getClicked(this)");	
	}

}


// get the id of the div that was clicked
function getClicked(clickedElement){

	const id = parseInt(clickedElement.id);

	if (id === currentQues.answer) {
		quesCounter++;
		console.log("correct");
		clickedElement.classList.add('green');
		//making other options unclickable
		disableOtherOptions();
		setTimeout(function() {
			nextQues();
		}, 1500);
		
	}else{
		
		clickedElement.classList.add('red');
		disableOtherOptions();

		const len = option.children.length;
			for(i=0; i<len; i++){
				if(parseInt(option.children[i].id) === currentQues.answer){
					option.children[i].classList.add('green');
					disableOtherOptions();
					break;
				}
			
			}

		setTimeout(function() {	
			//goint to the result div
			gameArea.classList.add('hide');	

			//showing the result div
			resultArea.classList.remove('hide');
			resultAreaText.innerHTML = "Not BAD!! <br> You Have Correctly Answered " + quesCounter + " Questions !!";

		}, 1500);		

		
		
	}

	
}



//making other options unclickable
function disableOtherOptions(){
	const len = option.children.length;
	for(i=0; i<len; i++){
		option.children[i].classList.add('answering-finished');
	}
}


// for the next button in game area
function nextQues(){
	if(quesCounter === questions.length){
		console.log("Quiz ends");
	}else{
		setNewRandomQues();
	}
}




function startGame(){
	const running = true;
	gameArea.classList.remove('hide');
	startGameSection.classList.add('hide');
	setAvailableQues();
	setNewRandomQues();
	// while(running){
	// 	setNewRandomQues();	
	// }
	
}



function tryAgain() {
	
}

function returnToHome(){

}


window.onload = function(){
	
	gameArea.classList.add('hide');

}





// a test function
function hi(){
	console.log('hi');
}