"use client"
import VinylScene from "@/components/Experience/vinylScene";
import LyricsDisplayer from "@/components/lyricsDisplayer";
import Player from "@/components/player";
import RandomSongStack from "@/components/randomSongStack";
import SongSelector from "@/components/songSelector";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-dark to-light flex flex-col justify-between h-screen overflow-hidden">
      {/* <SongSelector /> */}
      <RandomSongStack />
      <LyricsDisplayer />
      <Player />
    </main>
  );
}
