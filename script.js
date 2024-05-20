
let userName;

// Add an event listener
const userNameInput = document.getElementById('user-name');
userNameInput.addEventListener('keypress', function(event) {
    // Check if the Enter pressed (key code 13)
    if (event.keyCode === 13) {
        
        event.preventDefault();
       
        userName = userNameInput.value;
       
        initializeQuiz(userName);
        // Clear  input field
        userNameInput.value = '';
        // Hide  form
        nameForm.style.display = 'none';
    }
});

// Add an event listener 
const nameForm = document.getElementById('name-form');
nameForm.addEventListener('submit', function(event) {
   
    event.preventDefault();
  
    userName = userNameInput.value;
   
    initializeQuiz(userName);
   
    userNameInput.value = '';
    
    nameForm.style.display = 'none';
});


function initializeQuiz(userName) {
    
}




// QUESTIONS

const questions = [
  {
    "question": "What is your favorite time of day?",
    "answer1": "Dawn",
    "answer1Total": "1",
   
    // add extra thing into here if time...then do an onclick event

    "answer2": "Morning",
    "answer2Total": "2",
    "answer3": "Afternoon",
    "answer3Total": "3",
    "answer4": "Night",
    "answer4Total": "4"
  },
  {
    "question": "What is your love langauge?",
    "answer1": "Physical Touch",
    "answer1Total": "1",
    "answer2": "Acts of Service",
    "answer2Total": "2",
    "answer3": "Words of Affirmation",
    "answer3Total": "3",
     "answer4": "Quality time",
    "answer4Total": "4"
   
    
  },
  {
    "question":
      "What is your favorite seaon?",
    "answer1": "Spring",
    "answer1Total": "1",
    "answer2": "Fall",
    "answer2Total": "2",
    "answer3": "Winter",
    "answer3Total": "3",
    "answer4": "Summer",
    "answer4Total": "4"

  },
  {
    "question": "What is your Zodiac sign?",
    "answer1": "Earth(Taurus,Capricorn,Virgo",
    "answer1Total": "1",
    "answer2": "Water(Cancer,Scorpio,Pisces)",
    "answer2Total": "2",
    "answer3":
      "Air(Aquarius,Libra,Gemini)",
    "answer3Total": "3",
    "answer4": "Fire(Aries,Leo,Sagittarius)",
  "answer4Total": "4"
    
  },
  {
    "question": "What's your favorite type of weather?",
    "answer1": "Cloudy",
    "answer1Total": "1",
    "answer2": "Rainy",
    "answer2Total": "2",
    "answer3": "Snowing",
    "answer3Total": "3",
    "answer4": "Sunny",
    "answer4Total": "4"
  },

]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

// question 
function generateQuestions (index) {
    //index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;

    //html elements
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);

    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`

}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    

    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
  
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

  
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);



    //
    currentQuestion++;


        selectedOption.checked = false;

    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Hi ${userName}! Your score is: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p> see below for results:</p>
            <p><b> 1-5 Get Active! <em> Go for a run! do some Yoga! Have a dance party! </em></b>  <br> Just get your blood flowing.</p>
            <p ><b> 6-8  <em> Cook a meal or bake a sweet treat! </em> </b> <br> Cookies,cupcakes,bread and more. YUM!</p>
            <p> <b> 9-12 <em> Read, read read! </b> </em> <br> A book, a magazine, a traveling brochure. Curl up and let out your inner intellectual. </p>
            <p> <b> 13-16  <em> Watch a movie! </em> </b> <br> Get lost that magical feeling when the lights start to dim. </p>
            <p> <b> 16-20  <em>  Go out on the town! </em> </b> <br> Party party party! </p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//previous question
function loadPreviousQuestion() {
    // quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

// reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}






generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
