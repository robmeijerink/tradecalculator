<template>
    <div class="bg-white">
        <div>
            <h2 class="text-gray-600 font-bold text-xl">Order Preview</h2>
        </div>
        <hr class="mt-4 mb-8">
        <div class="flex flex-col">
            <div class="block sm:flex items-center mb-3">
                <span class="w-full inline-block sm:w-72 sm:pr-16 sm:text-right font-semibold text-gray-600">
                    Order Price
                </span>
                <div class="flex items-center w-full">
                    <span class="flex-grow">
                        {{ money(order.order_price) }}
                    </span>
                    <span class="py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('order_price')" title="Copy Order Price">
                        <i :class="{ 'fas fa-check': copied === 'order_price', 'far fa-copy': copied !== 'order_price' }"></i>
                    </span>
                </div>
            </div>
            <div class="block sm:flex items-center mb-3">
                <span class="w-full inline-block sm:w-72 sm:pr-16 sm:text-right font-semibold text-gray-600">
                    Qty
                </span>
                <div class="flex items-center w-full">
                    <span class="flex-grow">
                    {{ order.qty.toLocaleString('en-US') }}
                    </span>
                    <span class="py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('qty')" title="Copy Qty">
                        <i :class="{ 'fas fa-check': copied === 'qty', 'far fa-copy': copied !== 'qty' }"></i>
                    </span>
                </div>
            </div>
            <div class="block sm:flex items-center mb-3">
                <span class="w-full inline-block sm:w-72 sm:pr-16 sm:text-right font-semibold text-gray-600">
                    Take Profit
                </span>
                <div class="flex items-center w-full">
                    <span class="flex-grow">
                        {{ money(order.take_profit) }}
                    </span>
                    <span class="py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('take_profit')" title="Copy Take Profit">
                        <i :class="{ 'fas fa-check': copied === 'take_profit', 'far fa-copy': copied !== 'take_profit' }"></i>
                    </span>
                </div>
            </div>
            <div class="block sm:flex items-center">
                <span class="w-full inline-block sm:w-72 sm:pr-16 sm:text-right font-semibold text-gray-600">
                    Stop Loss
                </span>
                <div class="flex items-center w-full">
                    <span class="flex-grow">
                        {{ money(order.stop_loss) }}
                    </span>
                    <span class="py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('stop_loss')" title="Copy Stop Loss">
                        <i :class="{ 'fas fa-check': copied === 'stop_loss', 'far fa-copy': copied !== 'stop_loss' }"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['order'],
    data() {
        return {
            copied: null,
        }
    },
    methods: {
        copy(name) {
            this.copied = name
            navigator.clipboard.writeText(this.order[name])

            setTimeout(() => this.copied = null, 250)
        }
    }
}

</script>
