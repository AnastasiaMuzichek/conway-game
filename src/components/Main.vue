<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import type { Ref, ShallowRef } from 'vue';

type CellState = {
    className: string;
    prev: number;
    current: number;
};

const props = defineProps({
    size: {
        required: true,
        type: Number,
    },
    run: Boolean,
});

const cells: Ref<CellState[][]> = ref([]);
const cellHeight = shallowRef(0);
const cellWidth = shallowRef(0);
const refContainer: ShallowRef<HTMLDivElement | undefined> = shallowRef();

function init() {
    const result = [];

    if (refContainer.value) {
        const width = refContainer.value.offsetWidth;
        const height = refContainer.value.offsetHeight;

        cellHeight.value = height / props.size;
        cellWidth.value = width / props.size;
    }

    for (let i = 0; i < props.size; i++) {
        const row: CellState[] = [];
        for (let j = 0; j < props.size; j++) {
            row.push({
                className: '',
                current: Math.random() > 0.5 ? 1 : 0,
                prev: 0,
            });
        }
        result.push(row);
    }
    cells.value = result;
}

function getCellStatus(cell: number, n: number) {
    if (cell === 0) {
        if (n >= 3) {
            return 1;
        }
    } else if (n < 2 || n > 3) {
        return 0;
    } else {
        return cell;
    }
    return cell;
}

function nextCycle() {
    console.log('Текс');

    const result: CellState[][] = [];

    for (let i = 0; i < props.size; i++) {
        result.push([]);
        for (let j = 0; j < props.size; j++) {
            const up =
                getCellValue(cells.value, i - 1, j - 1) +
                getCellValue(cells.value, i - 1, j) +
                getCellValue(cells.value, i - 1, j + 1);
            const mid =
                getCellValue(cells.value, i, j - 1) +
                getCellValue(cells.value, i, j + 1);
            const down =
                getCellValue(cells.value, i + 1, j - 1) +
                getCellValue(cells.value, i + 1, j) +
                getCellValue(cells.value, i + 1, j + 1);
            const cell = cells.value[i][j];
            const value = getCellStatus(cell.current, up + mid + down);

            result[i].push({
                prev: cell.current,
                current: value,
                className: '',
            });
        }
    }
    cells.value = result;
    defineCurrentStates();
}

function getCellClass(cell: CellState, n: number): string {
    if (cell.current === 1) {
        if (cell.prev === 0) {
            return 'cell-revived';
        } else if (n < 2 || n > 3) {
            return 'cell-sick';
        } else {
            return 'cell-alive';
        }
    }
    return 'cell-dead';
}

function defineCurrentStates() {
    for (let i = 0; i < props.size; i++) {
        for (let j = 0; j < props.size; j++) {
            const up =
                getCellValue(cells.value, i - 1, j - 1) +
                getCellValue(cells.value, i - 1, j) +
                getCellValue(cells.value, i - 1, j + 1);
            const mid =
                getCellValue(cells.value, i, j - 1) +
                getCellValue(cells.value, i, j + 1);
            const down =
                getCellValue(cells.value, i + 1, j - 1) +
                getCellValue(cells.value, i + 1, j) +
                getCellValue(cells.value, i + 1, j + 1);
            const cell = cells.value[i][j];
            cell.className = getCellClass(cell, up + mid + down);
        }
    }
}

function getCellValue(
    arr: CellState[][],
    indexVertical: number,
    indexHorizontal: number
) {
    if (indexVertical < 0) {
        indexVertical = arr.length - 1;
    } else if (indexVertical >= arr.length) {
        indexVertical = 0;
    }
    if (indexHorizontal < 0) {
        indexHorizontal = arr[0].length - 1;
    } else if (indexHorizontal >= arr[0].length) {
        indexHorizontal = 0;
    }
    return arr[indexVertical][indexHorizontal].current || 0;
}

const timer = shallowRef(0);

onMounted(() => {
    if (refContainer.value === undefined) {
        return;
    }

    init();

    watch(() => props.size, init);
    watch(
        () => props.run,
        (value: boolean) => {
            if (value) {
                timer.value = setInterval(nextCycle, 1000);
            } else {
                clearInterval(timer.value);
            }
        }
    );
});

onUnmounted(() => {
    clearInterval(timer.value);
});
</script>

<template>
    <div ref="refContainer" class="container">
        <div v-for="row in cells" class="cell-row">
            <div
                v-for="cell in row"
                class="cell"
                :class="cell.className"
                :style="{ height: cellHeight + 'px', width: cellWidth + 'px' }"
            ></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 500px;
    width: 500px;
    background-color: sandybrown;
}

.cell-row {
    display: flex;
}
</style>
