export default {
    long: {
        main: 'emerald-400'
    },
    short: {
        main: 'red-400'
    },
    getRrrColors(rrr: number) {
        let textColor: string, smileyClass: string

        switch (true) {
            case rrr < 1:
                textColor = 'text-red-800'
                smileyClass = 'fa-sad-cry'
                break
            case rrr <= 1:
                textColor = 'text-red-600'
                smileyClass = 'fa-sad-tear'
                break
            case rrr <= 1.25:
                textColor = 'text-red-500'
                smileyClass = 'fa-frown'
                break
            case rrr <= 1.5:
                textColor = 'text-red-400'
                smileyClass = 'fa-frown-open'
                break
            case rrr <= 2:
                textColor = 'text-amber-600'
                smileyClass = 'fa-smile'
                break
            case rrr <= 2.5:
                textColor = 'text-emerald-900'
                smileyClass = 'fa-grin-alt'
                break
            case rrr <= 3:
                textColor = 'text-emerald-800'
                smileyClass = 'fa-smile-beam'
                break
            case rrr <= 3.5:
                textColor = 'text-emerald-600'
                smileyClass = 'fa-grin-beam'
                break
            case rrr <= 5:
                textColor = 'text-emerald-500'
                smileyClass = 'fa-grin-squint'
                break
            case rrr > 5:
                textColor = 'text-emerald-400'
                smileyClass = 'fa-grin-squint-tears'
                break
            default:
                textColor = ''
                smileyClass = ''
        }

        return {
            textColor,
            smileyClass,
        }
    },
}
