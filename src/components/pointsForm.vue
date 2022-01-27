<template>
  <div class="points__form">
    <div class="input__wrp">
      <span>Координата Х</span>
      <input @input="xInputHandler" :value="x" type="number" />
    </div>
    <div class="input__wrp">
      <span>Координата Y</span>
      <input @input="yInputHandler" :value="y" type="number" />
    </div>
    <button @click="saveCoordinate">Сохранить точку</button>
    <button :disabled="dotesTotal < 4" @click="() => cb()">Обработать</button>
    <button @click="$emit('clear')">Очистить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  props: {
    cb: Function,
    dotesTotal: Number,
    limitX: Number,
    limitY: Number,
  },
  methods: {
    saveCoordinate() {
      this.$emit("save", { x: +this.x, y: +this.y });
      this.x = 0;
      this.y = 0;
    },
    xInputHandler(e) {
      if (+e.target.value > this.limitX) {
        e.target.value = this.limitX;
        this.x = this.limitX;
        return;
      }
      if (+e.target.value < 0) {
        e.target.value = 0;
        this.x = 0;
        return;
      }
      this.x = +e.target.value;
    },
    yInputHandler(e) {
      if (+e.target.value > this.limitY) {
        e.target.value = this.limitY;
        this.y = this.limitY;
        return;
      }
      if (+e.target.value < 0) {
        e.target.value = 0;
        this.y = 0;
        return;
      }
      this.y = +e.target.value;
    },
  },
};
</script>

<style>
.points__form {
  display: flex;
  justify-content: center;
  column-gap: 20px;
  align-items: flex-end;
}
.input__wrp {
  display: grid;
  row-gap: 10px;
}
</style>
