<template>
    <div class="bg-white">
        <div>
            <h2 class="text-gray-600 font-bold text-xl">
                Trade Results
            </h2>
        </div>
        <hr class="mt-4 mb-8">
        <div class="sm:flex">
            <div class="flex w-11/12 flex-col">
                <div class="flex items-center mb-2">
                    <span class="w-4/12 pr-16 inline-block w-20 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
                        Size
                    </span>
                    <span class="w-8/12 flex-grow">
                        {{ results.order_size }}
                    </span>
                </div>
                <div class="flex items-center mb-2">
                    <span class="w-4/12 pr-16 inline-block w-20 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
                        Loss
                    </span>
                    <span class="w-8/12 flex-grow">
                        ${{ results.loss }}
                    </span>
                </div>
                <div class="flex items-center mb-2">
                    <span class="w-4/12 pr-16 inline-block w-20 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
                        Profit
                    </span>
                    <span class="w-8/12 flex-grow">
                        ${{ results.profit }}
                    </span>
                </div>
                <div class="flex items-center mb-2" :class="classBag.textColor">
                    <span class="w-4/12 inline-block pr-16 w-20 sm:text-right font-semibold whitespace-nowrap">
                        RRR
                    </span>
                    <span class="w-8/12 flex-grow">
                        {{ results.rrr }}
                    </span>
                </div>
            </div>
            <div class="w-12/12 sm:w-1/12 mt-6 text-center sm:text-right sm:mt-0 sm:flex sm:flex-row-reverse items-center mb-2" :class="classBag.textColor">
                <div class="text-9xl">
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
