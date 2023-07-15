declare module "bun" {
  export interface Env extends Dict<string>, NodeJS.ProcessEnv {
    NODE_ENV: string;
    TZ?: string;
    DB_PATH: string;
  }
}
