"use strict";
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// for selecting random questions
let shuffledQuestions, currentQuestionIndex;
let yourScore = 0;

// whenever start button is 'clicked' execute 'startGame'.
startButton.addEventListener("click", startGame);
// when NEXT button is 'clicked'
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// function to start the game
function startGame() {
  // start button got hidden
  startButton.classList.add("hide");
  //shuffledQuestions will come from questions array sorted randomly
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  //as we are starting from very first question
  currentQuestionIndex = 0;
  //question box got appeared
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}
// function to set the next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// function to show questions
function showQuestion(question) {
  // setting question from questions array's question object chosen at random from shuffledQuestions
  questionElement.innerText = question.question;
  //setting answers in the answer buttons by option object present in answer array of question object in questions array
  //question is parameter and answers is property of question object
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    //correct is property of every answer element
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// To reset the previous states
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  //to check if previously answer grid have options and to remove them
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
// function to select the answers
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  // answerButtonsElement is not an array so is needs to coverted in array
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

// function to set status correct or wrong of answer elements
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// function to clear correct and wrong class
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// question is Array of question object
const questions = [
  {
    question:
      "In the 2012 movie, The Avengers features Captain America. What is his real name?",
    // answer is array of options object
    answers: [
      { text: "Buck Rogers", correct: false },
      { text: "Ted Rogers", correct: false },
      { text: "Steve Rogers", correct: true },
      { text: "Tony Stark", correct: false },
    ],
  },
  {
    question: "Who is the leader of S.H.I.E.L.D?",
    // answer is array of options object
    answers: [
      { text: "Nick Fury", correct: true },
      { text: "Tony Stark", correct: false },
      { text: "Bruce Banner", correct: false },
      { text: "Diana Prince", correct: false },
    ],
  },
  {
    question: "Which Superhero does Bruce Banner transform into?",
    // answer is array of options object
    answers: [
      { text: "Iron Man", correct: false },
      { text: "Hawkeye", correct: false },
      { text: "Thor", correct: false },
      { text: "The Hulk", correct: true },
    ],
  },
  {
    question: "Who is Loki's adoptive brother ",
    // answer is array of options object
    answers: [
      { text: "Thor", correct: true },
      { text: "Iron Man", correct: false },
      { text: "Peter Parker", correct: false },
      { text: "Bruce Banner", correct: false },
    ],
  },
  {
    question: "Which US city do the Avengers Battle the Chitauri?",
    // answer is array of options object
    answers: [
      { text: "Washington, DC", correct: false },
      { text: "Los Angeles", correct: false },
      { text: "New York City", correct: true },
      { text: "Miami", correct: false },
    ],
  },
  {
    question: "What weapon does Thor carry?",
    // answer is array of options object
    answers: [
      { text: "A Hammer", correct: true },
      { text: "A Sword", correct: false },
      { text: "A Gun", correct: false },
      { text: "A Bow and Arrow", correct: false },
    ],
  },
  {
    question: "What is Clint Barton's SuperHero name?",
    // answer is array of options object
    answers: [
      { text: "Black Panther", correct: false },
      { text: "Hawkeye", correct: true },
      { text: "Iron Man", correct: false },
      { text: "Thor", correct: false },
    ],
  },
];
