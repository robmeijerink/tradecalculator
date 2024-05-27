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
        <div class="flex items-center mb-3">
          <span class="w-full inline-block sm:pr-16 sm:w-56 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
            Size
          </span>
          <span class="w-8/12 flex-grow text-right sm:text-left">
            {{ results.order_size }}
          </span>
        </div>
        <div class="flex items-center mb-3">
          <span class="w-full inline-block sm:pr-16 sm:w-56 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
            Loss
          </span>
          <span class="w-8/12 flex-grow text-right sm:text-left">
            {{ money(results.loss) }}
          </span>
        </div>
        <template v-if="results.profit">
          <div class="flex items-center mb-3">
            <span class="w-full inline-block sm:pr-16 sm:w-56 sm:text-right font-semibold text-gray-600 whitespace-nowrap">
              Profit
            </span>
            <span class="w-8/12 flex-grow text-right sm:text-left flex gap-1 flex-col sm:flex-row">
              {{ money(results.profit) }} <span class="text-green-600 whitespace-nowrap cursor-help" title="Return on account balance">(+ {{ results.profit_on_account_percentage }}%)</span>
            </span>
          </div>
          <div class="flex items-center mb-3" :class="classBag.textColor">
            <span class="w-full inline-block sm:pr-16 sm:w-56 sm:text-right font-semibold whitespace-nowrap cursor-help" title="Risk Reward Ratio">
              RRR
            </span>
            <span class="w-8/12 flex-grow text-right sm:text-left">
              {{ results.rrr }}
            </span>
          </div>
        </template>
      </div>
      <div v-if="results.profit" class="w-12/12 sm:w-1/12 mt-6 text-center sm:text-right sm:mt-0 sm:flex sm:flex-row-reverse items-center mb-2" :class="classBag.textColor">
        <hr class="mt-4 mb-8 sm:hidden">
        <div class="text-9xl">
          <i class="far" :class="classBag.smileyClass"></i>
        </div>
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
