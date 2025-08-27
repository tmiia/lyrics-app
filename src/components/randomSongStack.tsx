"use client"
import { usePlayer } from "@/context/PlayerContext"
import { Track } from "@/types/player"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import songsData from '@/data/songs.json'

const songs: Track[] = songsData.songs

const RandomSongStack = () => {
  const { state, dispatch } = usePlayer()
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const MAX_COVER = 6
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (state.isPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 500)

    return () => clearInterval(interval)
  }, [state.isPlaying])

  const handlePlay = () => {
     dispatch({ type: "SET_TRACK", payload: songs[Math.floor(Math.random() * songs.length)] })
     dispatch({ type: "PLAY" })
  }

  return (
    <AnimatePresence>
      {!state.isPlaying && (
        <motion.section
          className="relative"
          initial={{ scale: 1, opacity: 1 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
        >
          <motion.div
            className="w-screen min-h-screen"
            animate={{ rotate: -360 }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {Array.from({ length: MAX_COVER }, (_, i) => {
              const imageIndex = currentIndex - MAX_COVER + i + 1
              const isVisible = imageIndex >= 0 && imageIndex < currentIndex

              if (!isVisible) return null

              return (
                <motion.img
                  key={imageIndex}
                  ref={(el) => {
                    imageRefs.current[i] = el
                  }}
                  src={songs[imageIndex % songs.length].cover}
                  alt={`cover album of ${songs[imageIndex % songs.length].title}`}
                  className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-lg rounded-3xl"
                  style={{
                    zIndex: imageIndex
                  }}
                  initial={{
                    rotate: 0,
                    scale: 0.7
                  }}
                  animate={{
                    rotate: (120 / MAX_COVER) * i,
                    scale: 1
                  }}
                  exit={{
                    scale: 0.9,
                    opacity: 0,
                    transition: { duration: 0 }
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              )
            })}
          </motion.div>

          <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 z-10 flex justify-between items-center px-8 font-maghfirea">
            <strong className="text-zinc-700 tracking-wider opacity-70">Discover the</strong>
            <button
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-sm text-white font-medium font-marvio hover:bg-white/30 transition-colors cursor-pointer"
              onClick={handlePlay}
            >
              Play random
            </button>
            <strong className="text-zinc-700 tracking-wider opacity-70">songs lyrics</strong>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default RandomSongStack
