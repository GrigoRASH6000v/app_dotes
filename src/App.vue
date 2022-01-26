<template>
  <div id="app">
    <button v-if="!setCoordinate" @click="setCoordinate = true">
      Задать входные данные
    </button>
    <points-form
      :limit="limitDotes"
      :dotesTotal="dotes.length"
      v-else
      @save="saveDote"
      @clear="clearDotes"
      :cb="tempCheck"
    />
    <field :coordinates="dotes" />
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
      limitDotes: 4,
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
      if (this.dotes.length > this.limitDotes - 1) {
        this.tempCheck();
      }
    },
    arrayReplace(array) {
      let newArray = [...array];
      let a = newArray[1];
      newArray[1] = newArray[2];
      newArray[2] = a;
      return newArray;
    },
    saveDote(values) {
      this.dotes.push(values);
    },
    clearDotes() {
      this.dotes = [];
    },
    tempCheck() {
      let result = this.CrossingCheck(
        this.dotes[0],
        this.dotes[1],
        this.dotes[2],
        this.dotes[3]
      );
      if (!result) return this.dotes;
      this.dotes = this.arrayReplace(this.dotes);
    },
    IntersectionY(a1, b1, c1, a2, b2, c2) {
      let d, dy, pointy;
      d = a1 * b2 - b1 * a2;
      dy = -a1 * c2 + c1 * a2;
      pointy = dy / d;
      return pointy;
    },
    IntersectionX(a1, b1, c1, a2, b2, c2) {
      let d, dx, pointx;
      d = a1 * b2 - b1 * a2;
      dx = -c1 * b2 + b1 * c2;
      pointx = dx / d;
      return pointx;
    },
    EquationOfTheLine(p1, p2) {
      this.A = p2.y - p1.y;
      this.B = p1.x - p2.x;
      this.C = -p1.x * (p2.y - p1.y) + p1.y * (p2.x - p1.x);
    },
    CrossingCheck(p1, p2, p3, p4) {
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
