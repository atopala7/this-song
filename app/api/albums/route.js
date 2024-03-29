import { NextResponse } from "next/server";
import axios from "axios";
import { getClientToken } from "@/lib/clientToken";

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const albumID = searchParams.get("albumID");

  console.log("albumID", albumID);

  try {
    const tokenResponse = await getClientToken();
    const token = tokenResponse.access_token;

    const albumResponse = await fetch(
      `https://api.spotify.com/v1/albums/${albumID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const albumData = await albumResponse.json();

    const newAlbum = {
      id: albumID,
      name: albumData.name,
      imageURL: albumData.images ? albumData.images[0].url : null,
      totalTracks: albumData.total_tracks,
      externalURL: albumData.external_urls.spotify,
      releaseData: albumData.release_date,
      artists: albumData.artists,
      tracks: albumData.tracks,
      genres: albumData.genres,
      label: albumData.label,
      popularity: albumData.popularity
    };

    return NextResponse.json(newAlbum);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
