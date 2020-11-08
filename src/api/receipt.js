import request from '@/utils/request'

  const receiptApi = {
    receiptSave: '/save-receipt-step',
    getReferenceData: '/receipt-reference-data'
  }

  export function saveReceipt (parameter) {
    return request({
      url: receiptApi.receiptSave,
      method: 'post',
      data: parameter
    })
  }

  export function getReferenceReceipt (parameter) {
    return request({
      url: receiptApi.getReferenceData,
      method: 'post',
      data: parameter
    })
  }
