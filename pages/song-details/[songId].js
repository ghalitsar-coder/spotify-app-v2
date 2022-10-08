import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../../components";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../../redux/services/shazamCore";

const SongDetails = () => {
  const {
    query: { songId },
  } = useRouter();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songId });
  const {
    data,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery({ songId });

  const handlePauseClick = (params) => {
    dispatch(playPause(false));
  };
  const handlePlayClick = ({ song, idx }) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };

  if (isFetchingSongRelated || isFetchingSongDetails)
    return <Loader title="Loading..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, idx) => (
              <p className="text-gray-100 text-base mt-1" key={idx}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-white text-base ">Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
