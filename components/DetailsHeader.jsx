import Link from "next/link";
import React from "react";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId]?.attributes;
  return (
    <div className="relative w-full flex flex-col mb-5">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28 ">
        <div className="absolute inset-0 flex items-center ">
          <img
            src={
              artistId
                ? artist?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black "
          />
          <div className="ml-5">
            <p className="font-bold text-white sm:text-3xl text-xl">
              {" "}
              {artistId ? artist?.name : songData?.title}{" "}
            </p>
            {!artistId && (
              <p className="text-base text-gray-400 mt-2">
                <Link href={`/artist-details/${songData?.artists[0]?.adamid}`}>
                  {songData?.subtitle || ""}
                </Link>
              </p>
            )}
            <p className="text-base text-gray-400 mt-2">
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24 " />
    </div>
  );
};

export default DetailsHeader;
