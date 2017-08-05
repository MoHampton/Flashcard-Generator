var inquirer = require('inquirer');
var basicCard = require('./BasicCard');
var clozeCard = require('./ClozeCard');

//Counters
var count = 0;
var correctCount = 0;

// creates function basic(){} from card.js and assigns it to basic quest
var firstPresident = new basicCard('Who was the first president of the U.S', 'George Washington');
var secondPresident = new basicCard('Who was the second president of the U.S', 'John Adams');
//Holds questions
var basicQuestion = [firstPresident.front , secondPresident.front];
//Holds answers
var basicAnswer = [firstPresident.back , secondPresident.back];

//cloze
var thirdPresident = new clozeCard("Thomas Jefferson was the third president of the U.S" , 'Thomas Jefferson');
var fourthPresident = new clozeCard("James Madison was the forth president of the U.S" , 'James Madison');
//holds questions
var clozeQuestion = [thirdPresident.partial , fourthPresident.partial];
//holds answers
var clozeAnswer = [thirdPresident.cloze , fourthPresident.cloze];

// asks for BASIC or CLOZE flashcards
inquirer.prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'Do you want to play with basic or cloze flashcards ?',
			choices:['Basic', 'Cloze']
		}
	])
	.then(function(answer){
		//chooses basic
		if(answer.choice === 'Basic'){
			basic();
		}
		//chooses cloze
		else if(answer.choice === 'Cloze'){
			cloze();
		}
	})
// asks questions for basic flashCards. Using recursion to repeat
function basic() {
	// iterates through questions
	if(count < basicAnswer.length){
		
		inquirer.prompt([
			{
				type:'input',
				name: 'input',
				message: basicQuestion[count]
			},
		])
		.then(function(answer){
			//checks if users answer was correct
			if(answer.input.toLowerCase() === basicAnswer[count].toLowerCase()){
				correctCount++;
			}
			count++;
			//calls function to continue to the next question 
			basic();
		})
	}
	//dispalys end of game results
	else{
		console.log('You got' ,correctCount, 'Right');
		for(var i = 0; i < clozeAnswer.length; i++){
			console.log('The answers are' , basicAnswer[i]);
		}
	}
}

function cloze() {

	if(count < clozeQuestion.length) {
		inquirer.prompt([
				{
					type:'input',
					name: 'input',
					message: clozeQuestion[count]
				}
		])
		.then(function(answer){
			if(answer.input.toLowerCase() === clozeAnswer[count].toLowerCase()) {
				correctCount++;
			}
				count++
				cloze();
		});

	}
	//displays end game result
	else {
		console.log('You got' ,correctCount, 'Right');
		for(var i = 0; i < clozeAnswer.length; i++){
			console.log('The answers are' , clozeAnswer[i]);
		}
	}
}