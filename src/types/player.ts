export type LyricLine = {
  time: number
  text: string
}

export type Track = {
  title: string
  artist: string
  audioSrc: string
  cover: string
  lyrics: LyricLine[]
}

export type PlayerState = {
  isPlaying: boolean
  currentTime: number
  duration: number
  currentTrack: Track | null
}

export type PlayerAction =
  | { type: "SET_TRACK"; payload: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
