import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// let headersList = {
//  "Accept": "*/*",
//  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//  "X-RapidAPI-Key": "5bf9675b2dmsh57fccfe4f29b10fp1bbfcajsn894da056b96d",
//  "X-RapidAPI-Host": "shazam-core.p.rapidapi.com"
// }

// let reqOptions = {
//   url: "https://shazam-core.p.rapidapi.com/v1/charts/world",
//   method: "GET",
//   headers: headersList,
// }

// let response = await axios.request(reqOptions);
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        process.env.NEXT_PUBLIC_SHAZAM_CORE_RAPID_API_KEY
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "charts/world" }),
    getSongsByGenre: builder.query({
      query: (genre) => `charts/genre-world?genre_code=${genre}`,
    }),
    getSongRelated: builder.query({
      query: ({ songId }) => `tracks/related?track_id=${songId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songId }) => `tracks/details?track_id=${songId}`,
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => `artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongRelatedQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
