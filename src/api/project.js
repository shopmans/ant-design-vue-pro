import request from '@/utils/request'

const projectApi = {
  projectList: '/project-list',
  newProjectUrl: '/newproject',
  editProjectUrl: '/editproject',
  deleteProject: 'delete-project',
  globalSerial: '/globalSerial'
}

export function getProjectList (parameter) {
    return request({
      url: projectApi.projectList,
      method: 'get',
      params: parameter
    })
}

export function newProject (parameter) {
    return request({
      url: projectApi.newProjectUrl,
      method: 'post',
      data: parameter
    })
}

export function editProject (parameter) {
  return request({
    url: projectApi.editProjectUrl,
    method: 'post',
    data: parameter
  })
}

export function deleteProject (parameter) {
  return request({
    url: projectApi.deleteProject,
    method: 'post',
    data: parameter
  })
}

export function formatTotal (val) {
  return `￥${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getProjectSerial () {
  return request({
    url: projectApi.globalSerial + '/project',
    method: 'get'
  })
}

export function getContractSerial () {
  return request({
    url: projectApi.globalSerial + '/contract',
    method: 'get'
  })
}
