'use client';

interface MoleProps {
  isVisible: boolean;
  onClick: () => void;
}

const Mole = ({ isVisible, onClick }: MoleProps) => {
  return (
    <div 
      className={`grid-item ${isVisible ? "mole" : ""}`}
      onClick={onClick}
    />
  );
};

export default Mole; 