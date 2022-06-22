/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: { 
        'dodge-b': '#1e90ff',
        'dodge-d': '#0382ff',
        'sky-b': '#00AEF0'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
