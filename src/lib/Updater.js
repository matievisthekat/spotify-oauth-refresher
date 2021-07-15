const axios = require("axios");
const Storage = require("./Storage");
const qs = require("querystring");
const { cookies } = require("../util");

module.exports = class Updater {
  storage = new Storage();

  constructor(conf) {
    if (!conf) throw new Error("[Updater.constructor] No config provided");
    const { clientId, clientSecret } = conf;

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

    this.storage.set(cookies.accessToken, token, { path: "/" });
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

    this.storage.set(cookies.refreshToken, token, { path: "/" });
    return this;
  }

  /**
   * @param {UpdaterRequestConfig} config Request config for Axios
   * @returns {AxiosPromise} The response from the Spotify API in the form of an AxiosPromise
   * @example
   * updater.request({
   *   method: "get",
   *   url: "https://api.spotify.com/v1/me",
   *   authType: "bearer"
   * });
   *
   * updater.request({
   *   method: "post",
   *   url: "https://accounts.spotify.com/api/token",
   *   data: {
   *     grant_type: "refresh_token",
   *     refresh_token: "xxxxx"
   *   },
   *   authType: "basic"
   * });
   */
  request(config) {
    if (!config.headers) config.headers = {};

    if (config.authType === "bearer" && !this.accessToken) throw new Error("[Updater.request] No access token set");

    if (config.authType === "bearer") config.headers.Authorization = `Bearer ${this.accessToken}`;
    if (config.authType === "basic") config.headers.Authorization = `Basic ${this.base64Creds}`;

    if (!config.headers["Content-Type"]) config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (config.data && typeof config.data !== "string") config.data = qs.stringify(config.data);

    return new Promise((resolve, reject) => {
      axios(config)
        .then((res) => resolve(res))
        .catch((err) => {
          const msg = err.response.data.error.message;
          if (msg === "The access token expired") {
            this.refresh()
              .then(async () => resolve(await this.request(config)))
              .catch(reject);
          } else reject(err.response.data);
        });
    });
  }

  /**
   * @returns {Promise<void>}
   */
  refresh() {
    return new Promise((resolve, reject) => {
      this.request({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: {
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        },
        authType: "basic",
      })
        .then(({ data }) => {
          this.setAccessToken(data.access_token);
          if (data.refresh_token) this.setRefreshToken(data.refresh_token);
          resolve();
        })
        .catch(reject);
    });
  }
};
