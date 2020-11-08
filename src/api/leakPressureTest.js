import request from '@/utils/request'

  const leakPressureApi = {
    leakPressureSave: '/save-leak-pressure-test'
  }

  export function saveLeakPressureData (parameter) {
    return request({
      url: leakPressureApi.leakPressureSave,
      method: 'post',
      data: parameter
    })
  }
