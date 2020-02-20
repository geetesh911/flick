export const timeConvertor = time => {
  let convertedTime = "";
  if (time) {
    if (time % 60 === 0) convertedTime = `${Math.floor(time / 60)}h`;
    else
      convertedTime =
        Math.floor(time / 60) === 0
          ? `${Math.floor(time % 60)}min`
          : `${Math.floor(time / 60)}h ${Math.floor(time % 60)}min`;
  } else {
    convertedTime = "-";
  }
  return convertedTime;
};
