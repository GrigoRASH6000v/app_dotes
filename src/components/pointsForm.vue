<template>
  <div class="points__form">
    <div class="input__wrp">
      <span>Координата Х</span>
      <input :disabled="dotesTotal === limit" v-model="x" type="number" />
    </div>
    <div class="input__wrp">
      <span>Координата Y</span>
      <input :disabled="dotesTotal === limit" v-model="y" type="number" />
    </div>
    <button :disabled="dotesTotal === limit" @click="saveCoordinate">
      Сохранить точку
    </button>
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
    limit: Number,
  },
  methods: {
    saveCoordinate() {
      this.$emit("save", { x: +this.x, y: +this.y });
      this.x = 0;
      this.y = 0;
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
