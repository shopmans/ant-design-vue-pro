import request from '@/utils/request'

const refApi = {
  testValveList: '/reference/test/list',
  deleteFile: '/reference/file/delete'
}

export function getTestValveList (parameter) {
    return request({
      url: refApi.testValveList,
      method: 'get',
      params: parameter
    })
}

export function deleteReferenceFile (parameter) {
  return request({
    url: refApi.deleteFile + '?id=' + parameter,
    method: 'get',
    params: parameter
  })
}
