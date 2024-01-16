
// Get quiz elements from HTML

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// List of quiz questions (an array of 10 quiz objects)

const questions = [
    {
        question: "What is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },

    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct: false},
        ]
    },

    {
        question: "What is the largest desert in the world?",
        answers: [
            { text: "Kalahari Desert", correct: false},
            { text: "Gobi Desert", correct: false},
            { text: "Sahara Desert", correct: false},
            { text: "Antarctic Desert", correct: true},
        ]
    },

    {
        question: "What is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "What is the largest continent in the world?",
        answers: [
            { text: "North America", correct: false},
            { text: "Asia", correct: true},
            { text: "Africa", correct: false},
            { text: "Australia", correct: false},
        ]
    },

    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "River Nile", correct: true},
            { text: "River Amazon", correct: false},
            { text: "River Niger", correct: false},
            { text: "River Benue", correct: false},
        ]
    },

    {
        question: "What is the largest ocean in the world?",
        answers: [
            { text: "Indian Ocean", correct: false},
            { text: "Atlantic Ocean", correct: false},
            { text: "Arctic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ]
    },

    {
        question: "What is the largest island in the world?",
        answers: [
            { text: "New Guinea", correct: false},
            { text: "Greenland", correct: true},
            { text: "Andaman Nicobar", correct: false},
            { text: "Hawaii", correct: false},
        ]
    },

    {
        question: "What is the smallest planet in the solar system?",
        answers: [
            { text: "Mercury", correct: true},
            { text: "Earth", correct: false},
            { text: "Mars", correct: false},
            { text: "Saturn", correct: false},
        ]
    },

    {
        question: "What is the largest land animal in the world?",
        answers: [
            { text: "Tiger", correct: false},
            { text: "African Elephant", correct: true},
            { text: "White Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function showQuestion begins by calling resetState to remove the default display
// Then attaches question number and question text to the question element
// A forEach method is called on the answers array in the currentQuestion object
// This creates a button element for each of the four answers/options, and appends the element to the answerButtons div
// Finally, it adds an event listener to handle when an answer/option has been selected

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        // Links style defined in CSS
        button.classList.add("answer-btn");
        answerButtons.appendChild(button);
        // This line sets the dataset.correct property, which will help verify the correctness of an answer
        if (answer.correct){
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer);
    });
}

// Function resetState resets the quiz by:
// 1. making the next button invisible until an answer has been selected
// 2. removes the placeholder buttons with dummy text from HTML

function resetState (){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// The selectAnswer function starts by getting the button element where the click event occurs and assigns it to the variable selectedBtn
// Then it checks if the dataset.correct property of the button is true and attaches the class 'correct' to it and then proceeds to increment the score
// Otherwise, it attaches the class 'incorrect' to it
// PS: The classes, 'correct' and 'incorrect' have been defined in CSS to highlight the element selected with a green or a red background respectively
// Next, it disables the buttons once a button has been clicked
// Finally it reveals the nextButton element by setting its display property to block

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        // Disables the buttons once an answer has been selected
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// The function showScore first removes the answer button elements from the display by calling resetState
// Then it displays the score and changes the nextButton text to "Restart Quiz" to allow users play again
// It also sets the display property of the next button (now "Restart Quiz") to block. This is because the function resetState gives it a display of none when it is called.

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

// The nextButtonHandler function is defined to handle the click event on the next button
// It begins by incrementing the currentQuestionIndex
// Then it defines a conditional that calls showQuestion if currentQuestionIndex is less than the length of the array 
// Otherwise it calls showScore
// (i.e it shows the next question up to the last one and then if the last one has been displayed, it runs the else block to show score)

function nextButtonHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// This monitors the click event on the nextButton and calls nextButtonHandler to display the next question or score, as the case may be
// However, if the score has been displayed, it restarts the Quiz by calling startQuiz when the nextButton (now "Restart Quiz") is clicked
// And then it reloads the page to reset the app to its default state

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        nextButtonHandler();   
    } else {
        startQuiz();
        document.location.reload(true);
    }
});


// Timer Functionality

const count = document.getElementById("countdownTimer");

let startTiming = 1;
let time = startTiming * 60;

// Calls the updateTimer function every 1 second
let timerHandler = setInterval(updateTimer, 1000);

function updateTimer() {
    const minutes = Math.floor(time/60);

    // Note: apart from 60 % 60 which evaluates to 0, time % 60 will evaluate to time
    let seconds = time % 60;

    // Handles the format of the seconds display by adding a 0 in front of values less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;

    count.innerHTML = `${minutes}:${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(timerHandler);
        count.innerHTML = `Time Up!`;
        showScore();
        // This line below triggers the else block in the click event listener function defined above, which calls startQuiz and reloads the page
        currentQuestionIndex = questions.length;
    }
};

// Final function call to run the app

startQuiz();