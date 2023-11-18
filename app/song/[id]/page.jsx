"use client";
import { TokenContext } from "@/context/ContextProvider";
import { getTrack } from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const Page = ({ params }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  // const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [song, setSong] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  const { token } = useContext(TokenContext);

  const ref = useRef(null);

  const { scrollY } = useScroll({});

  const scrollHeight = useTransform(scrollY, [0, 200], [300, 100]);

  const id = params.id;
  const pathname = usePathname();

  useEffect(() => {
    // Clear the previous state variables
    // setData(null);
    setStatus(null);
    setScrolled(false);

    const fetchData = async () => {
      console.log("Getting song...");
      const data = await getTrack(id);
      // console.log("data", data);

      if (data.status == 200) {
        setStatus(data.status);

        const thisSong = {
          id: id,
          album: data.data.album,
          artists: data.data.artists,
          link: data.data.external_urls.spotify,
          name: data.data.name,
          previewURL: data.data.preview_url,
          trackNumber: data.data.track_number
        };

        console.log("thisSong", thisSong);

        setSong(thisSong);
      }
    };
    catchErrors(fetchData());
  }, []);

  // These two functions are used to convert the album art to a base64 string representing a shimmer effect, which is used as a placeholder for the Image component
  // https://image-component.nextjs.gallery/shimmer
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  const shimmer = (
    w,
    h
  ) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  return (
    <section className="flex flex-col items-center justify-center align-bottom">
      {(song && (
        <>
          <div className="flex flex-col items-center justify-end text-center align-bottom h-[300px] w-full">
            <motion.div
              className={clsx(
                "flex flex-row items-center justify-center align-middle w-full fixed top-[56px] lg:left-[256px] lg:w-[calc(100dvw-256px-8px)] lg:top-0 md:gap-5",
                "bg-background"
                // "bg-card rounded-lg",
                // "border-red-500 border-2"
              )}
              style={{
                height: scrollHeight
              }}
            >
              <motion.div
                className="relative group"
                // className="border-2 border-red-500"
                // onClick={() => {
                //   getSong(null);
                // }}
                style={{
                  width: scrollHeight,
                  height: scrollHeight
                }}
              >
                <Image
                  className="absolute transition-all duration-500 opacity-100 md:group-hover:opacity-50 md:group-hover:rounded-[50%] md:group-hover:brightness-50 -z-10 h-full w-full"
                  src={song.album.images[1].url}
                  width={300}
                  height={300}
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(300, 300)
                  )}`}
                  alt="Album art"
                />
                <img
                  className="hidden md:block absolute [transition:opacity_0.5s,transform_1s] origin-center scale-75 rotate-0 opacity-0 group-hover:opacity-75 group-hover:rotate-[360deg] hover:opacity-100 h-full w-full z-10"
                  src="/images/refresh.png"
                />
              </motion.div>
              <div
                className={clsx(
                  "relative flex flex-col justify-center transition-all duration-500 overflow-hidden md:opacity-100 md:w-fit w-[0%] opacity-0",
                  // "border-red-500 border-2",
                  // scrolled ? "opacity-100 w-[300px]" : "w-[0%] opacity-0",
                  scrolled
                    ? "opacity-100 sm:w-[500px] w-[300px] flex-grow md:flex-grow-0"
                    : "w-[0%] opacity-0"
                )}
              >
                <h1
                  className="transform-all duration-500 text-base font-extra bold xl:text-3xl lg:text-xl text-[#1fdf64] min-w-[300px]"
                  onClick={() => {
                    console.log("scrollHeight: ", scrollHeight.current);
                  }}
                >
                  {song.name}
                  {/* {scrolled.toString()} */}
                  {/* {song.id} */}
                  {/* {scrollHeight.current} */}
                </h1>
                <h2 className="transform-all duration-500 text-base text-muted xl:text-2xl lg:text-lg min-w-[300px]">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </h2>
                <h3 className="transform-all duration-500 text-base xl:text-xl lg:text-lg min-w-[300px]">
                  {song.album.name}
                </h3>
              </div>
            </motion.div>
          </div>
          <div
            // id="scroll-target"
            ref={ref}
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-opacity duration-500 md:h-0 overflow-hidden"
              // scrolled ? "opacity-0 -z-10" : "opacity-100"
            )}
          >
            <h1
              className="text-3xl font-extrabold text-[#1fdf64]"
              onClick={() => {
                console.log("scrollHeight: ", scrollHeight.current);
              }}
            >
              {song.name}
              {/* {scrolled.toString()} */}
              {/* {song.id} */}
            </h1>
            <h2 className="text-2xl text-muted">
              {song.artists.map((artist) => artist.name).join(", ")}
            </h2>
            <h3 className="text-xl text-">{song.album.name}</h3>
          </div>
        </>
      )) ||
        (status >= 400 && (
          <>
            <p className="relative top-[56px]">
              Error retrieving data from Spotify.
            </p>
          </>
        )) || (
          <>
            <div className="flex flex-col items-center justify-center w-full gap-1 align-middle md:flex-row md:gap-5">
              <Skeleton className="w-[300px] h-[300px]" />
              <div className="flex flex-col items-center justify-center gap-1">
                <Skeleton className="w-[400px] h-[36px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[250px] h-[28px]" />
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default Page;