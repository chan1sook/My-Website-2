<template>
  <div class="fixed -z-10 inset-0">
    <canvas ref="circutCanvas" id="circuit-bg" class="absolute"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { Vector2, CircuitCellGrid, CircuitCellDrawer } from "~/src/circuit_draw";

const cellSizeGrid = ref(30);
const circuitWidthPercent = ref(0.1);

function hasDarkClass() {
  return document.body.classList.contains("dark");
}

const circutCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const cellGrid: CircuitCellGrid = new CircuitCellGrid();
const cellDrawer: CircuitCellDrawer = new CircuitCellDrawer();
const collapseJointType = ref(3);

// cellDrawer.debugJoint = false;

let startTs: number | undefined;
let animatedId = 0;

function getCellSize(screenSize: Vector2, divider = 20) {
  const minSize = Math.min(screenSize.x, screenSize.y);
  return minSize / divider;
}

function calcuateCellBound(screenSize: Vector2, cellSize: number) {
  const minX = 0;
  const maxX = Math.ceil(screenSize.x / cellSize);
  const minY = 0;
  const maxY = Math.ceil(screenSize.y / cellSize);
  return { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } }
}

const generateDelay = 100;
function draw(t: number) {
  if (startTs === undefined) {
    startTs = t;
  }
  const elapsedTs = t - startTs;
  if (!circutCanvas.value) {
    animatedId = requestAnimationFrame(draw);
    return;
  }

  circutCanvas.value.width = window.innerWidth;
  circutCanvas.value.height = window.innerHeight;
  const screenSize = new Vector2(circutCanvas.value.width, circutCanvas.value.height);
  const cellSize = getCellSize(screenSize, cellSizeGrid.value);
  const cellBound = calcuateCellBound(screenSize, cellSize);

  if (elapsedTs >= generateDelay) {
    // calculate bound
    const nextCellPosition = cellGrid.scanNextCellPosition(cellBound.x.max, cellBound.y.max);

    if (nextCellPosition) {
      const newCell = cellGrid.getNewCellWithJoint(nextCellPosition);
      newCell.collapseJoint(collapseJointType.value);
      cellGrid.addCell(nextCellPosition, newCell);
    }

    startTs = t - (elapsedTs % generateDelay);
  }

  const isDark = hasDarkClass();
  const ctx = circutCanvas.value.getContext("2d");
  if (!ctx) {
    animatedId = requestAnimationFrame(draw);
    return;
  }

  ctx.fillStyle = isDark ? "#343335" : "#e8f2ea";
  ctx.fillRect(0, 0, circutCanvas.value.width, circutCanvas.value.height);

  cellDrawer.backgroundColor = isDark ? "#343335" : "#e8f2ea";
  cellDrawer.circuitColor = isDark ? "#617c64" : "#b5d9a4";
  cellDrawer.jointSize = circuitWidthPercent.value;
  const drawQueue: ({ z: number, f: () => void })[] = [];
  for (let r = cellBound.y.min; r <= cellBound.y.max; r++) {
    for (let c = cellBound.x.min; c <= cellBound.x.max; c++) {
      const cellData = cellGrid.getCellData(new Vector2(c, r));
      if (typeof cellData !== "undefined") {
        drawQueue.push(...cellDrawer.getDrawFn(ctx, screenSize, cellSize, cellGrid, new Vector2(c, r)));
      }
    }
  }

  drawQueue.sort((a, b) => a.z - b.z);
  for (const ele of drawQueue) {
    ele.f();
  }

  animatedId = requestAnimationFrame(draw);
}


onMounted(() => {
  animatedId = requestAnimationFrame(draw);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animatedId);
})

</script>

<style scoped></style>
