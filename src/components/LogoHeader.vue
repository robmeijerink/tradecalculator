<template>
  <div class="pl-6 p-10 md:w-3/4 lg:w-1/2 mx-auto">
    <img v-show="type === 'long'" src="../assets/trading-calculator-groen-diap.svg" class="mx-auto" alt="Trading Position Size Calculator">
    <img v-show="type === 'short'" src="../assets/trading-calculator-rood-diap.svg" class="mx-auto" alt="Trading Position Size Calculator">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TradeType } from '@/types/trade'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<TradeType>,
      required: true
    }
  }
})
</script>
