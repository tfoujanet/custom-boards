<template>
  <v-row no-gutters align-content="center">
    <v-select
      :items="membersList"
      multiple
      label="Assigned To"
      v-model="selectedMembers"
      item-text="label"
      item-value="value"
      dense
      hide-details
      clearable
    ></v-select>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("workItems", ["members"]),
    membersList() {
      const members = this.members || [];
      return [
        ...(members.some((_) => !_) ? [""] : []),
        ...members.filter(Boolean).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
      ].map((_) => ({
        label: _ ? _ : "Unassigned",
        value: _,
      }));
    },
    selectedMembers: {
      get: function() {
        return this.$store.state.workItems.filteredMembers || [];
      },
      set: function(val) {
        this.$store.dispatch("workItems/filterMembers", val);
      },
    },
  },
};
</script>
