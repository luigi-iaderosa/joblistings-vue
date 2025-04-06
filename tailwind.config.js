/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html','./src/*.{vue,js,jsx,tsx}','./src/**/*.{vue,js,jsx,tsx}'],
    theme : {
        extend : {
            fontFamily: {
                sans:['Poppins','sans-serif']
            },
            gridTemplateColumns: {
                '70/30': '70% 28%'
            }
        }
    }
}