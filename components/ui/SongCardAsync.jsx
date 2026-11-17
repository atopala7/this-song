"use client";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "./skeleton";
import SongCard from "./SongCard";
import clsx from "clsx";

import { BACKEND_URL } from "@/lib/backendURL";

// const BACKEND_URI =
//   process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
//     ? "http://192.168.4.158:8000"
//     : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URL}/api/v1/gpt/summary`;

const SongCardAsync = ({ id, newLimit = null, isLast = false }) => {
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  let [item, setItem] = useState(null);

  const getSong = async (id) => {
    console.log("getSong: id", id);
    try {
      const songResponse = await fetch(`/api/top-songs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("songResponse", songResponse);
      const songData = await songResponse.json();

      console.log("songData", songData);

      setItem(songData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSong(id);
  }, [id]);

  return (
    <div>
      {(item && (
        <SongCard
          id={item.id}
          imageURL={item.imageURL}
          name={item.name}
          artistName={item.artistName}
          // summary={
          //   summaries && summaries.has(item.id)
          //     ? summaries.get(item.id)
          //     : "loading"
          // }
          summary="loading"
          spotifyURL={item.spotifyURL}
          previewURL={item.previewURL}
          isLast={isLast}
          newLimit={newLimit}
        />
      )) || (
        <>
          <div className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[225px] items-center justify-center">
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
        </>
      )}
    </div>
  );
};

export default SongCardAsync;
