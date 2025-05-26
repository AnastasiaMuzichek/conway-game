<script setup lang="ts">
import { shallowRef } from 'vue';

const emit = defineEmits<{
    (event: 'change', size: number, launched: boolean): void;
}>();

const { min, max } = defineProps({
    min: {
        required: true,
        type: Number,
    },
    max: {
        required: true,
        type: Number,
    },
});

const value = shallowRef(min);

const launched = shallowRef(false);

function change({ target }: any) {
    if (target.value >= min && target.value <= max) {
        value.value = Number(target.value);
    } else if (target.value < min) {
        value.value = min;
    } else if (target.value > max) {
        value.value = max;
    }
    emit('change', value.value, launched.value);
}

function click() {
    launched.value = !launched.value;
    emit('change', value.value, launched.value);
}
</script>

<template>
    <div>
        <h4>УКАЖИТЕ РАЗМЕР ПОЛЯ ОТ {{ min }} ДО {{ max }}</h4>
        <div>
            <input
                type="number"
                @change="change"
                :disabled="launched"
                :value="value"
                :min="min"
                :max="max"
            />
        </div>

        <button @click="click">
            {{ launched ? 'Остановить' : 'Запустить' }}
        </button>
    </div>
</template>

<style scoped>
button {
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: #4676d7;
    color: #fff;
    padding: 8px 16px;
    font-size: 16px;
    margin-top: 30px;
}
</style>
