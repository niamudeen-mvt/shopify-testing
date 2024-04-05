/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        "primary":'#ddd6fe',
        "secondary":'#8b5cf6',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
