<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <component v-if="actionBar" :is="actionBar" />

      <v-spacer></v-spacer>

      <!-- <v-btn icon text>
        <v-icon>more_vert</v-icon>
      </v-btn> -->
      <v-menu left bottom v-if="hasBoard">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs" v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="exportBoard()">
            <v-list-item-title>
              Exporter
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="config = true">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Paramètres
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <board-config v-model="config" />
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BoardFilter from "./components/BoardFilter.vue";
import BoardConfig from "./components/BoardConfig.vue";
export default {
  name: "App",
  components: { BoardFilter, BoardConfig },

  data: () => ({
    config: false,
  }),

  computed: {
    ...mapGetters(["hasBoard"]),
    ...mapState("board", {
      exportableBoard: (_) => ({
        organization: _.organization,
        project: _.project,
        team: _.team,
        types: _.types,
        columns: _.columns,
      }),
    }),
    actionBar() {
      switch (this.$route.name) {
        case "Home":
          return BoardFilter;
        default:
          return undefined;
      }
    },
  },

  methods: {
    exportBoard() {
      const serializedBoard = JSON.stringify(this.exportableBoard);
      this.$copyText(serializedBoard, this.$el)
        .then(() => {
          window.alert(
            "Le contenu du board a été placé dans le presse-papier."
          );
        })
        .catch((e) => {
          window.alert(`Une erreur s'est produite pendant l'ajout du board dans le presse-papier.
          ${e}`);
        });
    },
  },

  created() {
    this.$store.dispatch("auth/connect");
  },
};
</script>
