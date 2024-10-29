import { defineConfig } from 'vite';
import angular from 'vite-plugin-angular';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    plugins: [angular()],
    define: {
        'import.meta.env': {
            VITE_EMAILJS_PUBLIC_KEY: JSON.stringify(process.env['VITE_EMAILJS_PUBLIC_KEY']),
            VITE_EMAIL_SERVICE_ID: JSON.stringify(process.env['VITE_EMAIL_SERVICE_ID']),
            VITE_EMAILJS_TEMPLATE_ID: JSON.stringify(process.env['VITE_EMAILJS_TEMPLATE_ID']),
        },
    },
});
