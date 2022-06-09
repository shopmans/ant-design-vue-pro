import request from '@/utils/request'

const faultPhenomenonApi = {
    faultPhenomenonList: '/fault-phenomenon-list',
    addfaultPhenomenon: '/new-fault-phenomenon',
    modifyfaultPhenomenon: '/modify-fault-phenomenon',
    delfaultPhenomenon: '/del-fault-phenomenon'
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

export function modifyFaultPhenomenon (parameter) {
    return request({
        url: faultPhenomenonApi.modifyfaultPhenomenon,
        method: 'post',
        data: parameter
    })
}

export function delFaultPhenomenon (parameter) {
    return request({
        url: faultPhenomenonApi.delfaultPhenomenon,
        method: 'post',
        data: parameter
    })
}
