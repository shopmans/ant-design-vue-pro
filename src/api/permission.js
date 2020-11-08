import request from '@/utils/request'

  const permissionApi = {
    roleList: '/role-list',
    addList: '/add-role',
    modifyList: '/modify-role',
    deleteList: '/delete-role',
    roleMemberList: '/role-members',
    addRoleMember: '/add-member',
    deleteRoleMember: '/delete-member',
    queryPermission: '/query-permission',
    savePermission: '/save-permission'
  }

  export function getRoleList (parameter) {
    return request({
      url: permissionApi.roleList,
      method: 'get',
      params: parameter
    })
  }

  export function modifyRole (parameter) {
    return request({
      url: permissionApi.modifyList,
      method: 'post',
      data: parameter
    })
  }

  export function addRole (parameter) {
    return request({
      url: permissionApi.addList,
      method: 'post',
      data: parameter
    })
  }

  export function deleteRole (parameter) {
    return request({
      url: permissionApi.deleteList,
      method: 'post',
      data: parameter
    })
  }

  // ========================== 成员
  export function getRoleMember (parameter) {
    return request({
      url: permissionApi.roleMemberList,
      method: 'get',
      params: parameter
    })
  }

  export function addRoleMember (parameter) {
    return request({
      url: permissionApi.addRoleMember,
      method: 'post',
      data: parameter
    })
  }

  export function deleteRoleMember (parameter) {
    return request({
      url: permissionApi.deleteRoleMember,
      method: 'post',
      data: parameter
    })
  }

  // ========================== 权限
  export function queryPermission (parameter) {
    return request({
      url: permissionApi.queryPermission,
      method: 'post',
      data: parameter
    })
  }

  export function savePermission (parameter) {
    return request({
      url: permissionApi.savePermission,
      method: 'post',
      data: parameter
    })
  }
