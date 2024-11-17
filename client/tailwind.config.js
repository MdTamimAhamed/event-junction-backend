/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            //color scheme
            colors: {
                primary: '#171B26',
                foreground: '#191d2a',
                lightForeground: '#212534',
                background: '#0D111D',
                primaryHover: '#353232', //how to use in tailwind : className = 'bg-primary text-light-gray'
                secondary: '#00b76c',
                secondaryHover: '#01a85c',
                'off-white': '#F8F9FA',
                black: '#000000',
                blackHover: '#2d2d2d',
                white: '#FFFFFF',
                'light-gray': '#B9B9B9',
                'deep-gray': '#4F4F4F',
                gray: '#5F5F5F',
                red: '#FF6363',
                redHover: '#e04c4c',
            },

            //font-family
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                lato: ['Lato', 'sans-serif'],
                comforter: ['Comforter Brush', 'cursive'],
            },

            backgroundImage: {
                clientHeroImg: "url('/src/images/hero_bg.jpg')",
            },

            //underline-custom
            textUnderlineOffset: {
                5: '5px',
            },
            //footer-custom
            height: {
                128: '40rem',
            },
            borderWidth: {
                1: '1px',
            },
        },
    },
    plugins: [],
};
