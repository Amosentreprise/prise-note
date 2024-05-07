/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: "#FF5722", 
        
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        
      },
      screens: {
        
        sm:"250px",
				//320px
				md: "764px",
				// => @media (min-width: 768px) { ... }

				lg: "1026px",
  
        
      },
    },
  },
  plugins: [],
}

