<template>
  <v-layout fill-height column>
    <v-row>
      <v-col v-for="(col, i) in columns" :key="i">
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
              <work-item
                v-for="(wi, i) in col.workItems"
                :key="i"
                :value="wi"
              />
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import WorkItem from "../components/WorkItem.vue";

export default {
  name: "Home",

  components: { WorkItem },

  computed: {
    ...mapState("board", {
      board: (_) => _,
      project: (_) => _.project,
      team: (_) => _.team,
      teamContext: (_) => ({ project: _.project, team: _.team }),
    }),
    ...mapState("workItems", {
      workItems: (_) => _.list,
    }),
    columns() {
      const selectedWorkItems = (this.workItems || []).filter((_) =>
        this.board.types.includes(_.type)
      );
      return (this.board.columns || []).map((_) => ({
        ..._,
        workItems: selectedWorkItems
          .filter((wi) => _.statuses.includes(wi.state))
          .map((wi) => ({
            ...wi,
            url: `https://dev.azure.com/${this.board.organization}/${this.board.project}/_workitems/edit/${wi.id}/`,
          })),
      }));
    },
  },

  methods: {
    ...mapActions("referential", ["loadIterations"]),
    ...mapActions("workItems", ["loadWorkItems"]),
  },

  mounted() {
    this.loadIterations({
      teamId: this.team,
      projectId: this.project,
    }).then(() => this.loadWorkItems(this.teamContext));
  },
};
</script>
