import { NextResponse } from "next/server";
import { getClientToken } from "@/lib/clientToken";

export async function GET(request, { params }) {
  const songID = [params.id];
  const tokenResponse = await getClientToken();
  const token = tokenResponse.access_token;

  console.log(`https://api.spotify.com/v1/tracks/${songID}`);
  const songResponse = await fetch(
    `https://api.spotify.com/v1/tracks/${songID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  // console.log("songResponse", songResponse);

  const songData = await songResponse.json();

  // console.log("songData", songData);

  const newSong = {
    id: songID,
    name: songData.name,
    artistName: songData.artists[0].name,
    albumName: songData.album.name,
    imageURL: songData.album?.images ? songData.album.images[2].url : null,
    description: songData.description,
    spotifyURL: songData.external_urls.spotify
      ? songData.external_urls.spotify
      : "#",
    previewURL: songData.preview_url
  };

  return NextResponse.json(newSong);
}
