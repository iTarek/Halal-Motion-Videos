// webpack's require.context (Remotion bundles with webpack) — used to discover brands.
declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      useSubdirectories: boolean,
      regExp: RegExp,
    ): { keys(): string[]; (id: string): unknown };
  }
}
