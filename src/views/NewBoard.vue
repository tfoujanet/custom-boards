<template>
  <v-card>
    <v-card-title>Nouveau board</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-form>
          <dev-ops-auth :value="devopsAuth" @input="authenticate($event)" />
          <v-select
            v-if="projects.length"
            :items="projects"
            :value="project"
            @input="setProject($event)"
            label="Projet"
            item-text="name"
            item-value="id"
          ></v-select>
          <v-select
            v-if="!!project && teams.length"
            :items="teams"
            label="Equipe"
            item-text="name"
            item-value="id"
            :value="team"
            @input="setTeam($event)"
          ></v-select>

          <v-select
            v-if="!!project && typeList.length"
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
              @input="updateColumn($event, i)"
              :statuses="workItemStatuses"
            />
            <v-row>
              <v-col>
                <v-text-field
                  label="label"
                  v-model="newColumnLabel"
                  @blur="addColumn()"
                />
              </v-col>
            </v-row>
          </template>
        </v-form>
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
import DevOpsAuth from "../components/DevOpsAuth.vue";
export default {
  components: { BoardColumn, DevOpsAuth },
  computed: {
    ...mapState("referential", {
      projects: (state) => state.projects,
      teams: (state) => state.teams,
      typeList: (state) => state.types,
    }),
    canSave() {
      return (
        !!this.devopsAuth.organization &&
        !!this.devopsAuth.token &&
        !!this.project &&
        !!this.team &&
        this.types.length &&
        this.columns.length
      );
    },
    workItemStatuses() {
      return this.typeList.reduce((acc, curr) => {
        if (!this.types.includes(curr.name)) {
          return acc;
        }

        return [
          ...acc,
          ...curr.states
            .filter((s) => !acc.includes(s.name))
            .map((_) => _.name),
        ];
      }, []);
    },
  },

  methods: {
    ...mapActions("referential", [
      "loadProjects",
      "loadTeams",
      "loadWorkItemTypes",
      "loadIterations",
    ]),
    ...mapActions("auth", ["saveAuthInfos"]),
    ...mapActions("board", ["update"]),
    validate() {
      this.update({
        organization: this.devopsAuth.organization,
        token: this.devopsAuth.token,
        project: this.project,
        team: this.team,
        types: this.types,
        columns: this.columns,
      });
      this.$router.push("/");
    },
    updateColumn(column, index) {
      const columns = [...this.columns];
      columns[index] = column;
      this.columns = columns;
    },
    addColumn() {
      if (this.newColumnLabel?.length) {
        this.columns = [
          ...this.columns,
          { label: this.newColumnLabel, statuses: [] },
        ];
        this.newColumnLabel = "";
      }
    },
    showTokenHelp() {},
    authenticate(auth) {
      this.devopsAuth = { ...auth };
      this.saveAuthInfos(auth).then(() => this.loadProjects());
    },
    setProject(project) {
      this.project = project;
      this.loadTeams(project);
      this.loadWorkItemTypes(project);
    },
    setTeam(team) {
      this.team = team;
      this.loadIterations({
        teamId: team,
        projectId: this.project,
      });
    },
  },

  data() {
    return {
      newColumnLabel: "",
      devopsAuth: {
        organization: "",
        token: "",
      },
      project: "",
      team: "",
      types: [],
      columns: [],
    };
  },
};
</script>
