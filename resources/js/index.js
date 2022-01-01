import Vue from 'vue';
import App from './src/App.vue';

const tokenAuth = {
  authorization() {
    return `Bearer: ${localStorage.getItem('api_token')}`;
  },
  check() {
    if (localStorage.getItem('api_token')) {
      return true;
    }
    return false;
  },
  set(apiToken) {
    localStorage.setItem('api_token', apiToken);
  },
  forget() {
    localStorage.removeItem('api_token');
  }
};

Vue.prototype.$fetch = {
  get(endpoint) {
    const headers = {};
    if (tokenAuth.check()) {
        headers['Authorization'] = tokenAuth.authorization();
    }
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        headers
      }).then(res => {
        if (res.headers.get('content-type').includes('application/json')) {
          return res.json();
        } else {
          return res.text();
        }
      }, reject).then(resolve, reject);
    });
  },
  post(endpoint, data, headers) {
    headers = Object.assign({}, { "Content-Type": 'application/json' });
    if (tokenAuth.check()) {
      headers['Authorization'] = tokenAuth.authorization();
    }
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: 'POST',
        body: data,
        credentials: "same-origin",
        headers
      })
        .then(res => res.json(), reject)
        .then(resolve, reject);
    });
  },
};

const app = new Vue({
    render: h => h(App)
});
app.$mount('#app__i');
