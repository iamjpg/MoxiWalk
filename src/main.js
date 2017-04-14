// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PouchDB from 'pouchdb-browser';
import Store from './data/store';
import Helpers from './contrib/helpers';
import * as Env from './const/env';

Vue.config.productionTip = false

$.getJSON(`${Env.API_BASE_URL}/get_steps?callback=?`, function(res) {
  res.forEach((o, i) => {
    Store.teams[i].totalSteps = o.team_steps
  });

  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
})
