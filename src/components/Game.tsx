'use client';

import { useState, useEffect } from 'react';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState<boolean[]>(new Array(9).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Load high score from localStorage when component mounts
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(Number(savedHighScore));
    }
  }, []);

  useEffect(() => {
    let moleTimer: NodeJS.Timeout;
    let gameTimer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      const highlightMole = () => {
        const newGrid = new Array(9).fill(false);
        const randomIndex = Math.floor(Math.random() * 9);
        newGrid[randomIndex] = true;
        setGrid(newGrid);
      };

      moleTimer = setInterval(highlightMole, 1000);
      gameTimer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(moleTimer);
      clearInterval(gameTimer);
    };
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score.toString());
      }
    }
  }, [timeLeft, score, highScore]);

  const handleMoleClick = (index: number) => {
    if (grid[index] && isPlaying) {
      setScore(prevScore => prevScore + 1);
      const newGrid = [...grid];
      newGrid[index] = false;
      setGrid(newGrid);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGrid(new Array(9).fill(false));
  };

  return (
    <div className="game">
      <h1>Whack-a-Mole</h1>
      <ScoreBoard 
        score={score} 
        timeLeft={timeLeft}
        highScore={highScore}
      />
      {!isPlaying && (
        <button className="start-button" onClick={startGame}>
          {timeLeft === 30 ? 'Start Game' : 'Play Again'}
        </button>
      )}
      <Grid grid={grid} onMoleClick={handleMoleClick} />
    </div>
  );
};

export default Game; 