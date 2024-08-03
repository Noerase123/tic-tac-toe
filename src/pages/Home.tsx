import { Input } from '../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../components/ui/dialog';
import { useNavigate } from 'react-router-dom'
import { useValidation } from '../hooks/useValidation';
import { Button } from '../components/ui/button';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils'
import { addGameDataAtom, gameDataAtom, playerNameAtom, TGameData } from '../store';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: handleSubmitHook
  } = useValidation();

  const setPlayerName = useSetAtom(playerNameAtom);
  const [gameDataValue, setGameDateValue] = useAtom(gameDataAtom);
  const addGameDataValue = useAtomValue(addGameDataAtom);
  const resetAddGameData = useResetAtom(addGameDataAtom);

  const fetchAPI = async () => {
    try {
      const response = await fetch('/store');
      const data = await response.json();
      setGameDateValue(data.data);
    } catch (error) {
      console.log('error', error);
      setGameDateValue([
        ...gameDataValue,
        {
          playerOne: addGameDataValue?.playerOne || '',
          playerTwo: addGameDataValue?.playerTwo || '',
          winner: addGameDataValue?.winner || '',
          dateCreated: addGameDataValue?.dateCreated || '',
        }
      ]);
    }
  }

  const postAPI = async () => {
    try {
      await fetch('/store', {
        method: "POST",
        body: JSON.stringify(addGameDataValue),
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    if (addGameDataValue) {
      postAPI();
      resetAddGameData();
    }
  }, [addGameDataValue]);

  const handleSubmit = handleSubmitHook(d => {
    setPlayerName(d);
    navigate('/game');
  });
  
  return (
    <div className='bg-gradient-to-r from-[#059ED8] to-[#001A88] h-screen'>
      <p className='text-[20px] text-white text-center mb-10'>TicTacToe Game</p>
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger>
            <button className='uppercase text-white hover:bg-[#059ED8] bg-slate-400 rounded-full px-5 py-2'>
              Start New Game
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fill up player names below</DialogTitle>
              <form onSubmit={handleSubmit}>
                <Input
                  control={control}
                  name="playerOne"
                  label='Player 1'
                  placeholder='Player 1 name'
                />
                <Input
                  control={control}
                  name="playerTwo"
                  label='Player 2'
                  placeholder='Player 2 name'
                />
              </form>
              <Button onClick={handleSubmit} className='uppercase text-white hover:bg-[#059ED8] bg-slate-400 rounded-full px-5 py-2'>
                Start
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {gameDataValue.length === 0 ? (
        <div className='text-center mt-10'>
          <p className='text-gray-400 text-[20px]'>No record yet</p>
        </div>
      ) : (
        <div className='mx-10 mt-10'>
          <p className='text-white text-[20px] mb-2'>Scoreboard</p>
          <table className='w-full bg-white rounded-md overflow-hidden'>
            <thead className='bg-gray-300'>
              <tr>
                <th className='text-left px-3 py-2'>Player One</th>
                <th className='text-left px-3 py-2'>Player Two</th>
                <th className='text-left px-3 py-2'>Winner</th>
                <th className='text-left px-3 py-2'>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {gameDataValue.map((data: any) => {
                return (
                  <tr>
                    <td className='px-3 py-2'>
                      <p className='text-[14px]'>{data.playerOne}</p>
                    </td>
                    <td className='px-3 py-2'>
                      <p className='text-[14px]'>{data.playerTwo}</p>
                    </td>
                    <td className='px-3 py-2'>
                      <p className='text-[14px]'>{data.winner}</p>
                    </td>
                    <td className='px-3 py-2'>
                      <p className='text-[14px]'>{data.dateCreated}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  )
}
