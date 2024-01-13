# simple-id

A library for generating short, user-friendly, random IDs.

## Install

    npm install simple-id

## Usage

```javascript
const simpleId = require("simple-id");
simpleId();
```

By default, an 8-character random ID is generated using a 31-character alphabet
(`23456789abcdefghjkmnpqrstuvwxyz`) which notably excludes the uppercase
letters and `01ilo` to avoid ambiguity. This gives about 853 billion possible
permutations. A different length and/or alphabet can be passed as follows:

```javascript
simpleId(9);
simpleId(8, "0123456789abcdef");
```

## Implementation

The implementation uses Node's cryptographically strong `crypto.randomBytes()`
function and provides uniformly distributed random IDs. It has no other
dependencies.
