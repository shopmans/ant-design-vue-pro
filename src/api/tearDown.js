import request from '@/utils/request'

  const tearDownApi = {
    tearDownSave: '/save-tear-down'
  }

  export function saveTearDown (parameter) {
    return request({
      url: tearDownApi.tearDownSave,
      method: 'post',
      data: parameter
    })
  }
