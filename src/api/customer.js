import request from '@/utils/request'

  const customerApi = {
    customerList: '/customer-list',
    deleteCustomer: '/delete-customer',
    modifyCustomer: '/modify-customer',
    addCustomer: '/add-customer'
  }

  export function getCustomerList (parameter) {
    return request({
      url: customerApi.customerList,
      method: 'get',
      params: parameter
    })
  }

  export function deleteCustomer (parameter) {
    return request({
      url: customerApi.deleteCustomer,
      method: 'post',
      data: parameter
    })
  }

  export function modifyCustomer (parameter) {
    return request({
      url: customerApi.modifyCustomer,
      method: 'post',
      data: parameter
    })
  }

  export function addCustomer (parameter) {
    return request({
      url: customerApi.addCustomer,
      method: 'post',
      data: parameter
    })
  }
