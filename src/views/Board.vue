<template>
  <v-row style="max-height: 100vh">
    <v-col v-for="(col, i) in selectedBoard.columns" :key="i">
      <v-card>
        <v-card-title>
          {{ col.label }}
          <v-spacer />
          <v-btn icon class="d-none d-md-flex">
            <v-icon>settings</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout column fill-height>
            <v-card
              v-for="(wi, i) in col.workItems"
              :key="i"
              style="margin-top: 0.5rem; margin-botton: 0.5rem"
              @click="openWorkItem(wi)"
            >
              <v-card-title>{{ wi.id }} - {{ wi.title }}</v-card-title>
              <v-card-subtitle
                >{{ wi.state }} - {{ wi.assignedTo }}</v-card-subtitle
              >
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
      workItemsList: (state) => state.list || [],
    }),
    ...mapGetters("boards", ["selectedBoard"]),
  },

  methods: {
    ...mapActions("boards", ["selectBoard"]),
    openWorkItem(wi) {
      window.open(wi.url, "blank");
    }
  },

  mounted() {
    const { id } = this.$route.params;
    if (!this.boards.some(_ => _.id === id)) {
      this.$router.replace('/');
      return;
    }
    this.selectBoard(this.$route.params.id);
  },

  watch: {
    $route: function (val) {
      this.selectBoard(val.params.id);
    },
  },
};
</script>
