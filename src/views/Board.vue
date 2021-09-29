<template>
  <v-row>
    <v-col v-for="(col, i) in columns" :key="i">
      <v-card>
        <v-card-title>
          {{ col.label }}
        </v-card-title>
        <v-card-text>
          <v-layout column fill-height> </v-layout>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("boards", {
      boards: (state) => state.list || [],
    }),
    boardId() {
      return this.$route.params.id;
    },
    board() {
      return this.boards.find((_) => _.id === this.boardId);
    },
    columns() {
      return this.board.columns || [];
    },
  },

  methods: {
    ...mapActions("boards", ["loadWorkItems"]),
  },

  mounted() {
    this.loadWorkItems(this.boardId);
  },

  watch: {
    $route: function(val) {
      this.loadWorkItems(val.params.id);
    },
  },
};
</script>
