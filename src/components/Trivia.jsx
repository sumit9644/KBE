import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assests/Kaun Banega Crorepati - Kbc Intro Sound.mp3";
import correct from "../assests/Kbc Correct Answer .mp3";
import wrong from "../assests/Wrong Answer.mp3";

export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setstop,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    // setstop(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);

    // setstop(() => {
      delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
       
      } else {
        wrongAnswer();
        delay(3000, () => {
          setstop(true);
        });
        setstop(() => {
          setstop(true);
        }, 1000);
      }
    }, 5000);
      }
    //   )
//   }
  ;
  return (
    <div className="Trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}