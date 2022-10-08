import React from "react";
import { Sidebar, Searchbar, TopPlay, MusicPlayer } from ".";
import { useSelector } from "react-redux";
import Head from "next/head";

const Layout = ({ children }) => {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <>
    <Head>
        <title>Lyrics</title>
        <meta name="description" content="music app, listen music app, music, songs, etc" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content="https://ghalitsardev-travel-app.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lyrics" />
        <meta
          property="og:description"
          content="music app, listen music app, music, songs, etc"
        />
        <meta
          property="og:image"
          content="https://ghalitsardev-travel-app.vercel.app/aplikasi-travel-online.jpg"
        />
      </Head>
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">{children}</div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
    </>
  );
};

export default Layout;
