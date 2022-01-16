import request from '@/utils/request'

  const reportApi = {
    repairReportImgList: '/repair-report-img-list',
    valveTestReportImgList: '/valve-test-report-img-list',
    localtorTestReportImgList: '/localtor-test-report-img-list',
    useReportImgSave: '/save-use-report-img',
    valveTestReportImgSave: '/save-valve-test-use-report-img',
    locatorTestReportImgSave: '/save-locator-test-use-report-img',
    valveRepairProcess: '/get-valve-repair-process-report',
    rotateReportImage: '/rotate-image',
    deleteTempReport: '/delete/temp/report',
    saveRepairReportConfig: '/repair/save-report-config',
    saveLocatorReportConfig: '/repair/save-locator-config',
    saveTestReportConfig: '/repair/save-test-config'
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

  export function saveUseReportImg (parameter, type) {
    return request({
      url: reportApi.useReportImgSave + '/' + type,
      method: 'post',
      data: parameter
      // responseType: 'blob'
    })
  }

  export function saveUseReportImgFotValveTest (parameter, type) {
    return request({
      url: reportApi.valveTestReportImgSave + '/' + type,
      method: 'post',
      data: parameter
      // responseType: 'blob'
    })
  }

  export function saveUseReportImgFotLocatorTest (parameter, type) {
    return request({
      url: reportApi.locatorTestReportImgSave + '/' + type,
      method: 'post',
      data: parameter
      // responseType: 'blob'
    })
  }

  export function rotateReportImage (parameter) {
    return request({
      url: reportApi.rotateReportImage,
      method: 'post',
      data: parameter
    })
  }

  export function deleteTmpReportFile (filename) {
    return request({
      url: reportApi.deleteTempReport + '/' + filename,
      method: 'get'
    })
  }

  export function saveReportImgConfig (parameter) {
    return request({
      url: reportApi.saveRepairReportConfig,
      method: 'post',
      data: parameter
    })
  }

  export function saveLocatorReportImgConfig (parameter) {
    return request({
      url: reportApi.saveLocatorReportConfig,
      method: 'post',
      data: parameter
    })
  }

  export function saveTestReportConfig (parameter) {
    return request({
      url: reportApi.saveTestReportConfig,
      method: 'post',
      data: parameter
    })
  }
