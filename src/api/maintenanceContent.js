import request from '@/utils/request'

const maintenanceContentApi = {
    maintenanceContentList: '/maintenance-content-list',
    addMaintenanceContent: '/new-maintenance-content',
    modifyMaintenanceContent: '/modify-maintenance-content',
    delMaintenanceContent: '/del-maintenance-content'
}

export function getMaintenanceContentList (parameter) {
    return request({
        url: maintenanceContentApi.maintenanceContentList,
        method: 'post',
        data: parameter
    })
}

export function addMaintenanceContent (parameter) {
    return request({
        url: maintenanceContentApi.addMaintenanceContent,
        method: 'post',
        data: parameter
    })
}

export function modifyMaintenanceContent (parameter) {
    return request({
        url: maintenanceContentApi.modifyMaintenanceContent,
        method: 'post',
        data: parameter
    })
}

export function delMaintenanceContent (parameter) {
    return request({
        url: maintenanceContentApi.delMaintenanceContent,
        method: 'post',
        data: parameter
    })
}
