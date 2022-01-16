import request from '@/utils/request'

const packingDeliveryApi = {
    packingDeliverySave: '/save-packing-delivery'
}

export function savePackingDelivery (parameter) {
    return request({
        url: packingDeliveryApi.packingDeliverySave,
        method: 'post',
        data: parameter
    })
}
