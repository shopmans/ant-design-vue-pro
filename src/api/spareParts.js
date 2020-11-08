import request from '@/utils/request'

const spareApi = {
    SparePartsList: '/spare-parts-list',
    SparePartsImport: '/spare-parts-import',
    DeleteSpareParts: '/delete-spare-parts',
    ModifySpareParts: '/modify-spare-parts',
    AddSpareParts: '/add-spare-parts',
    PartsList: '/parts-list',
    PartsImport: '/parts-import',
    DeletePart: '/delete-parts',
    ModifyPart: '/modify-parts',
    AddPart: '/add-parts'
}

export function sparePartsList (parameter) {
  return request({
    url: spareApi.SparePartsList,
    method: 'post',
    data: parameter
  })
}

export function importPartsList (parameter) {
    return request({
        url: spareApi.SparePartsImport,
        method: 'post',
        data: parameter
    })
}

export function deleteSparePart (parameter) {
    return request({
        url: spareApi.DeleteSpareParts,
        method: 'post',
        data: parameter
    })
}

export function modifySpareParts (parameter) {
    return request({
        url: spareApi.ModifySpareParts,
        method: 'post',
        data: parameter
    })
}

export function addSpareParts (parameter) {
    return request({
        url: spareApi.AddSpareParts,
        method: 'post',
        data: parameter
    })
}

export function partsList (parameter) {
    return request({
      url: spareApi.PartsList,
      method: 'post',
      data: parameter
    })
}

export function partsImport (parameter) {
    return request({
        url: spareApi.PartsImport,
        method: 'post',
        data: parameter
    })
}

export function deletePart (parameter) {
    return request({
        url: spareApi.DeletePart,
        method: 'post',
        data: parameter
    })
}

export function modifyParts (parameter) {
    return request({
        url: spareApi.ModifyPart,
        method: 'post',
        data: parameter
    })
}

export function addParts (parameter) {
    return request({
        url: spareApi.AddPart,
        method: 'post',
        data: parameter
    })
}
