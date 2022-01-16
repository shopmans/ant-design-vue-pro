import request from '@/utils/request'

  const customerApi = {
    customerList: '/customer/list',
    deleteCustomer: '/delete-customer',
    modifyCustomer: '/modify-customer',
    addCustomer: '/add-customer',
    queryCustomer: '/customer/id',
    importCustomer: '/customer/import',
    exportCustomer: '/customer/export'
  }

  export function getCustomerList (parameter) {
    return request({
      url: customerApi.customerList,
      method: 'post',
      data: parameter
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

  export function getCustomerById (parameter) {
    return request({
      url: customerApi.queryCustomer + '/' + parameter,
      method: 'get'
    })
  }

  export function importCustomers (parameter) {
    return request({
      url: customerApi.importCustomer,
      method: 'post',
      data: parameter
    })
  }

  export function exportCustomers (parameter) {
    return request({
      url: customerApi.exportCustomer,
      method: 'post',
      data: parameter
    })
  }
