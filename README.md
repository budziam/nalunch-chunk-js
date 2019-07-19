# NaLunch SDK JS [![CircleCI](https://circleci.com/gh/budziam/nalunch-sdk-js.svg?style=svg)](https://circleci.com/gh/budziam/nalunch-sdk-js)
SDK for developing application based on [NaLunch](https://nalunch.com) provided data.

## Usage
### Chunks
NaLunch splits world map into cacheable fixed size chunks. Example usage below

```js
const chunkCollectionStore = createChunkCollectionStore();

await chunkCollectionStore.load(
    {
        longitude: 50.50,
        latitude: 20.53,
    },
    moment(),
    5000,
);

console.log(chunkCollectionStore.lunchOffers);
```

## Installation
```bash
yarn add nalunch-sdk
```
```bash
npm install nalunch-sdk
```

## Run tests
All of the NaLunch SDK tests are written with jest. They can be run with yarn
```bash
yarn test
```

#### Author: [Michał Budziak]

[Michał Budziak]: http://github.com/budziam
