/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                primary: {
                    light: '#FFB6C1', // Light Pink
                    DEFAULT: '#FF69B4', // Hot Pink
                    dark: '#C71585', // Deep Rose
                }
            }
        },
    },
    plugins: [],
}
