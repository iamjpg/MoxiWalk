// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PouchDB from 'pouchdb-browser';
import Store from './data/store';
import Helpers from './contrib/helpers';

window.db = new PouchDB('were_walking');

Vue.config.productionTip = false

$.getJSON('http://localhost:9292/get_steps', (res) => {
  console.log(res)
  res.forEach((o, i) => {
    Store.teams[i].totalSteps = o.team_steps
  });

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
})
