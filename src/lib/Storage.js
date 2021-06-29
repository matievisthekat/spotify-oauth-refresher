const Cookies = require("universal-cookie");

class Storage {
  constructor() {
    this.data = {};
  }

  set(name, value) {
    this.data[name] = value;
  }

  get(name) {
    return this.data[name];
  }
}

module.exports = typeof window === "undefined" ? Storage : Cookies;
