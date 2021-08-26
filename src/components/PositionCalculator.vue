<template>
    <div class="bg-green-200 py-16 px-10 min-h-screen">
        <div class="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">
            <form>
                <div class="flex items-center mb-5">
                    <label for="account_balance" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Balance
                    </label>
                    <input v-model="input.account_balance" v-maska="masks.price" inputmode="numeric" type="text" id="account_balance" name="account_balance" placeholder="$$$" 
                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                </div>
                <div class="flex items-center mb-10">
                    <label for="risk" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Risk
                    </label>
                    <div class="flex-1 flex items-center">
                        <input v-model.number="input.risk" @keydown="onlyNumeric" type="number" min="0" max="100" step="0.05" id="risk" name="risk" class="py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 mr-4" placeholder="Recommended: 1%">
                        <span class="self-center">%</span>
                    </div>
                </div>
                <div class="flex items-center mb-10">
                    <label for="type" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Type
                    </label>
                    <label class="text-gray-700 mr-5 cursor-pointer">
                        <input v-model="input.type" name="type" type="radio" value="long"/>
                        <span class="ml-1">Long</span>
                    </label>
                    <label class="text-gray-700  cursor-pointer">
                        <input v-model="input.type" name="type" type="radio" value="short"/>
                        <span class="ml-1">Short</span>
                    </label>
                </div>
                <hr class="mb-8">
                <div class="flex items-center mb-5">
                    <label for="order_price" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Order Price
                    </label>
                    <input v-model="input.order_price" v-maska="masks.price" inputmode="numeric" type="text" id="order_price" name="order_price" placeholder="$$$" 
                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                </div>
                <div class="flex items-center mb-5">
                    <label for="exit_price" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Exit Price (TP)
                    </label>
                    <input v-model="input.exit_price" v-maska="masks.price" inputmode="numeric" type="text" id="exit_price" name="exit_price" placeholder="$$$" 
                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                </div>
                <div class="flex items-center mb-5">
                    <label for="stop_loss" class="inline-block w-20 mr-16 text-right font-bold text-gray-600 whitespace-nowrap">
                        Stop Loss
                    </label>
                    <input v-model="input.stop_loss" v-maska="masks.price" inputmode="numeric" type="text" id="stop_loss" name="stop_loss" placeholder="$$$" 
                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                </div>
                <div class="text-right">
                    <button :disabled="!canSubmit" :class="{'bg-green-400': canSubmit, 'bg-green-200 cursor-not-allowed': !canSubmit}" class="py-3 px-8 text-white font-bold" @click.prevent="calculate">
                        Submit
                    </button> 
                </div>
            </form>
        </div>
        <div v-if="hasResults">
            <position-preview :results="results"></position-preview>
            <position-size :results="results"></position-size>
        </div>
    </div>
</template>

<script>

import PositionPreview from './PositionPreview.vue'
import PositionSize from './PositionSize.vue'
import {isEmpty} from 'lodash'

export default {
    components: {
        PositionPreview,
        PositionSize,
    },
    data() {
        return {
            input: {
                account_balance: null,
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
        }
    },
    computed: {
        canSubmit() {
            return this.input.account_balance && this.input.risk && this.input.order_price && 
                   this.input.exit_price && this.input.stop_loss
        },
        hasResults() {
            return ! isEmpty(this.results)
        }
    },
    methods: {
        calculate() {
            const risk = this.input.account_balance * (this.input.risk / 100)

            this.results = {
                costs: this.input.account_balance * risk,
            }

            if (this.input.type === 'long') {
                this.results.order_size = risk / (this.input.order_price - this.input.stop_loss)
            } else {
                this.results.order_size = risk / (this.input.order_price + this.input.stop_loss)
            }
        },
        onlyNumeric(event) {
            const whitelist = [
                'Backspace',
                'Delete'
            ]

            if (! whitelist.includes(event.key) && isNaN(event.key)) {
                event.preventDefault()

                if ([',', '.'].includes(event.key)) {
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
}

</style>