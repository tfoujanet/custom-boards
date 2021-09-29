<template>
  <v-card>
    <v-card-title>Nouveau board</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-text-field label="Nom" v-model="nom"></v-text-field>
        <v-select
          :items="projects"
          v-model="project"
          label="Projet"
          item-text="name"
          item-value="id"
        ></v-select>
        <v-select
          v-if="!!project"
          :items="teams"
          label="Equipe"
          item-text="name"
          item-value="id"
          v-model="team"
        ></v-select>
        <v-select
          v-if="!!project"
          :items="typeList"
          multiple
          label="Types de WI"
          item-text="name"
          item-value="name"
          v-model="types"
        ></v-select>
        <template v-if="!!types.length">
          <board-column
            v-for="(column, i) in columns"
            :key="i"
            :value="column"
            @change="updateColumn($event, i)"
            :types="types"
          />
          <v-row>
            <v-col>
              <v-text-field
                label="label"
                v-model="newColumnLabel"
                @blur="addColumn()"
              />
            </v-col>
            <v-col v-for="(type, i) in current.types" :key="i"> </v-col>
          </v-row>
        </template>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :disabled="!canSave" @click="validate()"
        >Valider</v-btn
      >
      <v-btn @click="$router.go(-1)">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BoardColumn from "../components/BoardColumn.vue";
export default {
  components: { BoardColumn },
  computed: {
    ...mapState("referential", {
      projects: (state) => state.projects,
      teams: (state) => state.teams,
      typeList: (state) => state.types,
    }),
    ...mapState("boards", {
      current: (state) => state.current,
      boardNames: (state) => state.list.map((_) => _.name),
    }),
    nom: {
      get: function() {
        return this.current.name || "";
      },
      set: function(name) {
        this.updateCurrent({ name });
      },
    },
    project: {
      get: function() {
        return this.current.project;
      },
      set: function(val) {
        this.selectProject(val);
      },
    },
    team: {
      get: function() {
        return this.current.team;
      },
      set: function(val) {
        this.selectTeam(val);
      },
    },
    types: {
      get: function() {
        return this.current.types || [];
      },
      set: function(val) {
        this.updateCurrent({ types: val });
      },
    },
    columns() {
      return this.current.columns || [];
    },
    canSave() {
      return (
        !!this.nom &&
        !this.boardNames.some((_) => _ === this.nom) &&
        !!this.project &&
        !!this.team
      );
    },
  },

  methods: {
    ...mapActions("referential", ["loadProjects"]),
    ...mapActions("boards", [
      "updateCurrent",
      "selectProject",
      "selectTeam",
      "resetCurrent",
      "saveBoard",
    ]),
    validate() {
      this.saveBoard();
      this.$router.push("/");
    },
    updateColumn(column, index) {
      const columns = [...this.columns];
      columns[index] = column;
      this.updateCurrent({ columns });
    },
    addColumn() {
      if (this.newColumnLabel?.length) {
        const columns = [...this.columns, { label: this.newColumnLabel }];
        this.newColumnLabel = "";
        this.updateCurrent({ columns });
      }
    },
  },

  data() {
    return {
      newColumnLabel: "",
    };
  },

  mounted() {
    this.resetCurrent();
    this.loadProjects();
  },
};
</script>
