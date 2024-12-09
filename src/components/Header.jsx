import gameLogo from "../assets/game-logo.png";

export default function Header() {
  return (
    <header>
      <img src={gameLogo} alt="game-logo" />
      <h1>Lets start playing the game</h1>
    </header>
  );
}
