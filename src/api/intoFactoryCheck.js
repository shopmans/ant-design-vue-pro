import request from '@/utils/request'

  const intoFactoryApi = {
    receiptSave: '/save-into-factory-check',
    getReferenceData: '/into-factory-reference-data'
  }

  export function saveIntoFactoryCheck (parameter) {
    return request({
      url: intoFactoryApi.receiptSave,
      method: 'post',
      data: parameter
    })
  }

  export function getReferenceIntoFactoryCheck (parameter) {
    return request({
      url: intoFactoryApi.getReferenceData,
      method: 'post',
      data: parameter
    })
  }
