"use client"

import React, { createContext, useReducer, useContext, ReactNode } from "react"
import { playerReducer, initialState } from "./playerReducer"
import { PlayerState, PlayerAction } from "@/types/player"

type PlayerContextType = {
  state: PlayerState
  dispatch: React.Dispatch<PlayerAction>
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState)

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
