import { AxiosPromise, AxiosRequestConfig } from "axios";
import Cookies, { CookieGetOptions, CookieSetOptions } from "universal-cookie";

declare module "spotify-oauth-refresher" {
  export default class Updater {
    constructor(config: UpdaterConfig);

    public storage: Storage | Cookies;

    public get accessToken(): string | undefined;
    public get refreshToken(): string | undefined;
    public get base64Creds(): string;

    public setAccessToken(token: string): this;
    public setRefreshToken(token: string): this;

    public removeAccessToken(): this;
    public removeRefreshToken(): this;

    public request<T = any>(config: UpdaterRequestConfig): AxiosPromise<T>;
    private refresh(): Promise<void>;
  }

  export class Storage {
    constructor();

    get<T = any>(name: string): T;
    set(name: string, value: any, opts: CookieSetOptions): this;
  }

  export interface UpdaterRequestConfig extends AxiosRequestConfig {
    authType?: AuthType;
  }

  export interface UpdaterConfig {
    clientSecret: string;
    clientId: string;
  }

  export type AuthType = "basic" | "bearer";
}
