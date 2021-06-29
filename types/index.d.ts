import { AxiosPromise, AxiosRequestConfig } from "axios";

declare module "spotify-oauth-refresher" {
  export = class Updater {
    constructor(config: UpdaterConfig);

    public storage: Storage;

    public get accessToken(): string | undefined;
    public get refreshToken(): string | undefined;
    public get base64Creds(): string;

    public setAccessToken(token: string): this;
    public setRefreshToken(token: string): this;

    public request<T = any>(config: UpdaterRequestConfig): AxiosPromise<T>;
    public refresh(): Promise<void>;
  };

  export interface UpdaterRequestConfig extends AxiosRequestConfig {
    authType: Auth;
  }

  export interface UpdaterConfig {
    clientSecret: string;
    clientId: string;
  }

  export interface Storage {
    get<T = any>(name: string): T;
    set(name: string, value: any): void;
  }

  export type Auth = "basic" | "bearer";
}
