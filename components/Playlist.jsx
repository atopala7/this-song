import React, { useEffect, useState } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import { Skeleton } from "./ui/skeleton";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

const Playlist = ({ playlist, limit = 10, offset = 0 }) => {
  let [topSongs, setTopSongs] = useState(null);
  const [ready, setReady] = useState(false);
  const [summaries, setSummaries] = useState(null);
  let errorMessage = "";

  console.log("Rendering Playlist.jsx");

  const getSongs = async () => {
    setTopSongs(null);
    try {
      const { data } = await axios.get(`${BACKEND_URI}/client_token`);

      const token = data.access_token;

      // console.log("Getting top songs...");

      // Today's top hits: 37i9dQZF1DXcBWIGoYBM5M
      // Rock classics: 37i9dQZF1DWXRqgorJj26U
      axios.defaults.baseURL = "https://api.spotify.com/v1";
      axios.defaults.headers["Content-Type"] = "application/json";
      const topSongsResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlist}/tracks?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: "no-store"
        }
      );

      setTopSongs(topSongsResponse);

      const songs = topSongsResponse.data.items;
      // console.log("songs", songs);

      // return songs;

      const allSummaries = new Map();

      await Promise.all(
        songs.map(async (element) => {
          // console.log(element.track.name);
          const songID = element.track.id;
          const songName = element.track.name;

          const gpt4Response = await fetch(GPT_SUMMARY_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              songID: songID,
              trackName: songName
            }),
            cache: "no-store"
          });

          if (gpt4Response.ok) {
            const summary = await gpt4Response.text();
            if (summary) {
              // console.log("songID", songID);
              // console.log("songName", songName);
              // console.log("summary", summary);
              const firstLetter = summary.slice(13, 14);
              const restOfSummary = summary.slice(14);
              allSummaries.set(
                element.track.id,
                firstLetter.toUpperCase() + restOfSummary
              );
            } else {
              allSummaries.set(
                element.track.id,
                "Description currently unavailable."
              );
            }
          }
        })
      );

      setSummaries(allSummaries);
      // console.log(summaries);
      setReady(true);
    } catch (e) {
      console.log(e);
      errorMessage = JSON.stringify(e);
      errorMessage = e.code;
    }
  };

  useEffect(() => {
    getSongs();
  }, [playlist]);

  useEffect(() => {
    console.log("summaries");
    console.log(summaries);
  }, [summaries]);

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {(topSongs &&
          summaries &&
          topSongs.data.items.map((item, index) => (
            <div
              className="flex py-4 m-[10px] max-w-[400px] transition-all duration-300 border-[1px] rounded-lg cursor-pointer hover:bg-card group md:w-[400px] w-full h-[200px] items-center justify-center group overflow-hidden"
              key={index}
            >
              <a href={`/song/${item.track.id}`} className="w-full">
                <div className="w-full md:w-[400px] h-[200px] flex flex-col justify-center">
                  <div className="flex items-center justify-center w-full gap-2 p-2 overflow-hidden">
                    <img
                      className="w-16 h-16"
                      src={item.track.album.images[2].url}
                      alt="Album image"
                    />
                    <p className="overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                      {item.track.name}
                      <br />
                      <span className="inline-flex justify-between text-muted">
                        {/* <span>Popularity: {item.track.popularity}</span> */}
                        <span>{item.track.artists[0].name}</span>
                      </span>
                      <br />
                      {/* <span className="text-foreground">{item.album.name}</span> */}
                    </p>
                    <div className="flex flex-col items-center justify-center align-middle min-w-[36px]">
                      {/* <a
                        href={item.track.external_urls.spotify}
                        target="_blank"
                      >
                        <button className="flex flex-col items-center gap-1 text-xs text-white align-middle rounded-full hover:brightness-110">
                          <img
                            src="/images/Spotify_Icon_RGB_Green.png"
                            className="w-9 h-9"
                            alt="Listen on Spotify"
                          />
                        </button>
                      </a> */}
                    </div>
                  </div>
                  <div className="p-2 overflow-hidden text-sm duration-300 text-muted group-hover:text-primary text-ellipsis">
                    {summaries.has(item.track.id) ? (
                      summaries.get(item.track.id)
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center align-middle">
                        <Skeleton className="w-[90%] h-4 my-1 text-sm text-muted" />
                        <Skeleton className="w-[80%] h-4 my-1 text-sm text-muted" />
                        <Skeleton className="w-[70%] h-4 my-1 text-sm text-muted" />
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </div>
          ))) || (
          <>
            <div className="flex flex-wrap items-center justify-center w-full">
              {new Array(20).fill().map((item, index) => (
                <div
                  className="flex py-4 m-[10px] transition-all duration-500 border-[1px] rounded-lg cursor-pointer hover:bg-secondary group md:w-[400px] w-full h-[200px] items-center justify-center"
                  key={index}
                >
                  <div className="w-full md:w-[400px] h-[200px] flex flex-col items-center justify-center">
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
    </section>
  );
};

export default Playlist;
