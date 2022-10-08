import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../../components";
import {
  useGetSongsBySearchQuery,
  useGetTopChartsQuery,
} from "../../redux/services/shazamCore";

const Search = () => {
  // at_WT64yslcgZZJvNQrdaEHHY22st8fp
  const { query } = useRouter();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(
    query.searchTerm
  );
  const songs = data?.tracks?.hits?.map((item) => item.track);

  if (isFetching) return <Loader title="Loading Songs Around You..." />;
  if (error && country && !isFetching) return <Error />;
  return (
    <div className="flex flex-wrap sm:justify-start ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 ">
        Showing results for <span className="font-black">{query.searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {songs?.map((song, idx) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
