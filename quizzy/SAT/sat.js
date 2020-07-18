const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "ESLint"
      },
      correctAnswer: "c"
    },
     {
      question: "Weaving the web is written by...",
      answers: {
        a: "Tim Burners Lee",
        b: "J.M. Coetzee",
        c: "Shakunthala Devi"
      },
      correctAnswer: "a"
    },
    {
      question: "Who invented JAVA?",
      answers: {
        a: "James T. Rosell",
        b: "James A. Gosling",
        c: "Sheryl Sandberg"
      },
      correctAnswer: "b"
    },
  ];


  
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz(){
    // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label class="container">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
            <span class='checkmark'></span>
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainer.style.color = 'rgb(68, 226, 68)';

    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainer.style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `<h3 class="result_container"> You scored  ${numCorrect} out of ${myQuestions.length}</h3>`;
}

// display quiz right away
buildQuiz();


// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

// Show the first slide
showSlide(currentSlide);

//make the navigation buttons work
function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// on submit, show results
submitButton.addEventListener('click', showResults);


// countdown before quiz starts
var timeleft = 5;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.querySelector(".countdown_active").classList.add('countdown_display');
    document.querySelector(".display_animate").style.display = 'block';
  } else {
    document.getElementById("countdown").innerHTML = timeleft;
  }
  timeleft -= 1;
}, 1000);   

//retire
document.getElementById('retire').addEventListener('click', function(){
  location.replace('../choose.html')
})