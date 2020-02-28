import Axios from "axios";

const getIP = async () => {
  let ip = "";

  try {
    let ipAddress = await Axios.get(`https://v6.ident.me/.json`);
    ip = ipAddress.data.address;
  } catch (error) {
    let ipAddress = await Axios.get("https://v4.ident.me/.json");
    ip = ipAddress.data.address;
  }
  return ip;
};

export default getIP;
