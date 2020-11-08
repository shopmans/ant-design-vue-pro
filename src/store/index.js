import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import editStepData from './modules/edit-step-data'
import uploadFileMD5Store from './modules/upload-file-md5'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    editStepData,
    uploadFileMD5Store
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
