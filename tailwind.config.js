module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    safelist: [
      'text-red-800',
      'text-red-600',
      'text-red-400',
      'text-red-200',
      'text-yellow-600',
      'text-green-200',
      'text-green-400',
      'text-green-600',
      'text-green-800',
      'text-green-900',
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
