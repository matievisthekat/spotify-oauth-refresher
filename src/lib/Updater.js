const axios = require("axios");
const Storage = require("./Storage");
const qs = require("querystring");
const { cookies } = require("../util");

class Updater {
  storage = new Storage();

  constructor({ clientId, clientSecret }) {
    if (!clientId) throw new Error("[Updater.constructor] No clientId provided");
    if (!clientSecret) throw new Error("[Updater.constructor] No clientSecret provided");
    if (typeof clientId !== "string") throw new TypeError("[Updater.constructor] clientId is not a string");
    if (typeof clientSecret !== "string") throw new TypeError("[Updater.constructor] clientSecret is not a string");

    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  get accessToken() {
    return this.storage.get(cookies.accessToken);
  }

  get refreshToken() {
    return this.storage.get(cookies.refreshToken);
  }

  get base64Creds() {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
  }

  /**
   * @param {String} token
   * @returns The updater class
   * @example
   * updater.setAccessToken("xxxxx");
   */
  setAccessToken(token) {
    if (!token) throw new Error("[Updater.setAccessToken] No token provided");
    if (typeof token !== "string") throw new TypeError("[Updater.setAccessToken] Token is not a string");

    this.storage.set(cookies.accessToken, token);
    return this;
  }

  /**
   * @param {String} token The refresh token to use
   * @returns {this} The updater class
   * @example
   * updater.setRefreshToken("xxxxx");
   */
  setRefreshToken(token) {
    if (!token) throw new Error("[Updater.setRefreshToken] No token provided");
    if (typeof token !== "string") throw new TypeError("[Updater.setRefreshToken] Token is not a string");

    this.storage.set(cookies.refreshToken, token);
    return this;
  }

  /**
   * @param {AxiosRequestConfig} config Request config for Axios
   * @param {Auth} auth Authorization type. Leave undefined if you want to set your own Authorization header or don't need authorization
   * @returns {AxiosPromise} The response from the Spotify API in the form of an AxiosPromise
   * @example
   * updater.request({
   *  method: "get",
   *  url: "https://api.spotify.com/v1/me",
   *  authType: "bearer"
   * });
   *
   * updater.request({
   *  method: "post",
   *  url: "https://accounts.spotify.com/api/token",
   *  data: {
   *    grant_type: "refresh_token",
   *    refresh_token: "xxxxx"
   *  },
   *  authType: "basic"
   * });
   */
  request(config) {
    if (!config.headers) config.headers = {};
    if (config.authType === "bearer" && !this.accessToken) throw new Error("[Updater.request] No access token set");

    if (config.authType === "bearer") config.headers.Authorization = `Bearer ${this.accessToken}`;
    else if (config.authType === "basic") config.headers.Authorization = `Basic ${this.base64Creds}`;

    if (!config.headers["Content-Type"]) config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (config.data && typeof config.data !== "string") config.data = qs.stringify(config.data);

    return new Promise((resolve, reject) => {
      axios(config)
        .then((res) => resolve(res))
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  }
}

module.exports = Updater;
