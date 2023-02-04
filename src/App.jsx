import Menu from "./Menu";
import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import Answer from "./components/Answer";

export default function App() {
  const [started, setStarted] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [correct, setCorrect] = React.useState(0);

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

  const handleAnswer = (id, title, idAnswer) => {
    questions.forEach((item) => {
      if (item.id === id) {
        if (item.correctAns === title) {
          setCorrect(correct + 1);
          setCount((old) => old + 1);
        }
      }
      console.log(title);
      console.log(count);
      console.log(correct);
    });
  };

  const renderQuestion = questions.map((item) => {
    return (
      <div key={item.id}>
        <h3> {item.question}</h3>
        {item.answers.map((option) => {
          return (
            <Answer
              title={option}
              id={item.id}
              idAnswer={nanoid()}
              key={nanoid()}
              selectAnswer={handleAnswer}
            />
          );
        })}
      </div>
    );
  });

  function start() {
    setStarted((prevState) => !prevState);
  }

  return (
    <main>
      {started ? (
        <div>
          {renderQuestion} <button>Check answer</button>
        </div>
      ) : (
        <Menu start={start} />
      )}
    </main>
  );
}
