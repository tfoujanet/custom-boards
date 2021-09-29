<template>
  <v-card elevation="2">
    <v-card-title>Paramètres</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="Organisation"
            v-model="organization"
            hint="https://dev.azure.com/<<orgName>>"
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Token"
            v-model="token"
            hint="Personal Access Token à générer depuis DevOps"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveAuthInfos()">Valider</v-btn>
      <v-btn @click="$router.go(-1)">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    saveAuthInfos() {
      this.$store.dispatch("auth/saveAuthInfos", {
        organization: this.organization,
        token: this.token,
      });
      this.$router.push("/");
    },
  },
  data() {
    return {
      organization: this.$store.state.auth.organization,
      token: this.$store.state.auth.token,
    };
  },
};
</script>
