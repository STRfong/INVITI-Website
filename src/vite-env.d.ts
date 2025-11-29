/// <reference types="vite/client" />

declare module '*.csv?raw' {
  const content: string;
  export default content;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

interface ImportMeta {
  glob(pattern: string, options?: { as?: 'raw' | 'url'; eager?: boolean }): Record<string, string | (() => Promise<string>)>;
}

