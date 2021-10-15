<template>
  <v-dialog :value="value" @input="$emit('input', $event)">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-layout column>
              <v-select
                :items="workItemTypes"
                multiple
                label="Types de Work items"
                item-text="name"
                item-value="name"
                v-model="types"
              ></v-select>

              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      Type
                    </th>
                    <th class="text-left">
                      Couleur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in types" :key="i">
                    <td>{{ item }}</td>
                    <td>
                      <v-select
                        :items="colorList"
                        label="Couleur"
                        item-text="label"
                        item-value="value"
                        :value="colors[item]"
                        @input="updateColor(item, $event)"
                        clearable
                      >
                        <template v-slot:item="{ item, on }">
                          <v-list-item ripple v-on="on">
                            <v-list-item-action>
                              <v-icon :color="item.label + ' lighten-3'">
                                color_lens
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title v-text="item.label" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-layout>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save()">
          Valider
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vuetifyColors from "vuetify/lib/util/colors";
import { toKebab } from "@/services/string-helper";

export default {
  props: {
    value: Boolean,
  },
  computed: {
    ...mapState("referential", {
      workItemTypes: (_) => _.types,
    }),
    ...mapState("board", {
      colors: (_) => _.colors || {},
    }),
    types: {
      get: function() {
        return this.$store.state.board.types;
      },
      set: function(types) {
        this.update({ types });
      },
    },
    colorList() {
      return Object.keys(vuetifyColors).map((_) => ({
        label: toKebab(_),
        value: toKebab(_),
      }));
    },
  },
  methods: {
    ...mapActions("board", ["update"]),
    updateColor(type, color) {
      this.update({
        colors: {
          ...(this.colors || {}),
          [type]: color,
        },
      });
    },
  },
  data() {
    return {
      states: [],
    };
  },
};
</script>
