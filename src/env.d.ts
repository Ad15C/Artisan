/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_EMAILJS_PUBLIC_KEY: string;
  VITE_EMAIL_SERVICE_ID: string;
  VITE_EMAILJS_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
