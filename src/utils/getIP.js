const getIP = async () => {
  let ip = "";

  try {
    let ipAddress = await fetch(`https://api6.ipify.org/?format=json`);
    ipAddress = await ipAddress.json();
    ip = ipAddress.ip;
  } catch (error) {
    let ipAddress = await fetch(`https://v4.ident.me/.json`);
    ipAddress = await ipAddress.json();
    ip = ipAddress.address;
  }
  return ip;
};

export default getIP;
