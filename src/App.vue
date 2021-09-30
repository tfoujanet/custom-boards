<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <component v-if="actionBar" :is="actionBar" />

      <v-spacer></v-spacer>

      <v-btn icon text @click="$router.push('/settings')">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BoardFilter from "./components/BoardFilter.vue";
export default {
  name: "App",
  components: { BoardFilter },

  data: () => ({
    //
  }),

  computed: {
    actionBar() {
      switch(this.$route.name) {
        case "Board":
          return BoardFilter;
        default:
          return undefined;
      }
    }
  },

  mounted() {
    this.$store.dispatch("auth/connect");
  },
};
</script>
