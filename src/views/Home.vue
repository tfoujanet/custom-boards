<template>
  <v-layout fill-height>
    <v-row v-if="!isLogged" justify="center">
      <v-col cols="6">
        <v-alert color="error" icon="warning">
          Aucune info de connexion, veuillez saisir des infos de connexion dans
          les paramètres.
        </v-alert>
      </v-col>
    </v-row>
    <template v-else>
      <v-container fluid>
        <v-alert type="info" text dense v-if="!boards.length">
          Vous n'avez pas encore de boards, vous pouvez en créer un en cliquant
          sur le bouton '+'
        </v-alert>
        <v-row>
          <v-col v-for="(board, i) in boards" :key="i">
            <v-card
              style="cursor: pointer"
              @click="$router.push(`/board/${board.id}`)"
            >
              <v-card-title>{{ board.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-btn
      elevation="2"
      fixed
      fab
      bottom
      right
      :disabled="!isLogged"
      color="success"
      @click="$router.push('/new-board')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: "Home",

  computed: {
    isLogged() {
      const { token, organization } = this.$store.state.auth || {};
      return !!token && !!organization;
    },
    boards() {
      return this.$store.state.boards.list || [];
    },
  },
};
</script>
