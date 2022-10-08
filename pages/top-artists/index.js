import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ArtistCard, Error, Loader, SongCard } from "../../components";
import { useGetTopChartsQuery } from "../../redux/services/shazamCore";

const TopArtists = () => {
  // at_WT64yslcgZZJvNQrdaEHHY22st8fp
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching )
    return <Loader title="Loading Top Artists ..." />;
  if (error && country && !isFetching) return <Error />;
  return (
    <div className="flex flex-wrap sm:justify-start ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 ">
        Top Artist
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((track, idx) => (
          <ArtistCard
            key={track.key}
            track={track}
            
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
