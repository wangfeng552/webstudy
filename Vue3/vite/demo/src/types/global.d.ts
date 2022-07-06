// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

import type {
  // ComponentRenderProxy,
  // VNode,
  // ComponentPublicInstance,
  // FunctionalComponent,
  PropType as VuePropType,
} from "vue";

declare global {
  const packageName: string;
  declare interface Window {
    // Global vue app instance
    __APP__: App<Element>;
  }

  // vue
  declare type PropType<T> = VuePropType<T>;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_GLOB_APP_TITLE: string;

    VITE_ORIGIN_PRO: string;
    VITE_ORIGIN_PRO_TEST: string;
    VITE_ORIGIN_DEV: string;

    VITE_USE_MOCK: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_DROP_CONSOLE: boolean;
    VITE_GLOB_UPLOAD_API: string;
    VITE_GLOB_API_HOST: string;
    VITE_GLOB_UPLOAD_HOST: string;
    VITE_OPENID: string;

    VITE_USE_PWA: boolean;
    VITE_USE_CDN: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;

    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }
}
