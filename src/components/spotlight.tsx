"use client"

import { usePlayer } from "@/context/PlayerContext"
import songsData from "@/data/songs.json"
import { Track } from "@/types/player"

const Spotlight = () => {
    const { dispatch } = usePlayer()

    const handleClick = () => {
        const merylSong = songsData.songs.find(song => song.artist === "Meryl") as Track
        if (merylSong) {
            dispatch({ type: "SET_TRACK", payload: merylSong })
            dispatch({ type: "PLAY" })
        }
    }

    return (
        <button 
            onClick={handleClick}
            className="font-maghfirea text-sm text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer uppercase"
        >
            (Meryl Spot)
        </button>
    )
}

export default Spotlight;