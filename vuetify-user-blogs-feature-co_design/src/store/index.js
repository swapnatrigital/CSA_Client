import Vue from 'vue'
import Vuex from 'vuex'
import channelModule from './modules/channel'
import auth from './modules/auth'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    channel: channelModule,
    auth,
  }
});
