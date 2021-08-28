<template>
  <div class="py-2 px-10 min-h-screen" :class="bgClass">
    <logo-header :type="type"></logo-header>
    <position-calculator :type="type" @update-type="updateType"></position-calculator>
    <developer-credits></developer-credits>
  </div>
</template>

<script>

import LogoHeader from './components/LogoHeader.vue'
import PositionCalculator from './components/PositionCalculator.vue'
import DeveloperCredits from './components/DeveloperCredits.vue'

export default {
  components: {
    LogoHeader,
    PositionCalculator,
    DeveloperCredits,
  },
  data() {
    return {
      type: 'long'
    }
  },
  computed: {
    bgClass() {
      return 'bg-' + this.globalColors[this.type].main
    },
    headerImg() {
        if (this.type === 'long') {
            return require()
        }

        return require('./assets/trading-calculator-rood-diap.svg')
    },
  },
  methods: {
    updateType(type) {
      this.type = type
    }
  }
}

</script>
