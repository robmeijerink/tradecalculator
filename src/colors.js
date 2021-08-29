export default {
    long: {
        main: 'green-400'
    },
    short: {
        main: 'red-400'
    },
    getRrrColors(rrr) {
        let textColor, smileyClass

        switch (true) {
            case rrr <= 1:
                textColor = 'text-red-800'
                smileyClass = 'fa-sad-cry'
                break
            case rrr < 1.5:
                textColor = 'text-red-600'
                smileyClass = 'fa-sad-tear'
                break
            case rrr < 2:
                textColor = 'text-red-500'
                smileyClass = 'fa-frown'
                break
            case rrr < 2.5:
                textColor = 'text-red-400'
                smileyClass = 'fa-frown-open'
                break
            case rrr < 3:
                textColor = 'text-yellow-600'
                smileyClass = 'fa-smile'
                break
            case rrr < 3.5:
                textColor = 'text-green-900'
                smileyClass = 'fa-grin-alt'
                break
            case rrr < 5:
                textColor = 'text-green-800'
                smileyClass = 'fa-smile-beam'
                break
            case rrr < 7.5:
                textColor = 'text-green-600'
                smileyClass = 'fa-grin-beam'
                break
            case rrr <= 10:
                textColor = 'text-green-500'
                smileyClass = 'fa-grin-squint'
                break
            case rrr > 10:
                textColor = 'text-green-400'
                smileyClass = 'fa-grin-squint-tears'
                break
        }

        return {
            textColor: textColor,
            smileyClass: smileyClass,
        }
    },
}