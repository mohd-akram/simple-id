const crypto = require("crypto");

module.exports = (length = 8, chars = "23456789abcdefghjkmnpqrstuvwxyz") => {
  const defaultChars = "0123456789abcdefghijklmnopqrstuvwxyz";

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

  do {
    const bytes = crypto.randomBytes(numBytes);
    var randomNumber = parseInt(bytes.toString("hex"), 16);
  } while (randomNumber >= threshold);

  randomNumber %= numValues;

  const randomId = randomNumber
    .toString(chars.length)
    .replace(/./g, (m) => chars[defaultChars.indexOf(m)])
    .padStart(length, chars[0]);

  return randomId;
};
