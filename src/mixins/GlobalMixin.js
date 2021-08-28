import Colors from '../colors'

export default {
    data() {
        return {
            globalColors: Colors
        }
    },
    methods: {
        money(val) {
            return Number(val).toLocaleString(undefined, { style: 'currency', currency: 'USD' })
        }
    },
}