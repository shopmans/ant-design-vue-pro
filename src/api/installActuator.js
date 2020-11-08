import request from '@/utils/request'

  const installActuatorApi = {
    installActuatorSave: '/save-install-actuator'
  }

  export function saveinstallActuatorData (parameter) {
    return request({
      url: installActuatorApi.installActuatorSave,
      method: 'post',
      data: parameter
    })
  }
