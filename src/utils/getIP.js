const getIP = async () => {
  let ip = "";

  try {
    let ipAddress = await fetch(`https://api6.ipify.org/?format=json`);
    ipAddress = await ipAddress.json();
    ip = ipAddress.ip;
    console.log(ip);
  } catch (error) {
    console.log("object");
    let ipAddress = await fetch(`https://v4.ident.me/.json`);
    ipAddress = await ipAddress.json();
    console.log(ipAddress);
    ip = ipAddress.address;
  }
  return ip;
};

export default getIP;
