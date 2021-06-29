module.exports = require("./lib/Updater");

// for dev purposes
const updater = new (require("./lib/Updater"))({
  clientId: "76d4b7cc92a94b3197de9a8036bd64e1",
  clientSecret: "c25fc07c6edd416f95915ff8651ef907",
})
  .setAccessToken(
    "BQBmnZBgK7yDygFTMHttqGG93HfZHMeymzEf2FObce_f1J69XXzFXKusjyvuVACg6pj0KIMHvSy1Dm0VRHKRafSJBdCA-YsP_6O5DqB72TWttSBPHOGhEsUG57cAeuKWVxAKEGGyeLIGSEbHcRgEd9oxFf4fgZjsko0eyTC0-Qpq14hp2QzeDuQ"
  )
  .setRefreshToken(
    "AQBpbeQ_TiTFnjxB5z5v1Q0rqhQraAsfr8gGAL44hc_W0W7j__9aNGChKLD7K0b4JANy2D4erujqcIgUL7DhJgH3jBFtwTJ22OzDBh_uIEVz8MYqYy-bQZee_V2Qc2xKZZk"
  );

updater
  .request({
    url: "https://api.spotify.com/v1/me",
    authType: "bearer",
  })
  .then(({ data }) => console.log(data));

// updater
//   .request({
//     url: "https://api.spotify.com/v1/search",
//     authType: "bearer",
//     params: {
//       q: "things",
//       type: "track",
//     },
//   })
//   .then(({ data }) => console.log(data.tracks.items[0]));

// updater
//   .request({
//     url: "https://api.spotify.com/v1/audio-features/5QS8PNEWbqTEZyQ6e9ZbJf",
//     authType: "bearer",
//   })
//   .then(({ data }) => console.log(data));
