<template>
  <v-layout column>
    <v-text-field
      label="Organisation"
      :value="organization"
      @blur="organization = $event.target.value"
    ></v-text-field>
    <personal-access-token v-model="token" />
  </v-layout>
</template>

<script>
import PersonalAccessToken from "./PersonalAccessToken.vue";

export default {
  components: { PersonalAccessToken },
  props: {
    value: Object,
  },
  data() {
    return {
      organization: this.value.organization || "",
      token: this.value.token || "",
    };
  },
  watch: {
    organization: function(val) {
      if (!!val && !!this.token) {
        this.$emit("input", { organization: val, token: this.token });
      }
    },
    token: function(val) {
      if (!!val && !!this.organization) {
        this.$emit("input", { token: val, organization: this.organization });
      }
    },
  },
};
</script>
