const Cookies = require("universal-cookie").default;

class Storage {
  constructor() {
    this.data = {};
  }

  set(name, value) {
    this.data[name] = value;
    return this;
  }

  get(name) {
    return this.data[name];
  }
}

module.exports = typeof window === "undefined" ? Storage : Cookies;
