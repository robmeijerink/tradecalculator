<template>
    <div class="bg-white md:w-3/4 lg:w-1/2">
        <div class="flex flex-col">
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600 whitespace-nowrap">
                    Size
                </span>
                <span class="w-9/12 flex-grow">
                   {{ results.order_size }}
                </span>
            </div>
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600 whitespace-nowrap">
                    Loss
                </span>
                <span class="w-9/12 flex-grow">
                    ${{ results.loss }}
                </span>
            </div>
            <div class="flex mb-2">
                <span class="w-3/12 inline-block w-20 text-right font-bold text-gray-600 whitespace-nowrap">
                    Profit
                </span>
                <span class="w-9/12 flex-grow">
                    ${{ results.profit }}
                </span>
            </div>
            <div class="flex mb-2" :class="classBag.textColor">
                <span class="inline-block w-20 text-right font-bold whitespace-nowrap">
                    RRR
                </span>
                <span class="w-9/12 flex-grow">
                    {{ results.rrr }}
                </span>
                <div class="text-5xl">
                    <i class="far" :class="classBag.smileyClass"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['results'],
    computed: {
        classBag() {
            return this.globalColors.getRrrColors(this.results.rrr)
        }
    }
}

</script>
