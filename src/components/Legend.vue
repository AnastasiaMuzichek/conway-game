<script setup lang="ts">
const descriptions = [
    ['cell-alive', 'продолжает жить'],
    ['cell-sick', 'больная клетка'],
    ['cell-dead', 'мертвая клетка'],
    ['cell-revived', 'новая клетка'],
];
</script>

<template>
    <div>
        <h3>Состояние клеток</h3>
        <div v-for="desc in descriptions" class="flex">
            <div :class="[desc[0], 'legend-cell']"></div>
            <span>&nbsp;-&nbsp;{{ desc[1] }}</span>
        </div>
    </div>
</template>

<style scoped>
.legend-cell {
    height: 30px;
    width: 30px;
    border: 2px solid sandybrown;
    box-sizing: border-box;
    margin-bottom: 30px;
}
</style>
