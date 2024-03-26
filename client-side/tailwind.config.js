/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      //color scheme 
      colors:{
        'primary':'#560BAD',
        'primaryHover':'#353232',      //how to use in tailwind : className = 'bg-primary text-light-gray'
        'secondary':'#F72585',
        'secondaryHover':'#DD096A',
        'off-white':'#F8F9FA',
        'black':'#000000',
        'blackHover':'#2d2d2d',
        'white':'#FFFFFF',
        'light-gray': '#B9B9B9',
        'deep-gray':'#4F4F4F',
        'gray':'#5F5F5F',
        'red':'#FF6363',
        'redHover':'#e04c4c',
        
      },

      //font-family          
      fontFamily:{
        'poppins' : ['Poppins', 'sans-serif'], //how to use in tailwind : className = 'font-poppins'
        'roboto' : ['Roboto', 'sans-serif'],
        'lato' : ['Lato', 'sans-serif'],
        'comforter':['Comforter Brush','cursive'],
      },


      backgroundImage: {
        'clientHeroImg': "url('/src/images/hero_bg.jpg')",
      },


      //underline-custom
      textUnderlineOffset: {
        5: '5px',
      },
      //footer-custom
      height: {
        '128': '40rem',
      }
      
    },
  },
  plugins: [],
}

