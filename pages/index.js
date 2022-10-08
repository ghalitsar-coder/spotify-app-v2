import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { genres } from "../assets/constants";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByGenreQuery, useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
const Home = () => {
  const { activeSong, isPlaying ,genreListId} = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");
  const dispatch = useDispatch();

  if (isFetching) return <Loader title="Loading..." />;
  if (!isFetching && error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 ">
        <h2 className="font-bold text-3xl text-white text-left ">Discover</h2>
        <select
          name="genre"
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          id="genre"
          value={genreListId || "pop"}
        >
          {genres.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((song, idx) => (
          <SongCard
            key={song.key}
            song={song}
            idx={idx}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
