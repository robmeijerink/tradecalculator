<template>
  <div class="py-2 px-10 min-h-screen" :class="bgClass">
    <logo-header :type="type"></logo-header>
    <position-calculator :type="type" @update-type="updateType"></position-calculator>
    <developer-credits></developer-credits>
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
