import Game from '../components/game/Game'
import React from 'react'

export default function BaseGame() {
  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-[#059ED8] to-[#001A88] h-screen'>
      <Game />
    </div>
  )
}
