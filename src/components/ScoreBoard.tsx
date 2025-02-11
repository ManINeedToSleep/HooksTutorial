'use client';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
  highScore: number;
}

const ScoreBoard = ({ score, timeLeft, highScore }: ScoreBoardProps) => {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
      <h3>Time Left: {timeLeft}s</h3>
      <h3>High Score: {highScore}</h3>
    </div>
  );
};

export default ScoreBoard; 