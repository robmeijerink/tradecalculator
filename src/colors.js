export default {
    long: {
        main: 'green-400'
    },
    short: {
        main: 'red-400'
    },
    getRrrColors(rrr) {
        let color, smileyClass

        switch (true) {
            case rrr < 1:
                color = 'red-800'
                smileyClass = 'fa-sad-cry'
                break
            case rrr < 1.5:
                color = 'red-600'
                smileyClass = 'fa-sad-tear'
                break
            case rrr < 2:
                color = 'red-400'
                smileyClass = 'fa-frown'
                break
            case rrr < 2.5:
                color = 'red-200'
                smileyClass = 'fa-frown-open'
                break
            case rrr < 3:
                color = 'yellow-600'
                smileyClass = 'fa-smile'
                break
            case rrr < 3.5:
                color = 'green-200'
                smileyClass = 'fa-grin-alt'
                break
            case rrr < 5:
                color = 'green-400'
                smileyClass = 'fa-smile-beam'
                break
            case rrr < 7.5:
                color = 'green-600'
                smileyClass = 'fa-grin-beam'
                break
            case rrr < 10:
                color = 'green-800'
                smileyClass = 'fa-grin-squint'
                break
            case rrr > 10:
                color = 'green-900'
                smileyClass = 'fa-grin-squint-tears'
                break
        }

        return {
            textColor: `text-${color}`,
            smileyClass: smileyClass,
        }
    },
}