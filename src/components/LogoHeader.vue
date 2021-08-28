<template>
    <div class="pl-6 p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <img v-if="type === 'long'" src="../assets/trading-calculator-groen-diap.svg" class="mx-auto" alt="Trading Position Size Calculator">
        <img v-else src="../assets/trading-calculator-rood-diap.svg" class="mx-auto" alt="Trading Position Size Calculator">
    </div>
</template>

<script>

export default {
    props: ['type'],
}

</script>
