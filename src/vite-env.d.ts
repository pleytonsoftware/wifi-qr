/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly BASE_HOST: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
