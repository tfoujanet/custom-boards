<template>
  <v-layout column>
    <v-text-field
      label="Organisation"
      :value="organization"
      @blur="organization = $event.target.value"
    ></v-text-field>
    <v-text-field
      label="Token"
      :value="token"
      @blur="token = $event.target.value"
      hint="Ce token doit être un Personal Access Token à générer depuis Azure DevOps"
      persistent-hint
      append-outer-icon="help"
      @click:append-outer="showTokenHelp()"
    ></v-text-field>
  </v-layout>
</template>

<script>
export default {
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
