<template>
  <v-row justify="center">
    <v-dialog :value="value" @input="$emit('input', $event)">
      <v-card v-if="column">
        <v-card-text>
          <v-layout column>
            <v-text-field label="label" v-model="label"></v-text-field>
            <v-select
              :items="workItemStatuses"
              multiple
              label="Statuts"
              item-text="name"
              item-value="name"
              v-model="states"
            ></v-select>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save()">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: Boolean,
    column: Object,
  },

  computed: {
    ...mapGetters("board", ["workItemStatuses"]),
  },

  data() {
    return {
      label: "",
      states: [],
    };
  },

  methods: {
    save() {
      this.$emit("updated", {
        oldLabel: this.column.label,
        label: this.label,
        statuses: this.states,
      });
      this.$emit("input", false);
    },
  },

  watch: {
    column: function(val, oldVal) {
      const newColumn = val || {};
      const oldColumn = oldVal || {};
      if (newColumn.label !== oldColumn.label) {
        this.label = newColumn.label || "";
      }
      if (newColumn.statuses !== oldColumn.statuses) {
        this.states = newColumn.statuses || [];
      }
    },
  },
};
</script>
