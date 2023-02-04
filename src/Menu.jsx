export default function Menu(props) {
  return (
    <div>
      <h1>Quizzical</h1>
      <p>GAME ON</p>
      <button onClick={() => props.start()}>Start Game</button>
    </div>
  );
}
