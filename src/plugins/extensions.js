import Vue from "vue";
import VueClipboard from "vue-clipboard2";

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Array.prototype.sortBy = function(prop) {
  return this.sort((a, b) => {
    const propA = a[prop];
    const propB = b[prop];
    return propA < propB ? -1 : propA > propB ? 1 : 0;
  });
};
