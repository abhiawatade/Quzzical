import "../App.css";

export default function Answer(props) {
  return (
    <div className="que-ans-container">
      <p
        style={{
          backgroundColor: props.selected ? "#A8B9D0" : "",
        }}
        className="answers"
        onClick={() =>
          props.selectAnswer(props.id, props.title, props.idAnswer)
        }
      >
        {props.title}
      </p>
    </div>
  );
}
