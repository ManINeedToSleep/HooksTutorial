'use client';

import Mole from './Mole';

interface GridProps {
  grid: boolean[];
  onMoleClick: (index: number) => void;
}

const Grid = ({ grid, onMoleClick }: GridProps) => {
  return (
    <div className="game-grid">
      {grid.map((isMole, index) => (
        <Mole
          key={index}
          isVisible={isMole}
          onClick={() => onMoleClick(index)}
        />
      ))}
    </div>
  );
};

export default Grid; 