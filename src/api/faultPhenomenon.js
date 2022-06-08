import request from '@/utils/request'

const faultPhenomenonApi = {
    faultPhenomenonList: '/fault-phenomenon-list',
    addfaultPhenomenon: '/new-fault-phenomenon'
}

export function getFaultPhenomenonList (parameter) {
    return request({
        url: faultPhenomenonApi.faultPhenomenonList,
        method: 'post',
        data: parameter
    })
}

export function addFaultPhenomenon (parameter) {
    return request({
        url: faultPhenomenonApi.addfaultPhenomenon,
        method: 'post',
        data: parameter
    })
}
