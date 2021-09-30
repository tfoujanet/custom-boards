<template>
  <v-row no-gutters align-content="center">
    <v-select
      :items="members"
      multiple
      label="AssignedTo"
      v-model="selectedMembers"
      dense
      hide-details
    ></v-select>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("workItems", ["members"]),
    selectedMembers: {
      get: function () {
        return this.$store.state.boards?.selectedMembers || [];
      },
      set: function (val) {
        this.$store.dispatch("boards/filterMembers", val);
      },
    },
  },
};
</script>