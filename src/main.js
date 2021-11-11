import Vue from 'vue';
import App from './App.vue';
import { initValidator } from '@/validations.js';

const config = {
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
  },
    bails: true,
    skipOptional: true,
    mode: 'lazy',
    useConstraintAttrs: true
};

initValidator(config);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
