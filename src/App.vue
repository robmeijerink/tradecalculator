<template>
  <div class="py-2 px-10 min-h-screen" :class="bgClass">
    <div class="pl-6 p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <h1 class="text-white text-2xl">Trade Position Size Calculator</h1>
    </div>
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
