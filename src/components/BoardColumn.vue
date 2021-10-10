<template>
  <v-row>
    <v-col>
      <v-text-field
        label="label"
        :value="value.label"
        @blur="$emit('input', { ...value, label: $event.target.value })"
      />
    </v-col>
    <v-col>
      <v-select
        :items="statuses"
        multiple
        label="Statuts"
        item-text="name"
        item-value="name"
        :value="value.statuses"
        @change="$emit('input', { ...value, statuses: $event })"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: Object,
    statuses: Array,
  },
};
</script>
