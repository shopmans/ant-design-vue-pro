import request from '@/utils/request'

const afterRepairDiagApi = {
    afterRepairDiagSave: '/save-afterrepair-diag'
}

export function saveAfterRepairDiag (parameter) {
    return request({
        url: afterRepairDiagApi.afterRepairDiagSave,
        method: 'post',
        data: parameter
    })
}
