import request from '@/utils/request'

  const repairApi = {
    repairSave: '/save-repair'
  }

  export function saveRepairData (parameter) {
    return request({
      url: repairApi.repairSave,
      method: 'post',
      data: parameter
    })
  }
