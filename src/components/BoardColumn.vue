<template>
  <v-row>
    <v-col>
      <v-text-field
        label="label"
        :value="label"
        @blur="label = $event.target.value"
      />
    </v-col>
    <v-col v-for="(type, i) in types" :key="i">
      <v-select
        :items="typeList(type)"
        multiple
        :label="type"
        item-text="name"
        item-value="name"
        :value="statesForType(type)"
        @change="updateTypeStates(type, $event)"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["value"],
  computed: {
    ...mapState("boards", {
      types: (state) => state.current.types,
    }),
    ...mapState("referential", {
      typeList: (state) => (typeName) =>
        state.types.find((s) => s.name === typeName)?.states || [],
    }),
    label: {
      get: function() {
        return this.value.label;
      },
      set: function(val) {
        this.$emit("change", { ...this.value, label: val });
      },
    },
    statesForType() {
      return (type) => (this.value.columns || {})[type];
    },
  },

  methods: {
    updateTypeStates(type, values) {
      this.$emit("change", {
        ...this.value,
        columns: { ...this.value.columns, [type]: values },
      });
    },
  },
};
</script>
