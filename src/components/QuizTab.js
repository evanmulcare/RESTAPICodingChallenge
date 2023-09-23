import {AiOutlineLock} from 'react-icons/ai'
import { Tab } from '@headlessui/react'


const QuizTab = (quizNumber, quiz, unlockedQuizzes, allCorrect, submitPressed, handleQuizClick) => {
    const isQuizSelected = quiz === quizNumber;
    const isQuizUnlocked = unlockedQuizzes.includes(quizNumber) && (allCorrect || submitPressed);
    const isDisabled = !isQuizUnlocked || (!allCorrect && submitPressed);
    const className = `w-full py-2.5 text-center rounded-md hover:bg-cyan-500 ${
      isQuizSelected ? 'bg-pink-400 text-white' : isQuizUnlocked ? 'bg-cyan-400 text-white cursor-default' : 'bg-gray-800 text-white'
    }`;
  
    return (
      <Tab
        key={quizNumber}
        onClick={() => handleQuizClick(quizNumber)}
        className={className}
        disabled={!isQuizUnlocked || (!allCorrect && submitPressed)}
      >
        {isQuizUnlocked ? `Quiz ${quizNumber}` : (
          <>
            Quiz {quizNumber} <AiOutlineLock className="inline-block ml-1 text-pink-400 cursor-not-allowed" />
          </>
        )}
      </Tab>
    );
  };
  
export default QuizTab