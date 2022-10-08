import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
const SongCard = ({ idx, song, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  console.log('THIS IS SONG ->',song)
  console.log('THIS IS ACTIVE SONG ->',activeSong)
  const handlePauseClick = (params) => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (params) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer  ">
      <div className="relative w-full h-56 group ">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.key === song?.key
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          } `}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img
          alt="song_image"
          layout="responsive"
          height={"100%"}
          width={"100%"}
          src={song.images?.coverart}
        />
      </div>
      <div className="mt-4 grid">
        <p className="font-semibold text-lg text-white truncate ">
          <Link href={`/song-details/${song?.key}`}>{song.title}</Link>
        </p>
        <p className=" text-sm text-gray-300 mt-1 ">
          <Link
            href={
              song?.artists
                ? `/artist-details/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
