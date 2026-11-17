"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import SongCard from "./ui/SongCard";
import { Button } from "./ui/button";
import { songIDs } from "@/lib/data";
import clsx from "clsx";
import { rajdhani } from "./ui/fonts";
import { getClientToken } from "@/lib/clientToken";
import SongCardAsync from "./ui/SongCardAsync";

// const BACKEND_URI =
//   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
//     ? "http://192.168.4.158:8000"
//     : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

// const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/api/v1/gpt/summary`;

const SONG_IDS = ["39CFOvYse9fcMhIwyS73Fl"];

const TopSongsAsync = ({ song, limit = 12, offset = 0 }) => {
  let [topSongs, setTopSongs] = useState(null);
  const [ready, setReady] = useState(false);
  const [summaries, setSummaries] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  let errorMessage = "";

  console.log("Rendering TopSongsAsync.jsx");

  const getTopSongs = async (currentOffset = 0, limit = 12) => {
    try {
      currentOffset = currentOffset || 0;
      console.log("getTopSongs: currentOffset", currentOffset);

      const topSongIDs = songIDs.slice(
        currentOffset,
        currentOffset + parseInt(limit)
      );

      console.log("topSongIDs", topSongIDs);

      setTopSongs((prev) => (prev ? prev.concat(topSongIDs) : topSongIDs));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("useEffect: songIDs");
    setTopSongs(null);
    setReady(false);
    setSummaries(null);
    setCurrentOffset(0);

    console.log("Rendering TopSongs.jsx");
    getTopSongs();
    setReady(true);
  }, [songIDs]);

  useEffect(() => {
    console.log("summaries");
    console.log(summaries);
    console.log("topSongs", topSongs);
  }, [summaries]);

  useEffect(() => {
    if (currentOffset === 0) return;
    getTopSongs(currentOffset, limit);
  }, [currentOffset]);

  useEffect(() => {
    const topContent = document.querySelector("#top-content");

    console.log("topContent", topContent);

    if (!topContent) return;

    const observer = new IntersectionObserver(([entry]) => {
      const button = document.getElementById("scroll-to-top-button");
      if (!entry.isIntersecting) {
        button.style.visibility = "visible";
        button.style.opacity = 1;
        button.style.pointerEvents = "auto";
      } else {
        button.style.visibility = "hidden";
        button.style.opacity = 0;
        button.style.pointerEvents = "none";
      }
    });

    observer.observe(topContent);

    return () => {
      if (topContent) observer.unobserve(topContent);
    };
  }, []);

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {(topSongs &&
          topSongs.length > 0 &&
          topSongs.map((item, index) => (
            <div
              id={index}
              className="flex m-[10px] transition-all sm:max-w-[400px] duration-300 w-full items-center justify-center sm:overflow-visible overflow-hidden"
              key={index}
            >
              <SongCardAsync
                id={item}
                isLast={index === topSongs.length - 1}
                newLimit={() => setCurrentOffset(currentOffset + limit)}
              />
            </div>
          ))) || (
          <>
            <div className="flex flex-wrap items-center justify-center w-full">
              {new Array(20).fill().map((item, index) => (
                <div
                  className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[225px] items-center justify-center"
                  key={index}
                >
                  <div className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center flex-grow">
                    <div className="flex items-center justify-center w-full gap-2 p-2 overflow-x-hidden">
                      <Skeleton className="w-16 h-16" />
                      <div className="flex flex-col items-center w-[70%] gap-2">
                        <Skeleton className="w-full h-7" />
                        <Skeleton className="w-[70%] h-5" />
                      </div>
                    </div>
                    <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
                    <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
                    <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Button
        id="scroll-to-top-button"
        variant="outline"
        onClick={(e) => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          transition: "opacity 1s, visibility 1s",
          visibility: currentOffset === 0 ? "hidden" : "visible",
          opacity: currentOffset === 0 ? 0 : 1
        }}
      >
        Scroll to Top
      </Button>
    </section>
  );
};

export default TopSongsAsync;
