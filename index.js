const crypto = globalThis.crypto ?? require("crypto").webcrypto;

function simpleId(length = 8, chars = "23456789abcdefghjkmnpqrstuvwxyz") {
  if (typeof length != "number" || !Number.isInteger(length))
    throw new TypeError("length must be an integer");

  if (typeof chars != "string") throw new TypeError("chars must be a string");

  if (length < 1) throw new RangeError("length must be greater than 0");

  if (chars.length < 2)
    throw new RangeError("Length of chars must be greater than 1");

  const numValues = chars.length ** length;
  const numBytes = Math.ceil(Math.log2(numValues) / 8);
  const randValues = 2 ** (numBytes * 8);

  if (randValues > Number.MAX_SAFE_INTEGER)
    throw new RangeError("Number of possible random IDs is too large");

  const threshold = randValues % numValues;

  let randomNumber;
  const bytes = new Uint8Array(numBytes);
  do randomNumber = crypto.getRandomValues(bytes).reduce((n, b) => n * 256 + b);
  while (randomNumber < threshold);
  randomNumber %= numValues;

  let randomId = "";
  for (let i = randomNumber; i > 0; i = Math.trunc(i / chars.length))
    randomId = chars[i % chars.length] + randomId;
  randomId = randomId.padStart(length, chars[0]);

  return randomId;
}

module.exports = simpleId;
