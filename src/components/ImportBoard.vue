<template>
  <v-dialog :value="value" @input="changeVisibility($event)">
    <v-card>
      <v-card-title>Importer un board</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-textarea
            label="Contenu du board"
            v-model="boardContent"
          ></v-textarea>
          <personal-access-token v-model="token" :label="tokenLabel" />
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="valider()">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import PersonalAccessToken from "./PersonalAccessToken.vue";

export default {
  props: {
    value: Boolean,
  },

  components: { PersonalAccessToken },

  computed: {
    organization() {
      const serialized = this.boardContent || "{}";
      const { organization } = JSON.parse(serialized);
      return organization || "";
    },
    tokenLabel() {
      return this.organization ? `Token pour ${this.organization}` : "Token";
    },
  },

  methods: {
    ...mapActions("board", ["importBoard"]),
    valider() {
      this.importBoard({
        token: this.token,
        content: this.boardContent,
      }).then(() => {
        this.$emit("imported");
        this.changeVisibility(false);
      });
    },
    changeVisibility(isOpen) {
      if (!isOpen) {
        this.boardContent = "";
        this.token = "";
      }
      this.$emit("input", isOpen);
    },
  },

  data() {
    return {
      boardContent: "",
      token: "",
    };
  },
};
</script>
