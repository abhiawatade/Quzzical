import Menu from "./Menu";
import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Answer from "./components/Answer";
import top from "../assets/top.png";
import bottom from "../assets/bottom.png";

export default function App() {
  const [started, setStarted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [correct, setCorrect] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState({});

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await res.json();
      setQuestions(
        data.results.map((que) => {
          return {
            id: nanoid(),
            question: que.question,
            answers: [...que.incorrect_answers, que.correct_answer],
            correctAns: que.correct_answer,
            seleted: null,
          };
        })
      );
    }
    getQuestions();
  }, []);

  // const handleAnswer = (id, title, idAnswer) => {
  //   questions.map((item) => {
  //     if (item.id === id) {
  //       if (item.correctAns === title) {
  //         setCorrect(correct + 1);
  //         setCount((old) => old + 1);
  //         setDisable(true);
  //       }
  //     }
  //     console.log(title);
  //     console.log(count);
  //     console.log(correct);
  //   });
  // };
  // const handleAnswer = (id, title, idAnswer) => {
  //   const currentQuestion = questions.find((item) => item.id === id);
  //   if (currentQuestion && currentQuestion.correctAns === title) {
  //     setCorrect(correct + 1);
  //     setSelectedAnswer(title);
  //   }

  //   console.log(title);
  //   console.log(correct);
  // };

  // const renderQuestion = questions.map((item) => {
  //   return (
  //     <div key={item.id}>
  //       <h3> {item.question}</h3>
  //       {item.answers.map((option) => {
  //         return (
  //           <Answer
  //             title={option}
  //             id={item.id}
  //             idAnswer={nanoid()}
  //             key={nanoid()}
  //             selectAnswer={handleAnswer}
  //             selected={selectedAnswer === option}
  //           />
  //         );
  //       })}
  //     </div>
  //   );
  // });

  const handleAnswer = (id, title, idAnswer) => {
    const currentQuestion = questions.find((item) => item.id === id);
    if (currentQuestion && currentQuestion.correctAns === title) {
      setCorrect(correct + 1);
    }
    setSelectedAnswer({
      ...selectedAnswer,
      [id]: title,
    });
    console.log(title);
    console.log(correct);
    console.log(selectedAnswer);
  };

  const renderQuestion = questions.map((item) => {
    return (
      <section className="question-container">
        <div className="container" key={item.id}>
          <p className="title"> {item.question}</p>
          <div className="box">
            {item.answers.map((option) => {
              return (
                <Answer
                  title={option}
                  id={item.id}
                  idAnswer={nanoid()}
                  key={nanoid()}
                  selectAnswer={handleAnswer}
                  selected={selectedAnswer[item.id] === option}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  });

  function start() {
    setStarted((prevState) => !prevState);
  }

  function checkAnswer() {
    setShowResults(true);
  }
  function playAgain() {
    return "PLay agaian";
  }

  return (
    <main>
      <img className="topShape" src={top}></img>

      {started ? (
        <div className="game-container">
          {renderQuestion}
          <button className="btnx" onClick={checkAnswer}>
            Check Answers
          </button>
          <div className="result">
            {showResults
              ? ` You have answered  ${correct} questions correctly`
              : null}
          </div>
        </div>
      ) : (
        <Menu start={start} />
      )}
      <img className="bottomShape" src={bottom}></img>
    </main>
  );
}
