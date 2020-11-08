import request from '@/utils/request'

const localtorApi = {
    saveLocaltorIntoFactoryCheck: '/save-localtor-intofactorycheck'
}

export function saveLocaltorIntoFactoryCheck (parameter) {
    return request({
        url: localtorApi.saveLocaltorIntoFactoryCheck,
        method: 'post',
        data: parameter
    })
}
