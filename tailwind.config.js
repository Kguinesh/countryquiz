/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
              "./public/*.html",
              "./src/components/*.vue",
  ],
  theme: {
    extend: {
      animation: {
        shadow: 'shadow 0.5s linear infinite',
        jump: 'jump 0.5s linear infinite',
        buttonNext: 'buttonnext 8s linear infinite'
      },

      backgroundSize: {
        '200%': '200%'
      }, 

      borderRadius: {
        '50%': '50%'//border radius for loader pseudo before
      },

      colors: {
        question: '#2f527b',
        optiontext: '#6066d0cc',
        answers: {
          'right': '#60bf88',
          'wrong': '#ea8282'
        },
        optionborder: {
          og: 'rgba(96, 102, 208, 0.7)',
          light: 'rgba(60, 66, 179, 0.7)'
        },
        buttoncolor: '#f9a826',
        primarycolor: ' #1d355d'       
      },

      content: {
        'empty': "''", //using for class - attribute
        'empty2': '""' //using for :class - binding
      },

      fontFamily: {
        poppins: [
          'Poppins',
          'sans-serif'
        ],

        montserrat: [
          'Montserrat',
          'sans-serif'
        ]
      },

      fontfontSize: {
        '2rem': '2rem'
      },

      height: {
        inherit: 'inherit',
        '55vh': '55vh',
        '75vh': '75vh', //total width for box
        '85vh': '85vh'
      },

      keyframes: {
        shadow: {
            '0%, 100%': {transform: 'scale(1, 1)'},
            '50%': {transform: 'scale(1.2, 1)'}
        },

        jump: {
          '15%': {'border-bottom-right-radius': '3px'},
    
          '25%': {transform: 'translateY(9px) rotate(22.5deg)'},
      
          '50%': {
              transform: 'translateY(18px) scale(1, .9) rotate(45deg)',
              'border-bottom-right-radius': '40px'
          },
      
          '75%': {transform: 'translateY(9px) rotate(67.5deg)'},
      
          '100%': {transform: 'translateY(0) rotate(90deg)'}
        },

        buttonNext: {
          '0%': { 'background-position': '0%'},
          '100%': { 'background-position': '400%'}
        }
      },

      lineHeight: {
        '3.5rem': '3.5rem' 
      },

      screens: {
        's': '320px',
        'm': '375px',
        'l': '425px'
      },

      spacing: {
        '50%': '50%',
        '60%': '60%',
        '70%': '70%'
      },

      width: {
        '25rem': '25rem',
        '28rem': '28rem',
        '30rem': '30rem',
        '32rem': '32rem',
        '35rem': '35rem',
        '40rem': '40rem',    
        '45rem': '45rem',  
        '46rem': '46rem', //total width of quiz
        '50rem': '50rem',
        '80rem': '80rem'
      },

      zIndex: {
        1: '1'
      }
    },
  },
  plugins: [],
}