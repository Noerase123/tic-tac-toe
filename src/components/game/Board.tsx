import { useEffect, useState } from 'react';
import Square from './Square';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { addGameDataAtom, playerNameAtom } from '../../store';
import dayjs from 'dayjs';

function Board() {
  const navigate = useNavigate();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');

  const playerNameValue = useAtomValue(playerNameAtom);
  const addGameData = useSetAtom(addGameDataAtom);

  const handleNavigateStop = async () => {
    addGameData({
      ...playerNameValue,
      winner: String(winner) === 'X' ? playerNameValue.playerOne : playerNameValue.playerTwo,
      dateCreated: dayjs().format('MMM DD, YYYY h:mma')
    });
    navigate("/");
  };
  const handleContinue = () => setSquares(Array(9).fill(null));
  
  useEffect(() => {
    if (playerNameValue.playerOne === '' || playerNameValue.playerTwo === '') {
      handleNavigateStop();
    }
  }, []);

  const calculateWinner = (squares: number[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    const hasFilled = squares.filter(sq => sq !== null);
    if (hasFilled.length === 9) {
      return 'N';
    }
  }

  const handleClick = (index: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[index]) {
      return;
    }
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      if (winner === 'N') {
        setStatus('No Winner');
      } else {
        setStatus(`Winner: ${String(winner) === 'X' ? playerNameValue.playerOne : playerNameValue.playerTwo}`);
      }
    } else {
      setStatus(`Player: ${xIsNext ? playerNameValue.playerOne : playerNameValue.playerTwo}'s turn`);
    }
  }, [winner, xIsNext, playerNameValue]);

  return (
    <div>
      <div className="status text-white text-[30px]">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && (
        <div className='text-center mt-5'>
          <p className='text-white mb-3'>Do you want to play again?</p>
          <div className="flex justify-between">
            <button onClick={handleContinue} className='uppercase text-white bg-[#059ED8] rounded-full px-5 py-2'>
              Continue
            </button>
            <button onClick={handleNavigateStop} className='uppercase text-white hover:bg-[#059ED8] bg-red-400 rounded-full px-5 py-2'>
              Stop      
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Board;
