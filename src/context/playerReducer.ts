import { PlayerState, PlayerAction } from "@/types/player"

export const initialState: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrack: null,
}

export function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_TRACK":
      return { ...state, currentTrack: action.payload, currentTime: 0, duration: 0, isPlaying: false }
    case "PLAY":
      return { ...state, isPlaying: true }
    case "PAUSE":
      return { ...state, isPlaying: false }
    case "SET_TIME":
      return { ...state, currentTime: action.payload }
    case "SET_DURATION":
      return { ...state, duration: action.payload }
    default:
      return state
  }
}
