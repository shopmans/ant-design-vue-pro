import request from '@/utils/request'

const projectApi = {
  projectList: '/project-list',
  newProjectUrl: '/newproject',
  editProjectUrl: '/editproject',
  deleteProject: 'delete-project',
  globalSerial: '/globalSerial',
  queryProjectDesc: '/project/query/description',
  projectProgressReport: '/project-progress-report',
  projectStatusReport: '/project-status-report',
  projectWorktimeReport: '/project-worktime-report'
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

export function projectState (val) {
  switch (val) {
      case '1':
          return 'menu.project.view.query.projectState.item1'
      case '2':
          return 'menu.project.view.query.projectState.item2'
      case '3':
          return 'menu.project.view.query.projectState.item3'
  }
}

export function projectRepairPlan (val) {
  switch (val) {
      case '1':
          return 'menu.project.detail.repairShop.item1'
      case '2':
          return 'menu.project.detail.repairShop.item2'
      case '3':
        return 'menu.project.detail.repairShop.item3'
      case '4':
        return 'menu.project.detail.repairShop.item4'
  }
}

export function queryProjectDescription (parameter) {
  return request({
    url: projectApi.queryProjectDesc + '/' + parameter.projectId,
    method: 'get',
    params: parameter
  })
}

export function projectProgressReport (parameter) {
  return request({
    url: projectApi.projectProgressReport,
    method: 'post',
    data: parameter
  })
}

export function projectStatusReport (parameter) {
  return request({
    url: projectApi.projectStatusReport,
    method: 'post',
    data: parameter
  })
}

export function projectWorktimeReport (parameter) {
  return request({
    url: projectApi.projectWorktimeReport,
    method: 'post',
    data: parameter
  })
}
