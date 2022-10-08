import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../../components";
import { useGetSongsByCountryQuery } from "../../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(
    country && country
  );

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { data } = await axios.get(
          `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
        );
        setCountry(data?.location?.country);
        setLoading(false);
      } catch (err) {
        console.log("THIS IS ERROR ->", err);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [country]);

  console.log("THIS IS COUNTRY ->", country);
  if (isFetching && loading)
    return <Loader title="Loading Songs Around You..." />;
  if (error && country && !isFetching) return <Error />;
  return (
    <div className="flex flex-wrap sm:justify-start ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 ">
        Around You <span className="font-black" > {country} </span>
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

export default AroundYou;
