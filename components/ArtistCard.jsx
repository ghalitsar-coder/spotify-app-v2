import { useRouter } from "next/router";

const ArtistCard = ({track}) => {
  const router = useRouter()

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer " 
    onClick={() => router.push(`/artists/${track?.artists[0]?.adamid}`) } >
      <img src={track?.images?.coverart} alt="images-artist" className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg truncate " > {track?.subtitle} </p>
    </div>
    )
};

export default ArtistCard;
