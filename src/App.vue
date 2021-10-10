<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <component v-if="actionBar" :is="actionBar" />

      <v-spacer></v-spacer>

      <!-- <v-btn icon text v-if="hasBoard">
        <v-icon>more_vert</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import BoardFilter from "./components/BoardFilter.vue";
export default {
  name: "App",
  components: { BoardFilter },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(["hasBoard"]),
    actionBar() {
      switch (this.$route.name) {
        case "Home":
          return BoardFilter;
        default:
          return undefined;
      }
    },
  },

  created() {
    this.$store.dispatch("auth/connect");
  },
};
</script>
