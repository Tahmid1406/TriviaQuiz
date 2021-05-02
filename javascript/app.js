

// random number for question

var question_no = Math.floor(Math.random() * 5);

// random option array for answers
var loop = true;

var random_order = [6,6,6,6];

var found_count = 0;
while(loop){
	if(found_count == 4) break;
	var random_option = Math.floor(Math.random() * 4);
	if(random_order.indexOf(random_option) == -1){
		random_order[found_count] = random_option;
		found_count++;
	}else{
		continue;
	}
}

console.log(random_order)