<style scoped>
#risk {
    width: 95%;
    outline: none !important;
}
</style>

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
                <input v-model.number="input.account_balance" inputmode="numeric" @keydown.space.prevent type="text" id="account_balance" name="account_balance" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 emerald-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
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
                <input v-model.number="input.order_price" inputmode="numeric" type="text" @keydown.space.prevent id="order_price" name="order_price" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:flex items-center mb-5">
                <label for="stop_loss" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Stop Loss
                </label>
                <span v-if="!validStopLoss" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.stop_loss" inputmode="numeric" type="text" @keydown.space.prevent id="stop_loss" name="stop_loss" placeholder="$$$"
                    class="flex-1 w-full py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400 outline-none" :class="`focus:border-${typeColor.main}`">
            </div>
            <div class="sm:flex items-center mb-5">
                <label for="exit_price" class="inline-block sm:w-56 pr-16 sm:text-right font-bold text-gray-600 whitespace-nowrap">
                    Exit Price <span class="cursor-help" title="Take Profit">(TP)</span>
                </label>
                <span v-if="!validExitPrice" class="pr-2">
                    <i class="fas fa-times-circle text-red-400"></i>
                </span>
                <input v-model.number="input.exit_price" inputmode="numeric" type="text" @keydown.space.prevent id="exit_price" name="exit_price" placeholder="$$$"
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

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType } from 'vue'

import { TradeType, TradeInput, TradeResults, Order } from '@/types/trade'
import isEmpty from 'lodash/isEmpty'
import Colors from '@/colors'

import PositionPreview from '@/components/PositionPreview.vue'
import PositionResults from '@/components/PositionResults.vue'

export default defineComponent({
    emits: ['update-type'],
    components: {
        PositionPreview,
        PositionResults
    },
    props: {
        type: {
            type: String as PropType<TradeType>,
            required: true
        }
    },
    setup(props, { emit }) {
        const input = reactive<TradeInput>({
            account_balance: 1000,
            risk: 1.00,
            type: 'long',
            order_price: null as number | null,
            exit_price: null as number | null,
            stop_loss: null as number | null
        })

        const results = reactive<TradeResults>({})
        const order = reactive<Order>({})
        const finishedCalculating = ref<boolean>(false)

        watch(() => input.type, (val) => {
            emit('update-type', val)
        })

        watch(() => input.risk, (val: number) => {
            if (val > 100) {
                input.risk = 100
            }
        })

        const canSubmit = computed(() => {
            return input.account_balance && input.risk && input.order_price &&
                input.stop_loss && validStopLoss.value && validExitPrice.value
        })

        const hasResults = computed(() => {
            return !isEmpty(results)
        })

        const typeColor = computed(() => {
            return {
                main: Colors[props.type].main,
                muted: Colors[props.type].main.replace('400', '200')
            }
        })

        const submitBtnClass = computed(() => {
            let classNames = 'bg-' + (canSubmit.value ? typeColor.value.main : typeColor.value.muted)

            if (canSubmit.value) {
                classNames += ' cursor-pointer'
            } else {
                classNames += ' cursor-not-allowed'
            }

            return classNames
        })

        const validExitPrice = computed(() => {
            if (input.exit_price === null) {
                return true
            }
            if (input.order_price === null) {
                return false
            }

            if (props.type === 'long') {
                return input.order_price < input.exit_price
            }

            return input.order_price > input.exit_price
        })

        const validStopLoss = computed(() => {
            if (input.stop_loss === null) {
                return true
            }
            if (input.order_price === null) {
                return false
            }

            if (props.type === 'long') {
                return input.order_price > input.stop_loss
            }

            return input.order_price < input.stop_loss
        })

        const calculate = () => {
            if (!input.order_price || ! input.stop_loss || !input.account_balance) {
                return
            }

            const risk = input.account_balance * (input.risk / 100)
            let orderSize: number

            if (input.type === 'long') {
                orderSize = risk / (input.order_price - input.stop_loss)
            } else {
                orderSize = risk / (input.stop_loss - input.order_price)
            }

            results.order_size = orderSize.toFixed(9)
            results.loss = risk.toFixed(2)

            const profit = getProfit()

            if (profit) {
                results.profit = profit.toFixed(2)
                results.profit_on_account_percentage = ((profit / input.account_balance) * 100).toFixed(2)
            }

            const rrr = profit / risk

            results.rrr = rrr.toFixed(2)

            order.order_price = input.order_price
            order.qty = Math.floor(orderSize * input.order_price)
            order.take_profit = input.exit_price
            order.stop_loss = input.stop_loss

            finishedCalculating.value = true
            setTimeout(() => finishedCalculating.value = false, 250)
        }

        const getProfit = () => {
            let profit = 0

            if (input.order_price && results.order_size && input.exit_price) {
                if (input.type === 'long') {
                    profit = (input.exit_price - input.order_price) * Number(results.order_size)
                } else {
                    profit = (input.order_price - input.exit_price) * Number(results.order_size)
                }
            }
            return profit
        }

        const getRadioBtnClass = (name: string) => {
            if (props.type === name) {
                return `bg-${typeColor.value.main} text-white`
            }

            return 'bg-gray-200 text-gray-700'
        }

        const onlyNumeric = (event: KeyboardEvent) => {
            const safelist = ['Backspace', 'Delete']

            if (!safelist.includes(event.key) && isNaN(Number(event.key)) && event.currentTarget instanceof HTMLInputElement) {
                event.preventDefault()

                if ([',', '.'].includes(event.key) && !event.currentTarget.value.includes('.')) {
                    event.currentTarget.value += '.'
                }

                return false
            }
        }

        return {
            input,
            results,
            order,
            finishedCalculating,
            canSubmit,
            hasResults,
            typeColor,
            submitBtnClass,
            validExitPrice,
            validStopLoss,
            calculate,
            getProfit,
            getRadioBtnClass,
            onlyNumeric
        }
    }
})
</script>
