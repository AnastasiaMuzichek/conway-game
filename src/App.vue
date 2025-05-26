<script setup lang="ts">
import Header from './components/Header.vue';
import Legend from './components/Legend.vue';
import Main from './components/Main.vue';
import Controls from './components/Controls.vue';
import { shallowRef } from 'vue';

const MIN_VALUE = 5;
const MAX_VALUE = 30;

const sizeField = shallowRef(MIN_VALUE);
const runApp = shallowRef(false);

function change(size: number, launched: boolean) {
    sizeField.value = size;
    runApp.value = launched;
}
</script>

<template>
    <div>
        <Header></Header>
        <div class="flex section">
            <Legend></Legend>
            <Main :size="sizeField" :run="runApp"></Main>
            <Controls
                @change="change"
                :min="MIN_VALUE"
                :max="MAX_VALUE"
            ></Controls>
        </div>
    </div>
</template>

<style scoped>
.section {
    justify-content: space-between;
}
</style>
