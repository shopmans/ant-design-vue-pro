import request from '@/utils/request'

  const installSlaveApi = {
    installSlaveSave: '/save-install-slave'
  }

  export function saveInstallSlaveData (parameter) {
    return request({
      url: installSlaveApi.installSlaveSave,
      method: 'post',
      data: parameter
    })
  }
