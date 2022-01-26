<template>
  <div id="app">
    <button v-if="!setCoordinate" @click="setCoordinate = true">
      Задать входные данные
    </button>
    <points-form
      :limitX="width"
      :limitY="height"
      :dotesTotal="dotes.length"
      v-else
      @save="saveDote"
      @clear="clearDotes"
      :cb="tempCheck"
    />
    <field :width="width" :height="height" :coordinates="dotes" />
  </div>
</template>

<script>
import dotes from "./data/dotes.json";
import pointsForm from "@/components/pointsForm";
import field from "@/components/field";
export default {
  name: "App",
  data() {
    return {
      width: 350,
      height: 350,
      setCoordinate: false,
      dotes,
      ctx: null,
      idA: null,
      x: null,
      y: null,
      A: null,
      B: null,
      C: null,
      pointxx: null,
      pointyy: null,
    };
  },
  components: {
    field,
    "points-form": pointsForm,
  },
  methods: {
    init() {
      if (this.dotes.length > 3) {
        this.tempCheck();
      }
    },
    arrayReplace(start, end) {
      let newArray = [...this.dotes];
      let a = newArray[start];
      newArray[start] = newArray[end];
      newArray[end] = a;
      this.dotes = newArray;
    },
    saveDote(values) {
      this.dotes.push(values);
    },
    clearDotes() {
      this.dotes = [];
    },

    tempCheck() {
      let checkedElements1 = [0, 1];
      let checkedElements2 = [1, 2];
      let result = false;
      while (checkedElements1[1] < this.dotes.length - 1) {
        while (checkedElements2[1] < this.dotes.length) {
          result = this.crossingCheck(
            this.dotes[checkedElements1[0]],
            this.dotes[checkedElements1[1]],
            this.dotes[checkedElements2[0]],
            this.dotes[checkedElements2[1]]
          );
          if (result) break;
          ++checkedElements2[0];
          ++checkedElements2[1];
        }
        if (result) break;
        ++checkedElements1[0];
        ++checkedElements1[1];

        checkedElements2[0] = checkedElements1[0] + 1;
        checkedElements2[1] = checkedElements1[1] + 1;
      }
      if (result) {
        this.arrayReplace(checkedElements1[1], checkedElements2[0]);
        this.tempCheck();
      }
      return;
    },
    crossingCheck(p1, p2, p3, p4) {
      let v1, v2, v3, v4;

      v1 = this.vectorProduct(
        p4.x - p3.x,
        p4.y - p3.y,
        p1.x - p3.x,
        p1.y - p3.y
      );
      v2 = this.vectorProduct(
        p4.x - p3.x,
        p4.y - p3.y,
        p2.x - p3.x,
        p2.y - p3.y
      );
      v3 = this.vectorProduct(
        p2.x - p1.x,
        p2.y - p1.y,
        p3.x - p1.x,
        p3.y - p1.y
      );
      v4 = this.vectorProduct(
        p2.x - p1.x,
        p2.y - p1.y,
        p4.x - p1.x,
        p4.y - p1.y
      );
      if (v1 * v2 < 0 && v3 * v4 < 0) return true;
      else return false;
    },
    vectorProduct(ax, ay, bx, by) {
      return ax * by - bx * ay;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
#app {
  display: grid;
  justify-content: center;
  row-gap: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
