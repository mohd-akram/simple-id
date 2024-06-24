const crypto = globalThis.crypto ?? require("crypto").webcrypto;

function simpleId(length = 8, chars = "23456789abcdefghjkmnpqrstuvwxyz") {
  if (typeof length != "number" || !Number.isInteger(length))
    throw new TypeError("length must be an integer");

  if (typeof chars != "string") throw new TypeError("chars must be a string");

  if (length < 1) throw new RangeError("length must be greater than 0");

  if (chars.length < 2 || chars.length > 36)
    throw new RangeError("Length of chars must be between 2 and 36");

  const numValues = chars.length ** length;
  const numBytes = Math.ceil(Math.log2(numValues) / 8);
  const randValues = 2 ** (numBytes * 8);

  if (randValues > Number.MAX_SAFE_INTEGER)
    throw new RangeError("Number of possible random IDs is too large");

  const threshold = randValues - (randValues % numValues);

  let randomNumber;

  const bytes = new Uint8Array(numBytes);
  do {
    crypto.getRandomValues(bytes);
    randomNumber = 0;
    for (let i = 0; i < bytes.length; i++)
      randomNumber = randomNumber * 256 + bytes[i];
  } while (randomNumber >= threshold);

  randomNumber %= numValues;

  const randomString = randomNumber
    .toString(chars.length)
    .padStart(length, "0");

  let randomId = "";
  for (const c of randomString) {
    const i = c.charCodeAt(0) - "a".charCodeAt(0);
    randomId += chars[i < 0 ? i + "0".charCodeAt(0) + 1 : i + 10];
  }

  return randomId;
}

module.exports = simpleId;
