import "./Menu.css";

export default function Menu(props) {
  return (
    <div className="intro-page">
      <h1>Quizzical</h1>
      <p className="intro-description">Solve Random Quizes</p>
      <button className="btn" onClick={() => props.start()}>
        Start Game
      </button>
    </div>
  );
}
