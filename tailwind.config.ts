export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    safelist: [
        'bg-red-400',
        'bg-emerald-400',
        'bg-emerald-200',
        'bg-red-200',
        'focus:border-red-400',
        'focus:border-emerald-400'
    ],
    darkMode: 'media',
    theme: {
        extend: {}
    },
    plugins: [] as any[]
}
