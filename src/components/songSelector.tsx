"use client"
import { usePlayer } from "@/context/PlayerContext"
import { Track } from "@/types/player"
import { useRef } from "react"
import songsData from '@/data/songs.json'

const songs: Track[] = songsData.songs

const SongSelector = () => {
  const { state, dispatch } = usePlayer()
  const selectRef = useRef<HTMLSelectElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrack = songs.find((song) => song.audioSrc === e.target.value)
    if (selectedTrack) {
      dispatch({ type: "SET_TRACK", payload: selectedTrack })
      dispatch({ type: "PLAY" })
    }
  }

  return (
    <div className={`z-10 flex justify-center items-center py-2.5 transition-all duration-500 ease-out ${state.isPlaying ? '' : 'flex-1'}`}>
      <select name="songs" id="song-select" ref={selectRef} onChange={handleChange} className="border px-4.5 py-3.5 rounded-full min-w-3xl">
        <option value="">Select a song</option>
        {songs.map((song, index) => (
          <option key={index} value={song.audioSrc}>
            {song.title} — {song.artist}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SongSelector
