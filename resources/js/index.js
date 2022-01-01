import Vue from 'vue';
import App from './src/App.vue';
function render(h) {
  return h(App);
}
const app = new Vue({
    render
});
app.$mount('#app__i');
