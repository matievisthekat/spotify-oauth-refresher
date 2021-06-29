import { AxiosPromise, AxiosRequestConfig } from "axios";

declare module "spotify-oauth-refresher" {
  export default class Updater {
    constructor(config: UpdaterConfig);

    public storage: Storage;

    public get accessToken(): string | undefined;
    public get refreshToken(): string | undefined;
    public get base64Creds(): string;

    public setAccessToken(token: string): this;
    public setRefreshToken(token: string): this;

    public request<T = any>(config: UpdaterRequestConfig): AxiosPromise<T>;
    private refresh(): Promise<void>;
  }

  export interface UpdaterRequestConfig extends AxiosRequestConfig {
    authType?: AuthType;
  }

  export interface UpdaterConfig {
    clientSecret?: string;
    clientId: string;
  }

  export interface Storage {
    get<T = any>(name: string): T;
    set(name: string, value: any): void;
  }

  export type AuthType = "basic" | "bearer";
}
