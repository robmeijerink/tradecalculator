<template>
    <div class="bg-white md:w-3/4 lg:w-1/2">
        <div class="flex flex-col">
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600">
                    Order Price
                </span>
                <span class="w-9/12 flex-grow">
                   {{ order.order_price }}
                    <span class="cursor-pointer" @click="copy('order_price')">
                        <i class="fas fa-copy"></i>
                    </span>
                </span>
            </div>
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600">
                    Qty
                </span>
                <span class="w-9/12 flex-grow">
                   {{ order.qty }}
                   <span class="cursor-pointer" @click="copy('qty')">
                        <i class="fas fa-copy"></i>
                    </span>
                </span>
            </div>
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600">
                    Take Profit
                </span>
                <span class="w-9/12 flex-grow">
                    {{ order.take_profit }}
                    <span class="cursor-pointer" @click="copy('take_profit')">
                        <i class="fas fa-copy"></i>
                    </span>
                </span>
            </div>
            <div class="flex mb-2">
                <span class="inline-block w-20 text-right font-bold text-gray-600">
                    Stop Loss
                </span>
                <span class="w-9/12 flex-grow">
                    {{ order.stop_loss }}
                    <span class="cursor-pointer" @click="copy('stop_loss')">
                        <i class="fas fa-copy"></i>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['order'],
    methods: {
        copy(name) {
            navigator.clipboard.writeText(this.order[name]);
        }
    }
}

</script>
