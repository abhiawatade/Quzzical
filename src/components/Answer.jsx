import "../App.css";

export default function Answer(props) {
  return (
    <p
      className="answers"
      onClick={() => props.selectAnswer(props.id, props.title, props.idAnswer)}
    >
      {props.title}
    </p>
  );
}
