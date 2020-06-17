// import React, { useState, useEffect } from "react";
// import Spotify from "spotify-web-api-js";

// const spotifyWebApi = new Spotify();

// export const Music = () => {
//   function getHashParams() {
//     var hashParams = {};
//     var e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

//   const [params, setParams] = useState(getHashParams());
//   const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
//   const [nowPlaying, setNowPlaying] = useState({
//     name: "not checked",
//     image: "",
//   });

//   useEffect(() => {
//     console.log(params);
//     if (params.access_token) {
//       spotifyWebApi.setAccessToken(params.access_token);
//     }
//     // eslint-disable-next-line
//   }, []);

//   const getNowPlaying = () => {
//     spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
//       setNowPlaying({
//         name: response.item.name,
//         image: response.item.album.images[0].url,
//       });
//     });
//   };

//   return (
//     <div>
//       <a href="http://localhost:8888">
//         <button>Log in spotify</button>
//       </a>
//       <div>Now Playing: {nowPlaying.name}</div>
//       <img src={nowPlaying.image} alt="" />
//       {loggedIn && (
//         <button onClick={() => getNowPlaying()}>Check Now Playing</button>
//       )}
//     </div>
//   );
// };

// import React, { useEffect } from "react";
// // import SoundCloudAudio from "soundcloud-audio"
// import SC from "https://connect.soundcloud.com/sdk/sdk-3.3.2.js";

// // const scPlayer = new SoundCloudAudio('b8f06bbb8e4e9e201f9e6e46001c3acb');

// export const Music = () => {
//   useEffect(() => {
//     SC.initialize({
//       client_id: "b8f06bbb8e4e9e201f9e6e46001c3acb",
//     });
//     SC.get("/tracks", {
//       q: "jai ho",
//       // license: "cc-by-sa",
//     }).then(function (tracks) {
//       console.log(tracks);
//     });
//   }, []);
//   return <div></div>;
// };
