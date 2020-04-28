// GET ELEMENT FROM ID SECTION

// start button
const startBtn = document.getElementById('start-btn');
// question container
const questionElement = document.getElementById('question');
// question container
const questionContainer = document.getElementById('question-container');
// answer buttons
const solutionButtonsElement = document.getElementById('solution-buttons');
//next question button
const nextQuestionBtn = document.getElementById('next-btn');

//Array of Questions
const questions = [
	{
		question : 'In Dota 2, Wraith King was previously known as...',
		answers  : [
			{ text: 'Reaper King', correct: false },
			{ text: 'Skeleton King', correct: true },
			{ text: 'Skull King"', correct: false },
			{ text: 'Hell King', correct: false }
		]
	},
	{
		question : 'What Nationality is D.Va from Overwatch?!!',
		answers  : [
			{ text: 'Korenan', correct: true },
			{ text: 'Japanese', correct: false },
			{ text: 'Chinese', correct: false },
			{ text: 'Vietnamese', correct: false }
		]
	},
	{
		question : 'Which of these weapon classes DO NOT appear in the first Monster Hunter game?',
		answers  : [
			{ text: 'Hammer', correct: false },
			{ text: 'Bow', correct: true },
			{ text: 'Heavy Bowgun', correct: false },
			{ text: 'Light Bowgun', correct: false }
		]
	},
	{
		question : 'What is the oldest team in the NFL?',
		answers  : [
			{ text: 'New York Giants', correct: false },
			{ text: 'Green Bay Packers', correct: false },
			{ text: 'Chicago Bears', correct: false },
			{ text: 'Arizona Cardinals', correct: true }
		]
	},
	{
		question : 'At the end of the 2001 film "Rat Race", whose concert do the contestants crash?',
		answers  : [
			{ text: 'Sum 41', correct: false },
			{ text: 'Linkin Park', correct: false },
			{ text: 'Smash Mouth', correct: true },
			{ text: 'Bowling for Soup', correct: false }
		]
	},
	{
		question : 'What type of musick does the band "Parkway Drive" play',
		answers  : [
			{ text: 'Punk', correct: false },
			{ text: 'Hip Hop', correct: false },
			{ text: 'Metalcore', correct: true },
			{ text: 'Speed Metal', correct: false }
		]
	},
	{
		question : 'Which classical composer wrote the "Moonlight Sonata"?',
		answers  : [
			{ text: 'Ludvig Van Beethoven', correct: true },
			{ text: 'Chief Keef', correct: false },
			{ text: 'Wolfgang Amadeus Mozart', correct: false },
			{ text: 'Johannes Brahms', correct: false }
		]
	},
	{
		question : 'Who was the all time Nr. 10 for Juventus FC',
		answers  : [
			{ text: 'Del Piero', correct: true },
			{ text: 'Platini', correct: false },
			{ text: 'Dybala', correct: false },
			{ text: 'Pogba', correct: false }
		]
	},
	{
		question : 'which Legend in "Apex Legends" can create "Portals"',
		answers  : [
			{ text: 'Pathfinder', correct: false },
			{ text: 'Caustic', correct: false },
			{ text: 'Wraith', correct: true },
			{ text: 'Revenant', correct: false }
		]
	},
	{
		question : 'What game had recently gone "Crosssave"?',
		answers  : [
			{ text: 'WOW', correct: false },
			{ text: 'COD', correct: false },
			{ text: 'Counter Strike', correct: false },
			{ text: 'Destiny', correct: true }
		]
	}
];

const lastQuestion = questions.length - 1;

//shuffling question to display
let shuffledQuestion, currentQuestionIndex;

//Start game event listener
startBtn.addEventListener('click', startGame);
//Next Question event listener
nextQuestionBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	nextQuestion();
});

//main game function
function startGame() {
	//hide btn from layout
	startBtn.classList.add('hide');
	//shuffled question variable
	shuffledQuestion = questions.sort(() => Math.random() - 0.5);
	//start from first question in array
	currentQuestionIndex = 0;
	//show question container
	questionContainer.classList.remove('hide');
	//function for next question
	nextQuestion();

	//not resetting :(
	renderProgress();
}

// render progress
function renderProgress() {
	for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
		progress.innerHTML += "<div class='prog' id=" + qIndex + '></div>';
	}
}

// shuffle function
function nextQuestion() {
	//Invokes reset of form untill question is answered
	resetForm();
	//Invokes shuffles question
	showQuestion(shuffledQuestion[currentQuestionIndex]);
}

//resets html form back to default when new question is created
function resetForm() {
	//Reset body to hue-neutral till next qestion in answered
	clearStatusClass(document.body);
	nextQuestionBtn.classList.add('hide');
	while (solutionButtonsElement.firstChild) {
		solutionButtonsElement.removeChild(solutionButtonsElement.firstChild);
	}
}

//shows shuffled question + populates possible answers
function showQuestion(question) {
	questionElement.innerText = question.question;
	//loop through answers and populate the button grid
	question.answers.forEach((answer) => {
		// create button element
		const button = document.createElement('button');
		// populate butto in element with answers from array
		button.innerText = answer.text;
		//add class from index.html
		button.classList.add('btn');
		//loop to find correct answer
		if (answer.correct) {
			//add data atribute to correct answer
			button.dataset.correct = answer.correct;
		}
		//add event for whenever btn is clicked
		button.addEventListener('click', selectAnswer);
		solutionButtonsElement.appendChild(button);
	});
}

//selects answer on btn grid
function selectAnswer(e) {
	//variable for any button clicked
	const selectButton = e.target;
	//variable checking if correct answer
	const correct = selectButton.dataset.correct;

	setStatusClass(document.body, correct);
	Array.from(solutionButtonsElement.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	//check if we have more questions
	if (shuffledQuestion.length > currentQuestionIndex + 1) {
		nextQuestionBtn.classList.remove('hide');
	} else {
		startBtn.innerText = 'Restart';
		startBtn.classList.remove('hide');
	}
}

//add status of wrong or correct to button clicked
function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

//removes status from buttons clicked
function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}
