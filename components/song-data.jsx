"use client";
import { useContext, useEffect, useState } from "react";

import { SongContext, TokenContext } from "@/context/ContextProvider";

import { getCurrentlyPlaying } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

const SongData = ({ parent }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  // const [song, setSong] = useState(null);

  // Init is used to determine whether the token has been read at least once
  const [init, setInit] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  const { token } = useContext(TokenContext);
  const { song, setSong } = useContext(SongContext);

  const { scrollYProgress } = useScroll({
    container: parent
  });

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  useEffect(() => {
    setInit(1);
    getSong();
    window.addEventListener("scroll", stick);
    return () => {
      window.removeEventListener("scroll", stick);
    };
  }, [token]);

  const stick = () => {
    window.scrollY > 200 ? setScrolled(true) : setScrolled(false);
  };

  useEffect(() => {
    if (data) {
      const thisSong = {
        albumArt: data.item.album.images[1].url,
        songName: data.item.name,
        artists: data.item.artists,
        albumName: data.item.album.name
      };

      setSong(thisSong);
    } else {
      setSong(null);
    }
  }, [data]);

  // Force a rerender when the song changes
  useEffect(() => {
    console.log(song);
  }, [song]);

  // Awaits the song that's currently playing and sets state variables accordingly
  const getSong = (select) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (!select && token) {
      const fetchData = async () => {
        console.log("Getting currently playing song...");
        const currentlyPlaying = await getCurrentlyPlaying();
        setData(currentlyPlaying.data);
        setStatus(currentlyPlaying.status);
      };
      catchErrors(fetchData());
    } else if (select) {
      console.log(select);

      const thisSong = {
        albumArt: select.albumArt,
        songName: select.songName,
        artists: select.artists,
        albumName: select.albumName
      };

      setSong(thisSong);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[356px] lg:h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[56px] lg:left-[256px] lg:w-[calc(100dvw-256px)] lg:top-0 lg:pt-2 bg-background"
                // "border-red-500 border-2"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <motion.div
                className="relative group"
                // className="border-2 border-red-500"
                onClick={() => {
                  getSong(null);
                }}
                style={{
                  width: scrollHeight,
                  height: scrollHeight
                }}
              >
                <img
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.albumArt}
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                />
              </motion.div>
              <div
                className={clsx(
                  "flex flex-col justify-center h-[100px] transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit",
                  // "border-red-500 border-2",
                  // scrolled ? "opacity-100 w-[300px]" : "w-[0%] opacity-0",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px]"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1
                  className="text-base text-yellow-500 font-extra bold sm:text-xl dark:text-yellow-200 min-w-[300px]"
                  onClick={() => {
                    console.log("scrollHeight: ", scrollHeight.current);
                  }}
                >
                  {song.songName}
                  {/* {scrollHeight.current} */}
                </h1>
                <h2 className="text-base text-blue-300 sm:text-lg min-w-[300px]">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </h2>
                <h3 className="text-base min-w-[300px]">{song.albumName}</h3>
              </div>
            </motion.div>
          </div>
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-opacity duration-500 md:hidden"
              // scrolled ? "opacity-0 -z-10" : "opacity-100"
            )}
          >
            <h1
              className="text-3xl font-extrabold text-yellow-500 dark:text-yellow-200"
              onClick={() => {
                console.log("scrollHeight: ", scrollHeight.current);
              }}
            >
              {song.songName}
            </h1>
            <h2 className="text-2xl text-blue-300">
              {song.artists.map((artist) => artist.name).join(", ")}
            </h2>
            <h3 className="text-xl text-">{song.albumName}</h3>
          </div>
        </>
      )) ||
        (status == 204 && (
          <>
            <p className="relative top-[56px]">No song is currently playing.</p>
          </>
        )) ||
        (status >= 400 && (
          <>
            <p className="relative top-[56px]">
              Error retrieving data from Spotify.
            </p>
          </>
        )) ||
        // If init is false, then the token hasn't been read yet
        // This should be changed to a progress bar along with the final case, or a skeleton
        (!init && (
          <>
            <p className="relative top-[56px]">Loading data from Spotify...</p>
          </>
        )) ||
        (!token && (
          <>
            <p className="relative top-[56px]">
              Log in to Spotify to see what you're listening to.
            </p>
          </>
        )) || (
          <>
            <p className="relative top-[56px]">
              Loading currently playing song...
            </p>
          </>
        )}
    </section>
  );
};

export default SongData;
