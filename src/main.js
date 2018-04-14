// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Store from './data/store';
import Helpers from './contrib/helpers';
import * as Env from './const/env';

window.Store = Store;

Vue.config.productionTip = false

const getEverything = () => {
  return new Promise((resolve, reject) => {
    $.getJSON(`${Env.API_BASE_URL}/api/get_everything?callback=?`, function(res) {

      // Teams
      Store.teams = [];
      res.teams.forEach((o, i) => {
        Store.teams[i] = {
          name: o,
          totalSteps: 0,
          selected: true
        }
      });

      // Steps
      res.steps.forEach((o, i) => {
        Store.teams[o.index].totalSteps = parseInt(Store.teams[o.index].totalSteps) + parseInt(o.steps);
      })

      //icons
      res.icons.forEach((o, i) => {
        Store.teams[i].backgroundIcon = o;
      })

      // Resolve
      resolve();
    })
  });
}

getEverything().then(() => {
  new Vue({
    el: '#app',
    template: '<App/>',
    components: {
      App
    }
  })
})
