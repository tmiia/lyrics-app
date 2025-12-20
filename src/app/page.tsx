"use client"
import { useRef } from "react";
import LyricsDisplayer from "@/components/lyricsDisplayer";
import Player from "@/components/player";
import RandomSongStack from "@/components/randomSongStack";
import Intro from "@/components/intro";
import Nav from "@/components/nav";
import PlayerController from "@/components/playerController";

export default function Home() {
  const constraintsRef = useRef<HTMLElement>(null);

  return (
    <main ref={constraintsRef} className="bg-gradient-to-b from-dark to-light flex flex-col justify-between h-dvh overflow-hidden">
      <Intro />
      <Nav />
      <PlayerController dragConstraints={constraintsRef} />
      <RandomSongStack />
      <LyricsDisplayer />
      <Player />
    </main>
  );
}
