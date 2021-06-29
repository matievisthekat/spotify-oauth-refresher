const serialize = (name) => `spotify-oauth-refresher___${name}`;

const cookies = {
  refreshToken: serialize("refreshToken"),
  accessToken: serialize("accessToken"),
};

module.exports = { serialize, cookies };
