<template>
  <v-row no-gutters align-content="center">
    <v-select
      :items="members"
      multiple
      label="Assigned To"
      v-model="selectedMembers"
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
