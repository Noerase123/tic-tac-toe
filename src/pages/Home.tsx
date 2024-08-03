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
import { useSetAtom } from 'jotai';
import { playerNameAtom } from '../store';

export default function Home() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: handleSubmitHook
  } = useValidation();

  const setPlayerName = useSetAtom(playerNameAtom);

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
    </div>
  )
}
