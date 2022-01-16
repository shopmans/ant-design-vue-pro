import request from '@/utils/request'

const preRepairDiagApi = {
    preRepairDiagSave: '/save-prerepair-diag'
}

export function savePreRepairDiag (parameter) {
    return request({
        url: preRepairDiagApi.preRepairDiagSave,
        method: 'post',
        data: parameter
    })
}
