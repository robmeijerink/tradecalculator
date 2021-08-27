<template>
  <div class="py-16 px-10 min-h-screen" :class="bgClass">
    <position-calculator :type="type" @update-type="updateType"></position-calculator>
  </div>
</template>

<script>

import PositionCalculator from './components/PositionCalculator.vue'

export default {
  components: {
    PositionCalculator,
  },
  data() {
    return {
      type: 'long'
    }
  },
  computed: {
    bgClass() {
      return 'bg-' + this.globalColors[this.type].main
    }
  },
  methods: {
    updateType(type) {
      this.type = type
    }
  }
}

</script>
