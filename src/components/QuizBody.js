
function QuizBody({ quizNumber, questions, selectedOptions, handleOptionChange, handleSubmit, submitPressed, showScore, setShowScore, score }) {
    return (
      <div className="my-4">
        <h2 className="text-2xl font-bold text-center mb-4">Quiz {quizNumber}</h2>
        <div className="flex justify-end mb-4">
        </div>
  
        <form onSubmit={handleSubmit}>
  
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="my-4 border border-black p-4 rounded-lg">
  
              <h3 className="text-xl font-medium">{question.question}</h3>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mt-2">
                  <input
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    required
                    className="mr-2 hidden"
                    id={`option${questionIndex}-${optionIndex}`}
                    onChange={() => handleOptionChange(questionIndex, option)}
                    checked={selectedOptions[questionIndex] === option}
                  />
  
                  <label
                    htmlFor={`option${questionIndex}-${optionIndex}`}
                    className={`block cursor-pointer py-2 px-4 rounded-md ${
                      submitPressed && selectedOptions[questionIndex] === option
                        ? 'bg-cyan-400 text-white'
                        : submitPressed && selectedOptions[questionIndex] !== question.answer && option === question.answer
                        ? 'bg-pink-400 text-white'
                        : !submitPressed && selectedOptions[questionIndex] === option
                        ? 'bg-cyan-400 text-white'
                        : question.answer === option && selectedOptions[questionIndex] === question.answer
                        ? 'bg-pink-400 text-white'
                        : 'bg-white-400'
                    } hover:bg-cyan-400 hover:text-white`}
                  >
                    {option}
                  </label>
                </div>
              ))}
  
              {submitPressed && (
                <div className="mt-2">
                  <span className="font-medium border bg-gray-800 text-white border-black px-2 py-1 rounded-md mr-2">Your answer:</span>
                  <span className="bg-cyan-400 text-white px-2 py-1 rounded-md">{selectedOptions[questionIndex]}</span>
                  <span className="font-medium border border-black px-2 py-1 rounded-md mx-2">Correct answer:</span>
                  <span className="bg-pink-400 text-white px-2 py-1 rounded-md">{question.answer}</span>
  
                </div>
              )}
  
            </div>
          ))}
  
          <div className="flex justify-center items-center mt-4">
  
            <button type="submit" className="bg-pink-400 text-white rounded-md py-2 px-4 hover:bg-pink-500">
              Submit
            </button>
  
            {showScore && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-medium mb-4">
                    Your score: <span className='italic text-cyan-400'>{score}</span> out of <span className='italic text-pink-400'>{questions.length}</span>
                </h2>
                {quizNumber === 3 ? (
                    <p className="text-xl text-pink-400">Congratulations, you passed all quizzes!</p>
                ) : score == 3 ? (
                    <p className="text-xl text-pink-400">Congratulations, a new quiz has been unlocked!</p>
                ) : (
                    <p className="text-xl text-cyan-400">Try again!</p>
                )}
                <button className="bg-pink-400 text-white py-2 px-4 rounded-md mt-4" onClick={() => setShowScore(false)}>Close</button>
                </div>
            </div>
            )}




        </div>

      </form>
    </div>
    )};


export default QuizBody;