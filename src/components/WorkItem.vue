<template>
  <v-card
    style="margin-top: 0.5rem; margin-botton: 0.5rem"
    @click="open()"
    :color="color"
  >
    <v-card-title class="wrap-word"
      >{{ value.id }} - {{ value.title }}</v-card-title
    >
    <v-card-subtitle
      >{{ value.state }} - {{ value.assignedTo }}</v-card-subtitle
    >
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: Object,
  },

  computed: {
    ...mapState("board", {
      colors: (_) => _.colors || {},
    }),
    color() {
      const selectedColor = this.colors[this.value.type];
      return selectedColor 
        ? `${selectedColor} lighten-3` 
        : undefined;
    },
  },

  methods: {
    open() {
      window.open(this.value.url, "blank");
    },
  },
};
</script>

<style scoped>
.wrap-word {
  word-break: normal !important;
  overflow-wrap: break-word;
}
</style>
