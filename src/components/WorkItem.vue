<template>
  <v-card style="margin-top: 0.5rem; margin-botton: 0.5rem" @click="open()">
    <v-card-title class="wrap-word"
      >{{ value.id }} - {{ value.title }}</v-card-title
    >
    <v-card-subtitle
      >{{ value.state }} - {{ value.assignedTo }}</v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  props: {
    value: Object,
  },

  methods: {
    open() {
      window.open(this.value.url, "blank");
    },
  },
};
</script>

<style>
.wrap-word {
  word-break: normal;
  overflow-wrap: break-word;
}
</style>
