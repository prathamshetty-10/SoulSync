import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!isXNext && !winner) {
      const emptySquares = board
        .map((value, index) => (value === null ? index : null))
        .filter((index) => index !== null);
      
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      
      if (randomIndex !== undefined) {
        setTimeout(() => {
          const newBoard = board.slice();
          newBoard[randomIndex] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }, 500); // Slight delay for more realistic gameplay
      }
    }
  }, [isXNext, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button
      className="w-24 h-24 border text-4xl font-bold flex items-center justify-center hover:bg-gray-200"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white">Tic Tac Toe(you are X bot is O)</h1>
      <div className="grid grid-cols-3 gap-1 text-white">
        {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
      </div>
      <div className="mt-4">
        {winner ? (
          <div className="text-xl font-semibold text-white">
            Winner: {winner}
          </div>
        ) : (
          board.every(Boolean) && <div className="text-xl font-semibold text-white">It's a Tie!</div>
        )}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

// Helper function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;