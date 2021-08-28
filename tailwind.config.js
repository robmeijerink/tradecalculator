module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    safelist: [
      'text-red-*',
      'text-green-*',
      'text-yellow-600',
      'bg-red-400',
      'bg-green-400',
      'bg-green-200',
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
