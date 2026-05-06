<template>
  <div class="w-full grid place-items-center mb-8 px-10 sm:px-0">
    <img
      src="/trading-calculator-groen-diap.svg"
      class="col-start-1 row-start-1 w-full h-auto transition-opacity duration-300"
      :class="type === 'long' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
      alt="Trading Position Size Calculator"
      fetchpriority="high"
      width="600"
      height="100"
    >
    <img
      src="/trading-calculator-rood-diap.svg"
      class="col-start-1 row-start-1 w-full h-auto transition-opacity duration-300"
      :class="type === 'short' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
      alt="Trading Position Size Calculator"
      fetchpriority="high"
      width="600"
      height="100"
    >
  </div>
</template>

<script lang="ts">
import { TradeType } from '@/types/trade';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<TradeType>,
      required: true
    }
  }
})
</script>
