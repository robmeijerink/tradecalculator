<template>
  <div class="py-8 px-4 sm:px-10 min-h-screen flex flex-col justify-center items-center" :class="bgClass">
    <div class="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-3xl mx-auto">
      <logo-header :type="type"></logo-header>
      <position-calculator :type="type" @update-type="updateType"></position-calculator>
      <developer-credits></developer-credits>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import Colors from '@/colors'
import { TradeType } from '@/types/trade'

import LogoHeader from '@/components/LogoHeader.vue'
import PositionCalculator from '@/components/PositionCalculator.vue'
import DeveloperCredits from '@/components/DeveloperCredits.vue'

export default defineComponent({
  components: {
    LogoHeader,
    PositionCalculator,
    DeveloperCredits
  },
  setup() {
    const type = ref<TradeType>('long')

    const bgClass = computed(() => 'bg-' + Colors[type.value].main)

    const updateType = (newType: TradeType) => {
      type.value = newType
    }

    return {
      type,
      bgClass,
      updateType
    }
  }
})
</script>
