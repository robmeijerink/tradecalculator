<template>
  <div class="bg-white">
    <div>
      <h2 class="text-gray-600 font-bold text-xl">
        Trade Results
      </h2>
    </div>
    <hr class="mt-4 mb-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex-1 min-w-0 w-full sm:pr-4">
        <div class="flex items-center mb-5">
          <span class="inline-block w-2/5 sm:w-56 pr-2 sm:pr-16 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
            Size
          </span>
          <span class="flex-1 min-w-0 text-right sm:text-left break-all">
            {{ results.order_size }}
          </span>
        </div>
        <div class="flex items-center mb-5">
          <span class="inline-block w-2/5 sm:w-56 pr-2 sm:pr-16 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
            Loss
          </span>
          <span class="flex-1 min-w-0 text-right sm:text-left truncate">
            {{ money(results.loss) }}
          </span>
        </div>
        <template v-if="results.profit">
          <div class="flex items-center mb-5">
            <span class="inline-block w-2/5 sm:w-56 pr-2 sm:pr-16 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
              Profit
            </span>
            <span class="flex-1 min-w-0 flex flex-wrap justify-end sm:justify-start gap-x-2 gap-y-1 items-center">
              <span>{{ money(results.profit) }}</span>
              <span class="text-emerald-600 whitespace-nowrap cursor-help" title="Return on account balance">(+ {{ results.profit_on_account_percentage }}%)</span>
            </span>
          </div>
          <div class="flex items-center mb-5" :class="classBag.textColor">
            <span class="inline-block w-2/5 sm:w-56 pr-2 sm:pr-16 sm:text-right font-semibold whitespace-nowrap cursor-help" title="Risk Reward Ratio">
              RRR
            </span>
            <span class="flex-1 min-w-0 text-right sm:text-left font-bold truncate">
              {{ results.rrr }}
            </span>
          </div>
        </template>
      </div>
      <div v-if="results.profit" class="mt-8 sm:mt-0 sm:w-32 flex justify-center items-center shrink-0" :class="classBag.textColor">
        <i class="far text-8xl sm:text-9xl opacity-90" :class="classBag.smileyClass"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import Colors from '@/colors'
import { money } from '@/helpers'

export default defineComponent({
  props: {
    results: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const classBag = computed(() => Colors.getRrrColors(props.results.rrr))

    return {
      classBag,
      money
    }
  }
})
</script>
