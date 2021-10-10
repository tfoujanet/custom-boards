<template>
  <v-layout fill-height column>
    <v-row>
      <v-col v-for="(col, i) in columns" :key="i">
        <v-card>
          <v-card-title>
            {{ col.label }}
            <v-spacer />
            <v-btn icon class="d-none d-md-flex" @click="onEditColumn(col)">
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
    <edit-column
      :value="isOpenEdition"
      @input="onModalDisplayChange($event)"
      :column="selectedColumn"
      @updated="updateColumn($event)"
    />
  </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import WorkItem from "../components/WorkItem.vue";
import EditColumn from "../components/EditColumn.vue";

export default {
  name: "Home",

  components: { WorkItem, EditColumn },

  computed: {
    ...mapState("board", {
      board: (_) => _,
      project: (_) => _.project,
      team: (_) => _.team,
      teamContext: (_) => ({ project: _.project, team: _.team }),
    }),
    ...mapGetters("workItems", ["filteredWorkItem"]),
    columns() {
      const selectedWorkItems = (this.filteredWorkItem || []).filter((_) =>
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

  data() {
    return {
      isOpenEdition: false,
      selectedColumn: undefined,
    };
  },

  methods: {
    ...mapActions("referential", ["loadIterations", "loadWorkItemTypes"]),
    ...mapActions("workItems", ["loadWorkItems"]),
    ...mapActions("board", ["updateColumn"]),
    onModalDisplayChange(isOpen) {
      this.isOpenEdition = isOpen;
      if (!isOpen) {
        this.selectedColumn = undefined;
      }
    },
    onEditColumn(column) {
      this.selectedColumn = column;
      this.isOpenEdition = true;
    },
  },

  mounted() {
    this.loadIterations({
      teamId: this.team,
      projectId: this.project,
    }).then(() => this.loadWorkItems(this.teamContext));
    this.loadWorkItemTypes(this.project);
  },
};
</script>
