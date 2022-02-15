/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly COMMIT_HASH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
