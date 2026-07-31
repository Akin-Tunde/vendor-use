/** @type {import('tailwindcss').Config} */
module.exports = {
    // IMPORTANT: Path to your components
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#4F26D9',
                secondary: '#4CD964',
            },
        },
    },
    plugins: [],
};