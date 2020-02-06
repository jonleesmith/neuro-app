/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
      fontFamily: {
          sans: ['Rubik'],
      },
      extend: {
          colors: {
              primary: '#4fc08d',
              'gray-800': '#2b2f3e',
              'gray-900': '#21242f',
          }
      }
  },
  variants: {},
  plugins: []
}
