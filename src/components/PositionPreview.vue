<template>
    <div class="bg-white">
        <div>
            <h2 class="text-gray-600 font-bold text-xl">Order Preview</h2>
        </div>
        <hr class="mt-4 mb-8">
        <div class="flex flex-col">
            <div class="flex items-center mb-3">
                <span class="w-3/12 inline-block w-36 mr-16 text-right font-semibold text-gray-600">
                    Order Price
                </span>
                <span class="w-8/12 flex-grow">
                   ${{ order.order_price }}
                </span>
                <span class="w-1/12 py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('order_price')" title="Copy Order Price">
                    <i :class="{ 'fas fa-check': copied === 'order_price', 'far fa-copy': copied !== 'order_price' }"></i>
                </span>
            </div>
            <div class="flex items-center mb-3">
                <span class="w-3/12 inline-block w-36 mr-16 text-right font-semibold text-gray-600">
                    Qty
                </span>
                <span class="w-8/12 flex-grow">
                   {{ order.qty }}
                </span>
                <span class="w-1/12 py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('qty')" title="Copy Qty">
                    <i :class="{ 'fas fa-check': copied === 'qty', 'far fa-copy': copied !== 'qty' }"></i>
                </span>
            </div>
            <div class="flex items-center mb-3">
                <span class="w-3/12 inline-block w-36 mr-16 text-right font-semibold text-gray-600">
                    Take Profit
                </span>
                <span class="w-8/12 flex-grow">
                    ${{ order.take_profit }}
                </span>
                <span class="w-1/12 py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('take_profit')" title="Copy Take Profit">
                    <i :class="{ 'fas fa-check': copied === 'take_profit', 'far fa-copy': copied !== 'take_profit' }"></i>
                </span>
            </div>
            <div class="flex items-center">
                <span class="inline-block w-36 mr-16 text-right font-semibold text-gray-600">
                    Stop Loss
                </span>
                <span class="w-8/12 flex-grow">
                    ${{ order.stop_loss }}
                </span>
                <span class="w-1/12 py-2 px-4 border hover:bg-gray-200 cursor-pointer" @click="copy('stop_loss')" title="Copy Stop Loss">
                    <i :class="{ 'fas fa-check': copied === 'stop_loss', 'far fa-copy': copied !== 'stop_loss' }"></i>
                </span>
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
            navigator.clipboard.writeText(this.order[name]);

            setTimeout(() => this.copied = null, 250)
        }
    }
}

</script>
