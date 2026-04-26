<template>
  <div class="pl-6 p-10 md:w-3/4 lg:w-1/2 mx-auto">
    <img
      v-show="type === 'long'"
      src="/trading-calculator-groen-diap.svg"
      class="mx-auto"
      alt="Trading Position Size Calculator"
      fetchpriority="high"
      loading="eager"
      width="600"
      height="100"
    >
    <img
      v-show="type === 'short'"
      src="/trading-calculator-rood-diap.svg"
      class="mx-auto"
      alt="Trading Position Size Calculator"
      loading="lazy"
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
