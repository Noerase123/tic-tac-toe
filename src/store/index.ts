import { atom, createStore } from "jotai";
import { atomWithReset } from 'jotai/utils'

export const store = createStore();

export const playerNameAtom = atom({
  playerOne: "",
  playerTwo: ""
})

export type TGameData = {
  playerOne: string;
  playerTwo: string;
  winner: string;
  dateCreated: string;
}

export const gameDataAtom = atom<TGameData[]>([]);

export const addGameDataAtom = atomWithReset<TGameData | undefined>(undefined);
