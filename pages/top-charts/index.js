import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../../components";
import { useGetTopChartsQuery } from "../../redux/services/shazamCore";

const TopCharts = () => {
  // at_WT64yslcgZZJvNQrdaEHHY22st8fp
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Songs Around You..." />;
  if (error && country && !isFetching) return <Error />;
  return (
    <div className="flex flex-wrap sm:justify-start ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 ">
        Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((song, idx) => (
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

export default TopCharts;
