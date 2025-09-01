//for beautifying the given string input

export default function beautifyString(str) {
  const strcopy = str;
  const beautifyStr = str.charAt(0).toUpperCase() + strcopy.slice(1);
  console.log("Beautfyied string is:", beautifyStr);
  return beautifyStr;
}
