import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import './registerServiceWorker';
import { firestorePlugin } from 'vuefire';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faMinus,
  faChevronDown,
  faChevronUp,
  faTimes,
  faQuestion,
  faListOl,
  faListUl,
  faUndo,
  faShoppingBasket,
  faSync,
  faStore,
  faPencilAlt,
  faTrash,
  faCarrot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { shopStore } from './store/store';

library.add(
  faPlus,
  faSync,
  faMinus,
  faChevronDown,
  faChevronUp,
  faTimes,
  faQuestion,
  faListOl,
  faListUl,
  faUndo,
  faShoppingBasket,
  faStore,
  faPencilAlt,
  faTrash,
  faCarrot
);

Vue.use(VueCompositionApi);
Vue.use(firestorePlugin);
Vue.component('fa-i', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  provide: {
    shopStore: shopStore(),
  },
}).$mount('#app');
