import axios from "axios";

// put your api keys in .env file you can get those here - https://developers.google.com/youtube/v3/getting-started
export const selectRandomKey = () => {
  //   const keys = process.env.REACT_APP_YouTube_Keys.split(" "); //we are splitting the api keys to make an array
  const keys = "".split(" "); //we are splitting the api keys to make an array
  const random = Math.floor(Math.random() * Math.floor(keys.length)); //this will get a random number
  return keys[random];
};

const axClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

axClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["part"] = "snippet";
  config.params["videoCategoryId"] = "10";
  config.params["type"] = "video";
  config.params["key"] = process.env.GOOGLE_KEY;
  return config;
});

export default axClient;
