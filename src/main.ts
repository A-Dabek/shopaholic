import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api';
import "./registerServiceWorker";
import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(firestorePlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");
