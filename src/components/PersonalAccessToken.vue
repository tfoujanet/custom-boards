<template>
  <v-text-field
    label="Token"
    :value="value"
    @blur="$emit('input', $event.target.value)"
    hint="Ce token doit être un Personal Access Token à générer depuis Azure DevOps"
    persistent-hint
    @click:append-outer="showTokenHelp()"
  >
    <template v-slot:append-outer>
      <v-dialog v-model="dialog" width="50%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs" v-on="on">
            <v-icon>help</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-img
            contain
            class="white--text align-end justify-center"
            src="../assets/select-personal-access-tokens.jpg"
            :aspect-ratio="16 / 9"
          >
            <v-card-title>Gérer les Personal Access Token</v-card-title>
          </v-img>
          <v-card-actions>
            <v-btn text @click="openDevopsDoc()" color="success"
              >Plus d'infos</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: String,
  },
  methods: {
    showTokenHelp() {},
    openDevopsDoc() {
      window.open(
        "https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page",
        "_blank"
      );
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
