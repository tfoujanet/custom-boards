<template>
  <v-row style="max-height: 100vh">
    <v-col v-for="(col, i) in selectedBoard.columns" :key="i">
      <v-card>
        <v-card-title>
          {{ col.label }}
        </v-card-title>
        <v-card-text>
          <v-layout column fill-height> 
            <v-card v-for="(wi, i) in col.workItems" :key="i" style="margin-top: .5rem; margin-botton: .5rem;">
              <v-card-title>{{wi.id}} - {{wi.title}}</v-card-title>
              <v-card-subtitle>{{wi.state}} - {{wi.assignedTo}}</v-card-subtitle>
            </v-card>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("boards", {
      boards: (state) => state.list || [],
    }),
    ...mapState("workItems", {
      workItemsList: (state) => (state.list || []),
    }),
    ...mapGetters("boards", ["selectedBoard"]),
  },

  methods: {
    ...mapActions("boards", ["selectBoard"]),
  },

  mounted() {
    this.selectBoard(this.$route.params.id);
  },

  watch: {
    $route: function (val) {
      this.selectBoard(val.params.id);
    },
  },
};
</script>
