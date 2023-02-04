import "../App.css";

export default function Answer(props) {
  return (
    <p
      className="answers"
      style={props.isSelected ? { backgroundColor: "green" } : {}}
      onClick={() => props.selectAnswer(props.id, props.title, props.idAnswer)}
    >
      {props.title}
    </p>
  );
}
