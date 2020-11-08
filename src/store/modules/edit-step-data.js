const EditStepDataStore = {
  state: {
    stepEditData: []
  },
  mutations: {
    SET_STEP_EDIT_DATA: (state, data) => {
      if (data === null) {
        state.stepEditData.length = 0
      } else {
        state.stepEditData = data
      }
    }
  },

  actions: {
  }
}

export default EditStepDataStore
