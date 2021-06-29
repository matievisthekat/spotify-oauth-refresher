# Spotify OAuth Refresher

Refresh your Spotify access tokens, simple and easy

---

- <a href="#get-started">Getting Started</a>
- <a href="#examples">Examples</a>
- <a href="#docs">Documentation</a>
- <a href="#notes">Notes</a>
- <a href="#contributing">Contributing</a>
- <a href="#license">License</a>

---

<h3 id="get-started">Getting Started</h3>

First, install the package

```sh
npm install spotify-oauth-refresher
```

<small>or</small>

```sh
yarn add spotify-oauth-refresher
```

Then you are ready to go. Import the package into your project and start using it!

---

<h3 id="examples">Examples</h3>

```js
const Updater = require("spotify-oauth-refresher");
const api = new Updater({ clientId: "xxxxx", clientSecret: "xxxxx" }); // clientSecret is optional. See documentation below

const me = await api.request({
  url: "https://api.spotify.com/v1/me",
  method: "get",
  authType: "bearer",
});

console.log(me.id);
```

---

<h3 id="docs">Documentation</h3>

#### `class` Updater

##### Methods

- `constructor`

  - args
    - `config` **_\<[UpdaterConfig](#int-updater-config)\>_** Config for the updater class. See below for more details

- `setAccessToken`

  - args
    - `token` **_<string, required>_** The access token you want the client to use
  - returns
    - `this` The current class instance

- `setRefreshToken`

  - args
    - `token` **_<string, required>_** The refresh token you want the client to use
  - returns
    - `this` The current class instance

- `request`

  - args
    - `config` **_<[UpdaterRequestConfig](#int-updater-request-config), required>_** Config for making the request. Extends AxiosRequestConfig
  - returns
    - `AxiosPromise<T = any>` The return value of the axios request. Resolves to `AxiosResponse<T = any>`

- `refresh`
  - args
    - `none`
  - returns
    - `Promise<void>`

##### Properties

- <small>get</small> `accessToken` **_<string | undefined>_** The current access token in use

- <small>get</small> `refreshToken` **_<string | undefined>_** The current refresh token in use

- <small>get</small> `base64Creds` **_\<string\>_** Base64 encoded client credentials. Only use when clientSecret is provided

- `storage` **_\<[Storage](#cls-storage) | [Cookies](https://github.com/reactivestack/cookies/blob/master/packages/universal-cookie/README.md "Universal-cookie documentation for the Cookies class")\>_** The storage class. In browser environments it is an instance of the `universal-cookie` class. Otherwise it is an instance of the Storage class

#### `class` <span id="cls-storage">Storage</span>

##### Methods

- `set`

  - args
    - `name` **_<string, required>_** The name of the value
    - `value` **_<any, optional>_** The value that the name should represent
  - returns
    - `this` The current Storage instance

- `get`
  - args
    - `name` **_<string, required>_** The name of the value to fetch
  - returns
    - `<T = any>` Can be set using TypeScript type arguments. Defaults to `any`

#### `interface` <span id="int-updater-config">UpdaterConfig</span>

- `clientId`: **_<string, required>_** The id of your Spotify client
- `clientSecret` **_<string, optional>_** The secret of your Spotify client. Leave undefined if you don't intend on requesting any endpoints that require the `basic` authType

#### `interface` <span id="int-updater-request-config">UpdaterRequestConfig</span> <small>extends [AxiosRequestConfig](https://github.com/axios/axios#request-config "Axios documentation of AxiosRequestConfig")</small>

- `authType` **_<[AuthType](#typ-auth-type) | undefined>_** The authorization type to use

#### `type` <span id="typ-auth-type">AuthType</span>

- `bearer`|`basic` Either of these two strings

---

<h3 id="notes">Notes</h3>

Requests are handled through the `Updater.requests` method so that it can automatically refresh the tokens when a request fails due to expired tokens

---

<h3 id="contributing">Contributing</h3>
Any contributions are welcomed, from typo fixes to feature additions :)

---

<h3 id="license">License</h3>
This project is licensed under the MIT license
<br />
<br />

<small>
Copyright 2021 Matthew Stead

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</small>
