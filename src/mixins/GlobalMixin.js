import Colors from '../colors'

export default {
    data() {
        return {
            globalColors: Colors
        }
    },
    methods: {
        money(val) {
            return Number(val).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
    },
}