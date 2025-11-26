/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GEMINI_API_KEY?: string;
  readonly API_KEY?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY?: string;
    readonly GEMINI_API_KEY?: string;
    readonly NODE_ENV?: 'development' | 'production' | 'test';
  }
}
