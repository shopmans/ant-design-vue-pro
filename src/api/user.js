import request from '@/utils/request'

  const userApi = {
    userList: '/user-list',
    addUser: '/add-user',
    modifyUser: '/modify-user',
    disableUser: '/disable-user',
    deleteUser: '/delete-user',
    changePassword: '/change_password'
  }

  export function getUserList (parameter) {
    return request({
      url: userApi.userList,
      method: 'get',
      params: parameter
    })
  }

  export function addUser (parameter) {
    return request({
      url: userApi.addUser,
      method: 'post',
      data: parameter
    })
  }

  export function modifyUser (parameter) {
    return request({
      url: userApi.modifyUser,
      method: 'post',
      data: parameter
    })
  }

  export function disableUser (parameter) {
    return request({
      url: userApi.disableUser,
      method: 'post',
      data: parameter
    })
  }

  export function deleteUser (parameter) {
    return request({
      url: userApi.deleteUser,
      method: 'post',
      data: parameter
    })
  }

  export function changePassword (parameter) {
    return request({
      url: userApi.changePassword,
      method: 'post',
      data: parameter
    })
  }
