<template>
    <div class="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto mb-2">
        <form>
            <div class="sm:flex items-center mb-5">
                <label for="account_balance" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Balance
                </label>
                <span v-if="!input.account_balance" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.account_balance" v-maska="masks.price" inputmode="numeric" @keydown.space.prevent type="text" id="account_balance" name="account_balance" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 green-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:flex items-center mb-10">
                <label for="risk" class="inline-block w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Risk
                </label>
                <div class="flex-1 flex items-center">
                    <input v-model.number="input.risk" @keydown="onlyNumeric" type="number" min="0" max="100" step="0.05" id="risk" name="risk" class="w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 mr-4" :class="`focus:border-${typeColor.main}`" placeholder="Recommended: 1%">
                    <span class="self-center">%</span>
                </div>
            </div>
            <div class="sm:flex items-center mb-10">
                <label for="type" class="inline-block w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Type
                </label>
                <div class="mt-6 sm:mt-0 sm:flex sm:flex-1">
                    <label class="block w-full sm:w-6/12 mb-4 sm:mb-0 py-3 pl-4 pr-8 mr-5 cursor-pointer" :class="getRadioBtnClass('long')">
                        <input v-model="input.type" name="type" type="radio" value="long"/>
                        <span class="ml-3">Long</span>
                    </label>
                    <label class="block w-full sm:w-6/12 py-3 pl-4 pr-8 cursor-pointer" :class="getRadioBtnClass('short')">
                        <input v-model="input.type" name="type" type="radio" value="short"/>
                        <span class="ml-3">Short</span>
                    </label>
                </div>
            </div>
            <hr class="mb-8">
            <div class="sm:flex items-center mb-5">
                <label for="order_price" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Order Price
                </label>
                <span v-if="!validExitPrice || !validStopLoss" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.order_price" v-maska="masks.price" inputmode="numeric" type="text" @keydown.space.prevent id="order_price" name="order_price" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:flex items-center mb-5">
                <label for="stop_loss" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Stop Loss
                </label>
                <span v-if="!validStopLoss" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.stop_loss" v-maska="masks.price" inputmode="numeric" type="text" @keydown.space.prevent id="stop_loss" name="stop_loss" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:flex items-center mb-5">
                <label for="exit_price" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Exit Price <span class="cursor-help" title="Take Profit">(TP)</span>
                </label>
                <span v-if="!validExitPrice" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.exit_price" v-maska="masks.price" inputmode="numeric" type="text" @keydown.space.prevent id="exit_price" name="exit_price" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:text-right">
                <button :disabled="!canSubmit" :class="submitBtnClass" class="w-full sm:w-60 py-3 px-8 mt-4 text-white font-bold" @click.prevent="calculate">
                    <i class="fas mr-3" :class="{ 'fa-check': finishedCalculating, 'fa-calculator': !finishedCalculating }"></i> Calculate
                </button>
            </div>
        </form>
        <div v-if="hasResults">
            <hr class="mt-8 mb-4">
            <position-preview :order="order"></position-preview>
            <hr class="mt-8 mb-4">
            <position-results :results="results"></position-results>
        </div>
    </div>
</template>

<script>

import { isEmpty } from 'lodash'
import PositionPreview from './PositionPreview.vue'
import PositionResults from './PositionResults.vue'

export default {
    components: {
        PositionPreview,
        PositionResults,
    },
    props: ['type'],
    data() {
        return {
            input: {
                account_balance: 1000,
                risk: 1.00,
                type: 'long',
                order_price: null,
                exit_price: null,
                stop_loss: null,
            },
            masks: {
                price: '#*.##',
            },
            results: {},
            order: {},
            finishedCalculating: false,
        }
    },
    watch: {
        'input.type': function (val) {
            let diffSl, diffTp

            this.$emit('update-type', val)

            if (val === 'long') {
                diffSl = this.input.order_price + (this.input.order_price - this.input.stop_loss)
                diffTp = this.input.exit_price ? this.input.order_price - (this.input.exit_price - this.input.order_price) : null
            } else {
                diffSl = this.input.order_price - (this.input.stop_loss - this.input.order_price)
                diffTp = this.input.exit_price ? this.input.order_price + (this.input.order_price - this.input.exit_price) : null
            }

            if (diffSl > 0) {
                this.input.stop_loss = diffSl
                this.input.exit_price = diffTp
            }
        },
        'input.risk': function (val) {
            if (val > 100) {
                this.input.risk = 100
            }
        }
    },
    computed: {
        canSubmit() {
            return this.input.account_balance && this.input.risk && this.input.order_price &&
                   this.input.stop_loss && this.validStopLoss && this.validExitPrice
        },
        hasResults() {
            return ! isEmpty(this.results)
        },
        typeColor() {
            return {
                main: this.globalColors[this.type].main,
                muted: this.globalColors[this.type].main.replace('400', '200')
            }
        },
        submitBtnClass() {
            let classNames = 'bg-' + (this.canSubmit ? this.typeColor.main : this.typeColor.muted)

            if (this.canSubmit) {
                classNames += ' cursor-pointer'
            } else {
                classNames += ' cursor-not-allowed'
            }

            return classNames
        },
        validExitPrice() {
            if (! this.input.exit_price) {
                return true
            }

            if (this.type === 'long') {
                return this.input.order_price < this.input.exit_price
            }

            return this.input.order_price > this.input.exit_price
        },
        validStopLoss() {
            if (! this.input.stop_loss) {
                return true
            }

            if (this.type === 'long') {
                return this.input.order_price > this.input.stop_loss
            }

            return this.input.order_price < this.input.stop_loss
        }
    },
    methods: {
        calculate() {
            const risk = this.input.account_balance * (this.input.risk / 100)

            this.results = {
                loss: risk,
            }

            if (this.input.type === 'long') {
                this.results.order_size = risk / (this.input.order_price - this.input.stop_loss)
            } else {
                this.results.order_size = risk / (this.input.stop_loss - this.input.order_price)
            }

            this.results.profit = this.getProfit()

            if (this.results.profit) {
                this.results.profit = this.results.profit.toFixed(2)
                this.results.profit_on_account_percentage = ((this.results.profit / this.input.account_balance) * 100).toFixed(2)
            }

            this.results.rrr = this.results.profit / risk
            this.results.order_size = this.results.order_size.toFixed(9)
            this.results.loss = this.results.loss.toFixed(2)
            this.results.rrr = this.results.rrr.toFixed(2)

            this.order = {
                order_price: this.input.order_price,
                qty: Math.floor(this.results.order_size * this.input.order_price),
                take_profit: this.input.exit_price,
                stop_loss: this.input.stop_loss,
            }

            this.finishedCalculating = true
            setTimeout(() => this.finishedCalculating = false, 250)
        },
        getProfit() {
            let profit = null

            if (this.input.exit_price) {
                if (this.input.type === 'long') {
                    profit = (this.input.exit_price - this.input.order_price) * this.results.order_size
                } else {
                    profit = (this.input.order_price - this.input.exit_price) * this.results.order_size
                }
            }
            return profit
        },
        getRadioBtnClass(name) {
            if (this.type == name) {
                return `bg-${this.typeColor.main} text-white`
            }

            return 'bg-gray-200 text-gray-700'
        },
        onlyNumeric(event) {
            const safelist = [
                'Backspace',
                'Delete'
            ]

            if (! safelist.includes(event.key) && isNaN(event.key)) {
                event.preventDefault()

                if ([',', '.'].includes(event.key) && ! event.target.value.includes('.')) {
                    event.target.value += '.'
                }

                return false
            }
        },
    },
}

</script>

<style scoped>

#risk {
    width: 95%;
    outline: none !important;
}

</style>
