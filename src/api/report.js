import request from '@/utils/request'

  const reportApi = {
    repairReportImgList: '/repair-report-img-list',
    valveTestReportImgList: '/valve-test-report-img-list',
    localtorTestReportImgList: '/localtor-test-report-img-list',
    useReportImgSave: '/save-use-report-img',
    valveTestReportImgSave: '/save-valve-test-use-report-img',
    locatorTestReportImgSave: '/save-locator-test-use-report-img',
    valveRepairProcess: '/get-valve-repair-process-report',
    rotateReportImage: '/rotate-image'
  }

  export function getvalveRepairProcessReport (parameter) {
    return request({
      url: reportApi.valveRepairProcess,
      method: 'post',
      data: parameter,
      responseType: 'blob'
    })
  }

  export function repairReportImgList (parameter) {
    return request({
      url: reportApi.repairReportImgList,
      method: 'post',
      data: parameter
    })
  }

  export function valveTestReportImgList (parameter) {
    return request({
      url: reportApi.valveTestReportImgList,
      method: 'post',
      data: parameter
    })
  }

  export function localtorTestReportImgList (parameter) {
    return request({
      url: reportApi.localtorTestReportImgList,
      method: 'post',
      data: parameter
    })
  }

  export function saveUseReportImg (parameter) {
    return request({
      url: reportApi.useReportImgSave,
      method: 'post',
      data: parameter,
      responseType: 'blob'
    })
  }

  export function saveUseReportImgFotValveTest (parameter) {
    return request({
      url: reportApi.valveTestReportImgSave,
      method: 'post',
      data: parameter,
      responseType: 'blob'
    })
  }

  export function saveUseReportImgFotLocatorTest (parameter) {
    return request({
      url: reportApi.locatorTestReportImgSave,
      method: 'post',
      data: parameter,
      responseType: 'blob'
    })
  }

  export function rotateReportImage (parameter) {
    return request({
      url: reportApi.rotateReportImage,
      method: 'post',
      data: parameter
    })
  }
