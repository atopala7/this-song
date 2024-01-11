import React from "react";
import axios from "axios";

const BACKEND_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000"
    : "https://spotify-node1313-f6ce692711e7.herokuapp.com";

const GPT_SUMMARY_ENDPOINT = `${BACKEND_URI}/summary`;

const TopSongsSnippets = async ({ limit = 10, offset = 0 }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // let topSongs = null;
  // const summaries = new Map();
  // let errorMessage = "";

  // try {
  //   const { data } = await axios.get(`${BACKEND_URI}/client_token`);

  //   const token = data.access_token;

  //   console.log("Getting top songs...");

  //   // Today's top hits: 37i9dQZF1DXcBWIGoYBM5M
  //   // Rock classics: 37i9dQZF1DWXRqgorJj26U
  //   axios.defaults.baseURL = "https://api.spotify.com/v1";
  //   axios.defaults.headers["Content-Type"] = "application/json";
  //   topSongs = await axios.get(
  //     `https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks?limit=${limit}&offset=${offset}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   );

  //   const songs = topSongs.data.items;
  //   // console.log("songs", songs);

  //   await Promise.all(
  //     songs.map(async (element) => {
  //       // console.log(element.track.name);
  //       const songID = element.track.id;
  //       const songName = element.track.name;

  //       const gpt4Response = await fetch(GPT_SUMMARY_ENDPOINT, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           songID: songID,
  //           trackName: songName
  //         }),
  //         cache: "no-store"
  //       });

  //       if (gpt4Response.ok) {
  //         const summary = await gpt4Response.text();
  //         if (summary) {
  //           const firstLetter = summary.slice(13, 14);
  //           const restOfSummary = summary.slice(14);
  //           summaries.set(
  //             element.track.id,
  //             firstLetter.toUpperCase() + restOfSummary
  //           );
  //         }
  //       }
  //     })
  //   );
  // } catch (e) {
  //   console.log(e);
  //   errorMessage = JSON.stringify(e);
  //   errorMessage = e.code;
  // }

  return (
    <section className="w-full gap-1">
      <div className="flex flex-wrap items-center justify-center w-full">
        {/* {(topSongs &&
          topSongs.data.items.map((item, index) => ( */}
        {Array.from(new Array(20)).map((item, index) => (
          <div
            className={`top-song-snippet animate-slide-in flex m-[10px] max-w-[400px] transition-all duration-300 border-[1px] rounded-lg cursor-pointer md:w-[400px] w-full items-center justify-center overflow-hidden`}
            style={{
              transform: "translateX(30px)",
              opacity: 0,
              animationDuration: "500ms",
              animationDelay: `${index * 200}ms`
              // animationName: "slide-in"
            }}
            key={index}
          >
            <div className="w-full md:w-[400px] h-[225px] flex flex-col items-center justify-center">
              <div className="w-full md:w-[400px] h-full flex flex-col group hover:bg-card justify-center pb-2">
                <div className="flex items-center justify-center flex-grow max-h-[100px] w-full gap-2 px-3 overflow-hidden">
                  <p className="overflow-x-hidden duration-500 whitespace-nowrap text-ellipsis">
                    {index}
                    <br />
                    <span className="inline-flex justify-between text-muted">
                      {/* <span>Popularity: {item.track.popularity}</span> */}
                    </span>
                    <br />
                    {/* <span className="text-foreground">{item.album.name}</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )) || (
          <>
            <p>Failed to connect to server: {errorMessage}.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default TopSongsSnippets;
