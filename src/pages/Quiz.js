import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import QuizBody from '../components/QuizBody';
import QuizTab from '../components/QuizTab';


function Quiz() {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const renderQuiz = () => showQuiz ? <QuizContent /> : null;

  return (
    <div>
      {!showQuiz && (
        <div className="text-center">
          <div className="mt-40">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Test your Knowledge</h1>
            <p className="text-gray-600 mb-4">Click the button to start a quiz on the countries of the world!</p>
            <button className="py-2 px-4 bg-pink-400 text-white rounded hover:bg-pink-600" onClick={startQuiz}>
              Begin
            </button>
          </div>
        </div>
      )}
      {renderQuiz()}
    </div>
  );
}


const QuizContent = () => {

const quizzes = 
[  
  [ 
    { question: 'What language do Angolans speak?', options: ['French', 'Portuguese', 'English'], answer: 'Portuguese' },
    { question: 'What is the largest continent?', options: ['Asia', 'Africa', 'Europe'], answer: 'Asia' },
    { question: 'What is the currency of Japan?', options: ['Yen', 'Euro', 'Dollar'], answer: 'Yen' },
  ],

  [ 
    { question: 'How many people live in India?', options: ['1,380,004,385', '1,370,004,385', '2'], answer: '1,380,004,385' },
    { question: 'Which Coutry is Independant?', options: ['Réunion', 'Ireland', 'French Polynesia'], answer: 'Ireland' },
    { question: 'What is the capital of Canada?', options: ['Montreal', 'Toronto', 'Ottawa'], answer: 'Ottawa' },
  ],

  [ 
    { question: 'What is the currency of Russia?', options: ['Ruble', 'Dollar', 'Pound'], answer: 'Ruble' },
    { question: 'In which continent is Christmas Island located?', options: ['Europe', 'Oceania', 'Afriaca'], answer: 'Oceania' },
    { question: 'What is the capital of China?', options: ['Beijing', 'Shanghai', 'Hong Kong'], answer: 'Beijing' },
  ]

];

const [quiz, setQuiz] = useState(1);
const [questions, setQuestions] = useState(quizzes[0]);
const [score, setScore] = useState(0);
const [selectedOptions, setSelectedOptions] = useState([]);
const [submitPressed, setSubmitPressed] = useState(false); 
const [allCorrect, setAllCorrect] = useState(false);
const [unlockedQuizzes, setUnlockedQuizzes] = useState([1]); 
const [showScore, setShowScore] = useState(false);


const handleQuizClick = (quizNumber) => {
    if (unlockedQuizzes.includes(quizNumber)) { 
      setQuiz(quizNumber);
      setQuestions(quizzes[quizNumber-1]);
      setSelectedOptions([]);
      setSubmitPressed(false);
      setScore([0]);
    }
  };
  

const handleOptionChange = (questionIndex, optionValue) => {
  setSelectedOptions((prevSelectedOptions) => {
    const updatedOptions = [...prevSelectedOptions];
    updatedOptions[questionIndex] = optionValue;
    return updatedOptions;
  });
};


const handleSubmit = (event) => {
    event.preventDefault();
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.answer === selectedOptions[index]) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowScore(true);
    setSubmitPressed(true);
  
    if (newScore === questions.length) { // All questions are answered correctly
        setAllCorrect(true);
        if (!unlockedQuizzes.includes(quiz+1)) { // Unlock next quiz
          setUnlockedQuizzes([...unlockedQuizzes, quiz+1]);
        }
      } else { // Not all questions are answered correctly
        setAllCorrect(false);
      }
  };

  useEffect(() => {
    if (showScore) {
      // Hide the score after 3 seconds
      const timer = setTimeout(() => {
        setShowScore(false);
      }, 2000);

      // Clear the timer if the component unmounts or if showScore is updated
      return () => clearTimeout(timer);
    }
  }, [showScore]);
  

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

  <Tab.Group>

  <Tab.List className="flex space-x-1 mb-4">
  {[1, 2, 3].map((quizNumber) => QuizTab(quizNumber,quiz, unlockedQuizzes, allCorrect, submitPressed, handleQuizClick))}


  </Tab.List>

    <Tab.Panel>
      <QuizBody quizNumber={1} questions={questions} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} handleSubmit={handleSubmit} submitPressed={submitPressed} showScore={showScore} setShowScore={setShowScore} score={score}/>
    </Tab.Panel>
    <Tab.Panel>
      <QuizBody quizNumber={2} questions={questions} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} handleSubmit={handleSubmit} submitPressed={submitPressed} showScore={showScore} setShowScore={setShowScore} score={score}/>
    </Tab.Panel>
    <Tab.Panel>
    <QuizBody quizNumber={3} questions={questions} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} handleSubmit={handleSubmit} submitPressed={submitPressed} showScore={showScore} setShowScore={setShowScore} score={score}/>
    </Tab.Panel>

  </Tab.Group>
</div>
  );

}

export default Quiz;

