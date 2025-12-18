"use client"
import LyricsDisplayer from "@/components/lyricsDisplayer";
import Player from "@/components/player";
import RandomSongStack from "@/components/randomSongStack";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-dark to-light flex flex-col justify-between h-screen overflow-hidden">
      <Intro />
      <RandomSongStack />
      <LyricsDisplayer />
      <Player />
    </main>
  );
}
