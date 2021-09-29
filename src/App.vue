<template>
  <v-app>
    <v-app-bar app color="primary" dark>
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
export default {
  name: "App",

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch("auth/connect");
  },
};
</script>
