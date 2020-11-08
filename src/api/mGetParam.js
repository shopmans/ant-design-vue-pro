import request from '@/utils/request'

const mLayoutApi = {
    getStepParam: '/get-step-param'
}

export function getStepParameter (parameter) {
    return request({
        url: mLayoutApi.getStepParam,
        method: 'get',
        data: parameter
    })
}

export function isMobileState () {
    const userAgent = navigator.userAgent
    return userAgent.indexOf('Android') > -1
}
