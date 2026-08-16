/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_URL: string
  readonly VITE_SOCKET_PORT: string
  readonly VITE_SKIP_MOVE_VALIDATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
