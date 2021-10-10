<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-layout column>
        <v-alert color="info" icon="warning" class="text-center">
          Aucun board présent. Vous pouvez en créer un, ou en importer
        </v-alert>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$router.push('/new-board')">
        <v-icon>add</v-icon>
        Ajouter
      </v-btn>
      <v-btn color="secondary" @click="isImport = true">
        <v-icon>file_download</v-icon>
        Importer
      </v-btn>
    </v-card-actions>
    <import-board v-model="isImport" @imported="$router.push('/')" />
  </v-card>
</template>

<script>
import ImportBoard from "../components/ImportBoard.vue";
export default {
  components: { ImportBoard },
  data() {
    return {
      isImport: false,
    };
  },
};
</script>
