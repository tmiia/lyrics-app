"use client"
import { usePlayer } from "@/context/PlayerContext"
import { useEffect, useRef } from "react"
import VinylScene from "./3D_Scenes/vinylScene"

type PlayerProps = {

}

const Player = ({} : PlayerProps) => {
  const { state, dispatch } = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setDuration = () => dispatch({ type: "SET_DURATION", payload: audio.duration })

    audio.addEventListener("loadedmetadata", setDuration)

    return () => {
      audio.removeEventListener("loadedmetadata", setDuration)
    }
  }, [dispatch])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    state.isPlaying ? audio.play() : audio.pause()
  }, [state.isPlaying])

  const updateTime = (event: any) => {
    if (audioRef.current) {
      dispatch({ type: "SET_TIME", payload: audioRef.current.currentTime })
    }
  }

  return (
    <section className={`z-0 flex flex-col items-center py-2.5 transition-all duration-500 ease-out`}>
      { !state.currentTrack ? (
          <></>
      ) : (
        <>
          <audio ref={audioRef} src={state.currentTrack ? state.currentTrack.audioSrc : ''} onTimeUpdate={updateTime} />
          <button onClick={() => dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" })} className="sr-only">
            {state.isPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}
          <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none">
            <VinylScene isPlaying={state.isPlaying} />
          </div>
    </section>
  )
}

export default Player
