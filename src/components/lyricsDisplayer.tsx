"use client"
import { usePlayer } from "@/context/PlayerContext"
import { Track, LyricLine } from "@/types/player"
import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import songsData from '@/data/songs.json'

const songs: Track[] = songsData.songs

const LyricsDisplayer = () => {
  const { state, dispatch } = usePlayer()

  const containerRef = useRef<HTMLDivElement>(null)
  const lyricsRef = useRef<HTMLDivElement>(null)

  const getCurrentLineIndex = () => {
    if (!state.currentTrack) return -1

    for (let i = state.currentTrack.lyrics.length - 1; i >= 0; i--) {
      if (state.currentTime >= state.currentTrack.lyrics[i].time) {
        return i
      }
    }
    return 0
  }

  const currentLineIndex = getCurrentLineIndex()

  useEffect(() => {
    if (currentLineIndex >= 0 && lyricsRef.current && containerRef.current) {
      const lineElement = lyricsRef.current.children[currentLineIndex] as HTMLElement
      if (lineElement) {
        const containerHeight = containerRef.current.clientHeight
        const lineTop = lineElement.offsetTop
        const lineHeight = lineElement.clientHeight

        const scrollPosition = lineTop - (containerHeight / 2) + (lineHeight / 2)

        containerRef.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      }
    }
  }, [currentLineIndex])

  return (
    <section className={`z-10 flex flex-col justify-center items-center p-4 transition-all duration-1000 ease-out ${state.isPlaying ? "flex-5" : ""}`}>
      {!state.currentTrack ? (
        <></>
      ) : (
        <motion.div
          ref={containerRef}
          className=" w-full max-w-2xl h-60 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)'
          }}
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >

          <div ref={lyricsRef} className="text-center py-20">
            {state.currentTrack!.lyrics.map((line, index) => (
              <motion.p
                key={index}
                className={`
                  cursor-pointer transition-all duration-500 py-2 px-4 text-4xl font-marvio
                  ${index === currentLineIndex
                    ? 'opacity-90'
                    : index === currentLineIndex - 1 || index === currentLineIndex + 1
                      ? 'opacity-50 text-3xl'
                      : 'opacity-40 text-2xl'
                  }
                `}
                animate={{
                  scale: index === currentLineIndex ? 1.05 : 1,
                  transition: { duration: 0.15 }
                }}
              >
                {line.text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default LyricsDisplayer
