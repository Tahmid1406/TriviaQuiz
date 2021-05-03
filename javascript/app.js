

// variables for quiz question innerHTML setter

const questionNo = document.querySelector('.question-no');
const qText = document.querySelector('.question');


//options fro the question
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

	questionNo.innerHTML = "Question " + (quesCounter + 1);
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
	
	quesCounter++;

}


// get the id of the div that was clicked
function getClicked(clickedElement){
	const id = parseInt(clickedElement.id);

	if (id === currentQues.answer) {
		console.log("correct");
	}else{
		console.log("wrong");
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





window.onload = function(){

	// 1. push all questions to available question
	// 2. set a new question (available, random) to the game area
	
	setAvailableQues();

	setNewRandomQues();

}