const assert = require("assert");
const simpleId = require(".");

const defaultLength = 8;
const defaultChars = "23456789abcdefghjkmnpqrstuvwxyz";

const runs = 100000;

const ids = {};
const chars = {};

for (let i = 0; i < runs; i++) {
  const id = simpleId();
  assert.equal(id.length, defaultLength);
  ids[id] = (ids[id] || 0) + 1;
  for (const c of id) chars[c] = (chars[c] || 0) + 1;
}

// Valid chars
assert.equal(Object.keys(chars).sort().join(""), defaultChars);

// Unique IDs
assert.equal(Math.max.apply(Math, Object.values(ids)), 1);

// Uniform distribution
const average = (runs * defaultLength) / defaultChars.length;
for (const char in chars) {
  const ratio = chars[char] / average;
  assert(ratio > 0.95 && ratio < 1.05, `ratio = ${ratio}`);
}

// Correct lengths
for (let length = 1; length < 10; length++)
  assert.equal(simpleId(length).length, length);

// Invalid length type
assert.throws(() => simpleId("1"), TypeError);
assert.throws(() => simpleId(1.5), TypeError);

// Invalid chars type
assert.throws(() => simpleId(defaultLength, 1234), TypeError);

// Invalid length
assert.throws(() => simpleId(0), RangeError);

// Invalid chars
assert.throws(() => simpleId(defaultLength, "0"), RangeError);
assert.throws(
  () => simpleId(defaultLength, "0123456789abcdefghijklmnopqrstuvwxyzA"),
  RangeError
);

// Out of range
assert.throws(
  () => simpleId(10, "0123456789abcdefghijklmnopqrstuvwxyz"),
  RangeError
);
assert.throws(() => simpleId(49, "01"), RangeError);
