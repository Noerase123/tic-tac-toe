import { atom, createStore } from "jotai";

export const store = createStore();

export const playerNameAtom = atom({
  playerOne: "",
  playerTwo: ""
})
