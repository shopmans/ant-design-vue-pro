import request from '@/utils/request'

  const assembleApi = {
    assembleSave: '/save-assemble'
  }

  export function saveAssembleData (parameter) {
    return request({
      url: assembleApi.assembleSave,
      method: 'post',
      data: parameter
    })
  }
