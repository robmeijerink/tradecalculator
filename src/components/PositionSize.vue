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
            let color, smileyClass

            switch (true) {
                case this.results.rrr < 1:
                    color = 'red-800'
                    smileyClass = 'fa-sad-cry'
                    break
                case this.results.rrr < 1.5:
                    color = 'red-600'
                    smileyClass = 'fa-sad-tear'
                    break
                case this.results.rrr < 2:
                    color = 'red-400'
                    smileyClass = 'fa-frown'
                    break
                case this.results.rrr < 2.5:
                    color = 'red-200'
                    smileyClass = 'fa-frown-open'
                    break
                case this.results.rrr < 3:
                    color = 'yellow-600'
                    smileyClass = 'fa-smile'
                    break
                case this.results.rrr < 3.5:
                    color = 'green-200'
                    smileyClass = 'fa-grin-alt'
                    break
                case this.results.rrr < 5:
                    color = 'green-400'
                    smileyClass = 'fa-smile-beam'
                    break
                case this.results.rrr < 7.5:
                    color = 'green-600'
                    smileyClass = 'fa-grin-beam'
                    break
                case this.results.rrr < 10:
                    color = 'green-800'
                    smileyClass = 'fa-grin-squint'
                    break
                case this.results.rrr > 10:
                    color = 'green-900'
                    smileyClass = 'fa-grin-squint-tears'
                    break
            }

            return {
                textColor: `text-${color}`,
                smileyClass: smileyClass,
            }
        }
    }
}

</script>
