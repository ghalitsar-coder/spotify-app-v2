import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Link from "next/link";
import Image from "next/image";
import PlayPause from "./PlayPause";

const TopChartCard = ({
  song,
  idx,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 ">
    <h3 className="font-bold text-base text-white mr-3">{idx + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center ">
      <img
        className="w-20 h-20 rounded-lg "
        src={song?.images?.coverart}
        alt="song-image"
      />
      <div className="flex-1 flex flex-col justify-center mx-3 ">
        <p className="text-xl font-bold text-white ">
          <Link href={`/song-details/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className="text-base  text-gray-300 mt-1 ">
          <Link href={`/artist-details/${song?.artists[0]?.adamid}`}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying,  } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col "
    >
      <div className="w-full flex flex-col ">
        <div
          className="flex flex-row justify-between items-center
         "
        >
          <h2 className="text-white font-bold text-2xl  "> Top Charts </h2>
          <p className="text-gray-300 text-base cursor-pointer ">
            <Link href={`/top-charts`}>See more</Link>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((item, idx) => (
            <TopChartCard
              key={item.key}
              song={item}
              idx={idx}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(item, idx)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div
          className="flex flex-row justify-between items-center
         "
        >
          <h2 className="text-white font-bold text-2xl  "> Top Artist </h2>
          <p className="text-gray-300 text-base cursor-pointer ">
            <Link href={`/top-artists`}>See more</Link>
          </p>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, idx) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className={
                "w-1/4 h-auto shadow-lg rounded-full cursor-pointer animate-slideright"
              }
            >
              <Link href={`/artist-details/${song?.artists[0]?.adamid}`}>
                <img
                  alt="song-image"
                  src={song?.images.background}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
