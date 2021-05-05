

// a test function
function hi(){
	console.log('hi');
}


//window onload function
window.onload = function(){
	
	gameArea.classList.add('hide');

}



// variables for inner HTML manipulations

const questionNo = document.querySelector('.correct-ans');
const qText = document.querySelector('.question');
const startGameSection = document.querySelector('.game-info-area');
const gameArea = document.querySelector('.game-area');
const resultArea = document.querySelector('.results');
const resultAreaText = document.querySelector('.quiz-result-text');


//options for the question
const option = document.querySelector('.option-container');


// correct answer counter
let correctCount = 0;

// variable that tracks the current question
let currentQues ;

//array that stores which questions already appeared
//stopping questions to appear more than once
let stillAvailable = [];


//stores question with original index before randomizing
let questionList = [];





// preparing the question list and availability array before randomizing
function setAvailableQues(){
	const qNo = questions.length;

	for(let i=0; i<qNo; i++){
		questionList.push(questions[i]);
		stillAvailable[i] = true;
	}
}





// ***************** Random option generator ****************//

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




// random question with their option also being random
function setNewRandomQues(){
	// 1. Change the question correctCount
	// 2. Generate new random ques and update html
	// 3. make the existance of available question index

	option.innerHTML = '';

	questionNo.innerHTML = "Correct Answers : " + (correctCount);
	var uniqueFinder = true;
	while(uniqueFinder){
		const ind = Math.abs(Math.floor(Math.random() * 20));
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
// three things can happen
// 1. player answers zero
// 2. player answers between 1 and 19
// 3. player answers all 20 questions
function getClicked(clickedElement){

	const id = parseInt(clickedElement.id);

	if (id === currentQues.answer) {
		correctCount++;
		clickedElement.classList.add('green');
		//making other options unclickable
		disableOtherOptions();
		setTimeout(function() {
			nextQues();
		}, 1100);
		
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


		// if correct ans is zero then different message
		if(correctCount === 0){
	        setTimeout(function() {	
				//goint to the result div
				gameArea.classList.add('hide');	

				//showing the result div
				resultArea.classList.remove('hide');
				resultAreaText.innerHTML = "Sorry!! <br> You Scored A Zero. <br> Please Try Again.";

			}, 1100);					
		}else if(correctCount > 0 && correctCount <20){
				setTimeout(function() {	
				//goint to the result div
				gameArea.classList.add('hide');	

				//showing the result div
				resultArea.classList.remove('hide');
				resultAreaText.innerHTML = "Not BAD!! <br> You Have Correctly Answered " + correctCount + " Questions !!";

		    }, 1100);
		}				
		
	}
	
}




// function gets called only if answer correct
function nextQues(){
	if(correctCount === 20){
	    //goint to the result div
		gameArea.classList.add('hide');	
		//showing the result div
		resultArea.classList.remove('hide');
		resultAreaText.innerHTML = "Congratulations!! <br> You Have Correctly Answered All The Questions";
	}
	else{
		setNewRandomQues();
	}
}





//making other options unclickable after clicking one asnwer
function disableOtherOptions(){
	const len = option.children.length;
	for(i=0; i<len; i++){
		option.children[i].classList.add('answering-finished');
	}
}



// starts the game
function startGame(){
	correctCount = 0;
	gameArea.classList.remove('hide');
	startGameSection.classList.add('hide');
	resultArea.classList.add('hide');
	setAvailableQues();
	setNewRandomQues();

	// while(running){
	// 	setNewRandomQues();	
	// }
	
}



// try again button in results div
function tryAgain() {
	startGame();
}


//return home button in results div
function returnToHome(){
	resultArea.classList.add('hide');
	startGameSection.classList.remove('hide');
}
