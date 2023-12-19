import { React, useState, useEffect, useContext } from "react";
import {
  getAccessToken,
  getRecentlyPlayed,
  hasTokenExpired
} from "@/lib/spotify";
import { catchErrors } from "@/lib/utils";

import SongItem from "@/components/ui/song-item";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { TokenContext } from "@/context/ContextProvider";

const Recent = ({ setShowMenu }) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
   * Status is the response status
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const { token, setToken } = useContext(TokenContext);

  const pathname = usePathname();

  useEffect(() => {
    getRecentSongs();
  }, []);

  // Awaits the songs that have been recently played and sets state variables accordingly
  const getRecentSongs = () => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    // console.log("Getting recent songs...");
    const fetchData = async () => {
      let accessToken = token;
      if (!accessToken) {
        console.log("No access token found. Getting access token...");
        accessToken = getAccessToken();
        console.log(accessToken);
        setToken(accessToken);
      } else if (hasTokenExpired(accessToken)) {
        console.log("Access token has expired. Getting new access token...");
        accessToken = getAccessToken();
        console.log(accessToken);
        setToken(accessToken);
      }
      const recentSongs = await getRecentlyPlayed(accessToken);
      // console.log("recentSongs", recentSongs);
      setData(recentSongs.data);
      setStatus(recentSongs.status);
    };

    catchErrors(fetchData());
  };

  return (
    <>
      {(data &&
        data.items.map((item, index) => (
          <SongItem
            // We can't set the key to the song's id because the same song could be in the recently-played list multiple times, so we'll use the index instead
            key={index}
            item={item.track}
            path={pathname}
            setShowMenu={setShowMenu}
          />
        ))) ||
        (status == 204 && (
          <>
            <p>No content to display.</p>
          </>
        )) ||
        new Array(10).fill(0).map((item, index) => (
          <div className="py-3" key={index}>
            <div className="flex flex-row items-start justify-start w-full gap-1 align-middle">
              <Skeleton className="min-w-[64px] min-h-[64px] w-[64px] h-[64px]" />
              <div className="flex flex-col items-start justify-start gap-2">
                <Skeleton className="w-[200px] h-[16px]" />
                <Skeleton className="w-[100px] h-[16px]" />
                <Skeleton className="w-[150px] h-[16px]" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Recent;
