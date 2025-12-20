"use client"
import { usePlayer } from "@/context/PlayerContext"
import { useState, useEffect, RefObject } from "react"
import { motion } from "motion/react"
import GrabSvg from "./svgs/grab"

interface PlayerControllerProps {
    dragConstraints?: RefObject<HTMLElement | null>
}

const PlayerController = ({ dragConstraints }: PlayerControllerProps) => {
    const { state, dispatch } = usePlayer()
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        setIsPlaying(state.isPlaying)
    }, [state.isPlaying])

    const handlePlay = () => {
        if (isPlaying) {
            dispatch({ type: "PAUSE" })
            setIsPlaying(false)
        } else {
            dispatch({ type: "PLAY" })
            setIsPlaying(true)
        }
    }

    if (!state.currentTrack) {
        return null
    }

    return (
        <motion.div 
            drag
            dragMomentum={true}
            dragConstraints={dragConstraints}
            dragElastic={0.05}
            dragTransition={{
                power: 0.1,
                timeConstant: 400,
                bounceStiffness: 100,
                bounceDamping: 30,
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-100 flex gap-1 cursor-grab active:cursor-grabbing"
        >
            <div className="flex items-center justify-center gap-1 px-3 py-3 bg-white/20 backdrop-blur-sm rounded-sm">
                <GrabSvg color="#C0C0C0" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-sm">
                <h2 className="text-white font-maghfirea text-xl leading-none">{state.currentTrack?.artist}</h2>
                <h3 className="text-white font-mono text-sm font-light leading-none">{state.currentTrack?.title}</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-6 py-3  bg-white/20 backdrop-blur-sm rounded-sm">
                <button onClick={handlePlay} className="text-white font-marvio text-base leading-none">{isPlaying ? "Pause" : "Play"}</button>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-6 py-3  bg-white/20 backdrop-blur-sm rounded-sm">
                <p className="text-white font-maghfirea text-sm leading-none tracking-widest">{Math.floor(state.currentTime / 60)}:{Math.floor(state.currentTime % 60).toString().padStart(2, '0')}</p>
            </div>
        </motion.div>
    )
}

export default PlayerController