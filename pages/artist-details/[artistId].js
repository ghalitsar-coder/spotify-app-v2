import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../../components";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import {
    useGetArtistDetailsQuery,
} from "../../redux/services/shazamCore";

const ArtistDetails = () => {
  const {
    query: { artistId },
  } = useRouter();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails,error } =
    useGetArtistDetailsQuery({ artistId });
  if ( isFetchingArtistDetails)
    return <Loader title="Loading..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      
      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
