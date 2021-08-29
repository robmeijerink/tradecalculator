module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    safelist: [
      'bg-red-400',
      'bg-green-400',
      'bg-green-200',
      'bg-red-200',
      'focus:border-red-400',
      'focus:border-green-400',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
