import request from '@/utils/request'

  const repairConfirmApi = {
    repairConfirmSave: '/save-repair-confirm'
  }

  export function saveRepairConfirmData (parameter) {
    return request({
      url: repairConfirmApi.repairConfirmSave,
      method: 'post',
      data: parameter
    })
  }
