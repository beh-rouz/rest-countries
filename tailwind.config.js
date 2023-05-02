module.exports = {
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  darkMode: 'class',
  theme: {
    colors: {
      white: 'hsl(0, 0%, 100%)',
      black: 'hsl(0, 0%, 0%)',
      'dark-blue': {
        700: 'hsl(209, 23%, 22%)',
        800: 'hsl(207, 26%, 17%)',
        900: 'hsl(200, 15%, 8%)'
      },
      'dark-gray': 'hsl(0, 0%, 52%)',
      'light-gray': 'hsl(0, 0%, 98%)'
    }
  }
}
