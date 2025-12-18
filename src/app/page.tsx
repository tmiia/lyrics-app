"use client"
import LyricsDisplayer from "@/components/lyricsDisplayer";
import Player from "@/components/player";
import RandomSongStack from "@/components/randomSongStack";
import Intro from "@/components/intro";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-dark to-light flex flex-col justify-between h-screen overflow-hidden">
      <Intro />
      <Nav />
      <RandomSongStack />
      <LyricsDisplayer />
      <Player />
    </main>
  );
}
