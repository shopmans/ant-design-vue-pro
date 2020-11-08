import request from '@/utils/request'

  const preRepairApi = {
    preRepairApiSave: '/save-prerepair-test',
    getPreRepairValue: '/get-prerepair-value',
    getReferencePreRepairData: '/get-reference-prerepair-data',
    getSelectRepairData: '/get-select-repair'
  }

  export function savePreRepairTest (parameter) {
    return request({
      url: preRepairApi.preRepairApiSave,
      method: 'post',
      data: parameter
    })
  }

  export function getPreRepairTestValue (parameter) {
    return request({
      url: preRepairApi.getPreRepairValue,
      method: 'post',
      data: parameter
    })
  }

  export function getReferencePreRepairTestData (parameter) {
    return request({
      url: preRepairApi.getReferencePreRepairData + '?onlyread=true',
      method: 'post',
      data: parameter
    })
  }

  export function getSelectRepairData (parameter) {
    return request({
      url: preRepairApi.getSelectRepairData,
      method: 'post',
      data: parameter
    })
  }
