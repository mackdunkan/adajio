module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'norms': ['TT Norms', 'sans-serif'],
    },
    container: {
      padding: '1rem',
    },
    extend: {
      colors: {
        'red': "#de2847",
        'red-h': "#e53734",
        "red-button": "#e53734",
        'a-blue' : "#19b1e6"
      },
      height: {
        '420': '420px'
      },
      maxHeight: {
        '400': '400px',
        '320': '320px',
        'fit': "fit-content"
      },
      maxWidth: {
        '600': '600px'
      },
      inset: {
        '1/2': '50%'
      }
    },
  },
  variants: {},
  plugins: [],
}
