<template>
  <div class="field">
    <svg
      @click="(e) => $emit('save', { x: e.layerX, y: e.layerY })"
      class="field__svg"
      :viewport="`0 0 ${width} ${height}`"
      :width="width"
      :height="height"
    >
      <text
        v-for="(coordinate, idx) of coordinates"
        :x="coordinate.x + 4"
        :y="coordinate.y + 8"
        class="svg__text"
        :key="idx + 'text'"
      >
        {{ idx + 1 + ` (${coordinate.x};${coordinate.y})` }}
      </text>
      <circle
        v-for="(coordinate, idx) of coordinates"
        :cx="coordinate.x"
        :cy="coordinate.y"
        r="1"
        stroke="red"
        fill="red"
        stroke-width="1"
        :key="idx + 'dote'"
      />

      <line
        v-for="(coordinate, idx) of lineCoordinate"
        :x1="coordinate.x1"
        :y1="coordinate.y1"
        :x2="coordinate.x2"
        :y2="coordinate.y2"
        class="svg__line"
        :key="idx + 'line'"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    coordinates: Array,
    height: {
      type: Number,
      default: 350,
    },
    width: {
      type: Number,
      default: 350,
    },
  },
  computed: {
    lineCoordinate() {
      let newArray = this.coordinates.map((coordinate, idx, array) => {
        let obj = {
          x1: coordinate.x,
          y1: coordinate.y,
        };
        array[idx + 1] ? (obj.x2 = array[idx + 1].x) : (obj.x2 = obj.x1);
        array[idx + 1] ? (obj.y2 = array[idx + 1].y) : (obj.y2 = obj.y1);
        return obj;
      });
      return newArray;
    },
  },
};
</script>

<style lang="scss">
.field__svg {
  border: 1px solid red;
}
.svg__line {
  stroke: black;
}
.svg__text {
  font-size: 8px;
}
</style>
