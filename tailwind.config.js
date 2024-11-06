/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode : false ,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            container : {
                center : true ,
                screens : {
                    'sm': '100%', 
                    'md': '100%',  
                    'lg': '950px', 
                    'xl': '1150px', 
                    '2xl': '1250px', 
                }
            } ,
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                pure: "var(--pure)",
                dark: "var(--dark)",
                light: "var(--light)",
                primaryGradient : 'var(--primary-gradient)',
                primaryGradientHover : "var(--primary-gradient-hover)"
            },
            backgroundImage : {
                'hero-gradient' : "linear-gradient(180deg, rgba(21, 12, 49, 0) 0%, #150C31 100%)"
            } ,
            screens: {
                '2xl': '1550px', // Change the 2xl breakpoint to 1550px
            },
        },
    },
    plugins: [],
};
