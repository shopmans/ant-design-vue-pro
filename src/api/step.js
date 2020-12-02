import request from '@/utils/request'
import moment from 'moment'

const stepApi = {
  stepList: '/step-list',
  newStep: '/new-repair-step',
  stepDone: '/stepDone',
  stepEdit: '/edit-step',
  saveStep: '/save-step',
  saveStepPublic: '/save-step-public',
  deleteStep: '/delete-step',
  repairReport: '/repair-report',
  getRepairValueUrl: '/get-repair-value',
  queryStepData: '/query-stepdata',
  getSetpUsers: '/step-users',
  addSetpUsers: '/add-step-users',
  delSetpUsers: '/del-setp-users',
  getFlowStepLog: '/flow-step-log',
  changeFlow: '/change-flow',
  genWorkSerial: '/gen-work-serial'
}

export function saveStepPublic (parameter) {
  return request({
    url: stepApi.saveStepPublic,
    method: 'post',
    data: parameter
  })
}

export function getStepList (parameter) {
    return request({
      url: stepApi.stepList,
      method: 'get',
      params: parameter
    })
}

export function newStep (parameter) {
    return request({
      url: stepApi.newStep,
      method: 'post',
      data: parameter
    })
}

export function stepDone (parameter) {
    return request({
      url: stepApi.stepDone,
      method: 'post',
      data: parameter
    })
}

export function stepEdit (parameter) {
  return request({
    url: stepApi.stepEdit,
    method: 'post',
    data: parameter
  })
}

export function saveStep (parameter) {
  return request({
    url: stepApi.saveStep,
    method: 'post',
    data: parameter
  })
}

export function getRepairValue (parameter) {
  return request({
    url: stepApi.getRepairValueUrl,
    method: 'post',
    data: parameter
  })
}

export function deleteStep (parameter) {
  return request({
    url: stepApi.deleteStep,
    method: 'post',
    data: parameter
  })
}

export function repairReport (parameter) {
  return request({
    url: stepApi.repairReport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function queryStepData (parameter) {
  return request({
    url: stepApi.queryStepData,
    method: 'post',
    data: parameter
  })
}

export function queryStepDataOnlyread (parameter) {
  return request({
    url: stepApi.queryStepData + '?onlyread=true',
    method: 'post',
    data: parameter
  })
}

export function getStepUsers (parameter) {
  return request({
    url: stepApi.getSetpUsers,
    method: 'post',
    data: parameter
  })
}

export function addStepUsers (parameter) {
  return request({
    url: stepApi.addSetpUsers,
    method: 'post',
    data: parameter
  })
}

export function delStepUsers (parameter) {
  return request({
    url: stepApi.delSetpUsers,
    method: 'post',
    data: parameter
  })
}

export function getFlowStepLog (parameter) {
  return request({
    url: stepApi.getFlowStepLog,
    method: 'post',
    data: parameter
  })
}

export function changeFlow (parameter) {
  return request({
    url: stepApi.changeFlow,
    method: 'post',
    data: parameter
  })
}

export function getWorkSerialSerial () {
  return request({
    url: stepApi.genWorkSerial + '/workorder',
    method: 'get'
  })
}

export function getColumnsPurchased () {
  return [
    {
      title: '序号',
      dataIndex: 'purchased_part_no',
      key: 'purchased_part_no',
      width: '2%',
      scopedSlots: { customRender: 'purchased_part_no' }
    },
    {
      title: '名称',
      dataIndex: 'purchased_part_name',
      key: 'purchased_part_name',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_name' }
    },
    {
      title: '零件号码',
      dataIndex: 'purchased_part_number',
      key: 'purchased_part_number',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_number' }
    },
    {
      title: '数量',
      dataIndex: 'purchased_part_qty',
      key: 'purchased_part_qty',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_qty' }
    },
    {
      title: '件号',
      dataIndex: 'purchased_part_key_number',
      key: 'purchased_part_key_number',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_key_number' }
    },
    {
      title: '备注',
      dataIndex: 'purchased_part_memo',
      key: 'purchased_part_memo',
      width: '15%',
      scopedSlots: { customRender: 'purchased_part_memo' }
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
}

export function getReceiptPurchasedConfirm () {
  return [
    {
      title: '序号',
      dataIndex: 'purchased_part_no',
      key: 'purchased_part_no',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_no' }
    },
    {
      title: '名称',
      dataIndex: 'purchased_part_name',
      key: 'purchased_part_name',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_name' }
    },
    {
      title: '零件号码',
      dataIndex: 'purchased_part_number',
      key: 'purchased_part_number',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_number' }
    },
    {
      title: '数量',
      dataIndex: 'purchased_part_qty',
      key: 'purchased_part_qty',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_qty' }
    },
    {
      title: '件号',
      dataIndex: 'purchased_part_key_number',
      key: 'purchased_part_key_number',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_key_number' }
    },
    {
      title: '备注',
      dataIndex: 'purchased_part_memo',
      key: 'purchased_part_memo',
      width: '10%',
      scopedSlots: { customRender: 'purchased_part_memo' }
    },
    {
      title: '确认',
      dataIndex: 'purchased_confirm',
      key: 'purchased_confirm',
      width: '10%',
      scopedSlots: { customRender: 'purchased_confirm' }
    }
  ]
}

export function getCurrentStepMap () {
  return {
    '(start)': {
      text: 'app.flow.repair.start'
    },
    'Receipt': {
      text: 'app.flow.repair.receipt'
    },
    'IntoFactoryCheck': {
      text: 'app.flow.repair.intoFactoryCheck'
    },
    'PreRepairTest': {
      text: 'app.flow.repair.preRepairTest'
    },
    'TearDown': {
      text: 'app.flow.repair.tearDown'
    },
    'Assessment': {
      text: 'app.flow.repair.assessment'
    },
    'Repair': {
      text: 'app.flow.repair.repair'
    },
    'Assemble': {
      text: 'app.flow.repair.assemble'
    },
    'InstallActuator': {
      text: 'app.flow.repair.installActuator'
    },
    'LeakPressureTest': {
      text: 'app.flow.repair.leakPressureTest'
    },
    'InstallSlave': {
      text: 'app.flow.repair.installSlave'
    },
    'Adjust': {
      text: 'app.flow.repair.adjust'
    },
    'RepairConfirm': {
      text: 'app.flow.repair.RepairConfirm'
    },
    'FinalCheck': {
      text: 'app.flow.repair.finalCheck'
    },
    'PackingDelivery': {
      text: '装箱发货'
    },
    'OnSiteInstall': {
      text: '现场安装'
    },
    '(end)': {
      text: '已结束'
    },
    'LocatorIntoFactoryCheck': {
      text: 'app.flow.repair.intoFactoryCheck'
    },
    'LocatorPreRepairTest': {
      text: 'app.flow.repair.preRepairTest'
    },
    'LocatorAssessment': {
      text: 'app.flow.repair.assessment'
    },
    'LocatorRepair': {
      text: 'app.flow.repair.repair'
    },
    'LocatorAdjust': {
      text: 'app.flow.repair.adjust'
    }
  }
}

// 折分维修前、后的值
export function getRepairSplitValue (val) { return 30 }

// 给每个流程标出数值以便识别维修前、维修后的流程
export function repairFlowStepValue (val) {
  switch (val) {
    case '(start)': {
      return 1
    }
    case 'Receipt': {
      return 5
    }
    case 'IntoFactoryCheck': {
      return 10
    }
    case 'PreRepairTest': {
      return 15
    }
    case 'TearDown': {
      return 20
    }
    case 'Assessment': {
      return 25
    }
    case 'Repair': {
      return 30
    }
    case 'Assemble': {
      return 35
    }
    case 'InstallActuator': {
      return 40
    }
    case 'LeakPressureTest': {
      return 45
    }
    case 'InstallSlave': {
      return 50
    }
    case 'Adjust': {
      return 55
    }
    case 'RepairConfirm': {
      return 60
    }
    case 'FinalCheck': {
      return 65
    }
    case 'PackingDelivery': {
      return 70
    }
    case 'OnSiteInstall': {
      return 75
    }
    case '(end)': {
      return 99999999
    }
    case 'LocatorIntoFactoryCheck': {
      return 90
    }
    case 'LocatorPreRepairTest': {
      return 100
    }
    case 'LocatorAssessment': {
      return 110
    }
    case 'LocatorRepair': {
      return 120
    }
    case 'LocatorAdjust': {
      return 130
    }
  }

  return -1
}

export function getCurrentStepDetailSwitchMap () {
  return {
    '(start)': {
      switch: false
    },
    'Receipt': {
      switch: false
    },
    'IntoFactoryCheck': {
      switch: false
    },
    'PreRepairTest': {
      switch: false
    },
    'TearDown': {
      switch: false
    },
    'Assessment': {
      switch: false
    },
    'Repair': {
      switch: false
    },
    'Assemble': {
      switch: false
    },
    'InstallActuator': {
      switch: false
    },
    'LeakPressureTest': {
      switch: false
    },
    'InstallSlave': {
      switch: false
    },
    'Adjust': {
      switch: false
    },
    'RepairConfirm': {
      switch: false
    },
    'FinalCheck': {
      switch: false
    },
    'PackingDelivery': {
      switch: false
    },
    'OnSiteInstall': {
      switch: false
    },
    '(end)': {
      switch: false
    },
    'LocatorIntoFactoryCheck': {
      switch: false
    },
    'LocatorPreRepairTest': {
      switch: false
    },
    'LocatorAssessment': {
      switch: false
    },
    'LocatorRepair': {
      switch: false
    },
    'LocatorAdjust': {
      switch: false
    }
  }
}

// 手轮
export function getActuHandwheel (val) {
  switch (val) {
    case '1':
      return '顶装'
    case '2':
      return '侧装'
    default:
      return ''
  }
}

export function getValveSizeUnit (val) {
  switch (val) {
    case '1':
      return 'inch'
    case '2':
      return 'mm'
    default:
      return ''
  }
}

export function getUnit2ValveSizeValue (val) {
  switch (val) {
    case 'inch':
      return '1'
    case 'mm':
      return '2'
    default:
      return ''
  }
}

export function getTestOrRepairUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '检测'
    case 2:
    case '2':
      return '维修'
    default:
      return ''
  }
}

export function getValveTravelUnit (val) {
  switch (val) {
    case '1':
      return 'inch'
    case '2':
      return 'mm'
    case '3':
        return '°'
    default:
      return ''
  }
}

export function getUnit2ValveTravelValue (val) {
  if (val.indexOf('-') >= 0) {
    return [val.split('-')[1], '3']
  }
  if (val.indexOf('/') >= 0) {
    return [val, '1']
  }
  if (val.indexOf('MM') >= 0 || val.indexOf('mm')) {
    return [parseInt(val), '2']
  }

  return ''
}

export function getValveMaterialUnit (val) {
  switch (val) {
    case '1':
      return 'WCB'
    case '2':
      return 'WCC'
    case '3':
      return 'WC5'
    case '4':
      return 'WC6'
    case '5':
      return 'WC9'
    case '6':
      return 'SST'
    case '7':
      return 'C3FM'
    case '8':
      return 'C8FM'
    case '9':
      return 'Cast'
    case '10':
      return 'Iron'
    case '11':
      return 'A216 WCB'
    case '12':
      return 'None'
    case '13':
      return 'Carbon Steel'
    default:
      return ''
  }
}

// val 全大写
export function getUnit2ValveMaterialValue (val) {
  switch (val) {
    case 'WCB':
      return '1'
    case 'WCC':
      return '2'
    case 'WC5':
      return '3'
    case 'WC6':
      return '4'
    case 'WC9':
      return '5'
    case 'SST':
      return '6'
    case 'C3FM':
      return '7'
    case 'C8FM':
      return '8'
    case 'CAST':
      return '9'
    case 'IRON':
      return '10'
    case 'A216 WCB':
      return '11'
    case 'NONE':
      return '12'
    case 'CARBON STEEL':
      return '13'
    default:
      return ''
  }
}

// 阀杆/阀轴材质
export function getValveStemAxisUnit (val) {
  switch (val) {
    case '1':
      return 'S31600'
    case '2':
      return 'S17400'
    case '3':
      return 'S20910'
    case '4':
      return '17-4PH'
    default:
      return ''
  }
}

export function getUnit2ValveStemAxisValue (val) {
  switch (val) {
    case 'S31600':
      return '1'
    case 'S17400':
      return '2'
    case 'S20910':
      return '3'
    case '17-4PH':
      return '4'
    default:
      return ''
  }
}

export function getValvePressureLevelUnit (val) {
  switch (val) {
    case '1':
      return '125'
    case '2':
      return '150'
    case '3':
      return '250'
    case '4':
      return '300'
    case '5':
      return '600'
    case '6':
      return '900'
    case '7':
      return '1500'
    case '8':
      return '2500'
    default:
      return ''
  }
}

// 表格attchement解析
export function getUnit2AttchementValue (val) {
  const tmpValueArray = val.replace(' ', '').split(';')

  if (tmpValueArray.length === 2) {
    return [tmpValueArray[0], '', tmpValueArray[1]]
  }
  if (tmpValueArray.length === 3) {
    return [tmpValueArray[0], tmpValueArray[1], tmpValueArray[2]]
  }

  return ''
}

export function getValveFlowUnit (val) {
  switch (val) {
    case '1':
      return '上'
    case '2':
      return '下'
    case '3':
      return '双密封环'
    case '4':
      return '阀板侧流向阀杆侧'
    case '5':
      return '阀杆侧流向阀板侧'
    case '6':
      return '双向流'
    case '7':
        return '正向流'
    case '8':
        return '反向流'
    case '9':
        return '双向流'
    default:
      return ''
  }
}

export function getValvePushDoneUnit (val) {
  switch (val) {
    case '1':
      return 'Open'
    case '2':
      return 'Close'
    default:
      return ''
  }
}

export function getActuFailureUnit (val) {
  switch (val) {
    case '1':
      return 'Open'
    case '2':
      return 'Close'
      case '3':
      return 'Lock'
    default:
      return ''
  }
}

export function getValveHydrostaticTestValueUnit (val) {
  switch (val) {
    case '1':
      return 'PSI'
    case '2':
      return 'BAR'
    case '3':
      return 'MPa'
    default:
      return ''
  }
}

export function getValveLeakTestValueUnit (val) {
  switch (val) {
    case '1':
      return 'SCFH'
    case '2':
      return 'ml/min'
    case '3':
      return 'bubbles/min'
    default:
      return ''
  }
}

export function getActuSpringSetPressureUnit (val) {
  switch (val) {
    case '1':
      return 'PSI'
    case '2':
      return 'BAR'
    case '3':
    return 'kg/cm2'
    case '4':
    return 'Kpa'
    case '5':
    return 'KG'
    default:
      return ''
  }
}

export function getUnit2ActuSpringSetPressureValue (val) {
  const tmpValue = val.toUpperCase()
  if (tmpValue.indexOf('PSIG') >= 0) {
    return [tmpValue.replace('PSIG', '').trim(), '1']
  }

  return ''
}

export function getValveHydrostaticTestTimeUnit (val) {
  switch (val) {
    case '1':
      return 'Min'
    case '2':
      return 'Sec'
    default:
      return ''
  }
}

export function getValveCoverBoltTorqueUnit (val) {
  switch (val) {
    case '1':
      return 'N-M'
    case '2':
      return 'Lbt-ft'
    default:
      return ''
  }
}

export function getValveCoverBoltMaterialUnit (val) {
  switch (val) {
    case '1':
      return 'SST(不锈钢)'
    case '2':
      return 'B7(碳钢)'
    case '3':
      return 'B8(碳钢)'
    default:
      return ''
  }
}

export function getValveCoverBoltMaterialUnitNA (val) {
  switch (val) {
    case '1':
      return 'SST(不锈钢)'
    case '2':
      return 'B7(碳钢)'
    case '3':
      return 'B8(碳钢)'
    default:
      return 'N/A'
  }
}

// 连接方式
export function getValveConnectModelUnit (val) {
  switch (val) {
    case '1':
      return 'RF'
    case '2':
      return 'RTJ'
    case '3':
      return '对夹'
    case '4':
      return '焊接'
    case '5':
      return '螺纹'
    case '6':
      return '其它'
    default:
      return ''
  }
}

export function getUnit2ValveConnectModelValue (val) {
  switch (val) {
    case 'RF':
      return '1'
    case 'RTJ':
      return '2'
    case '对夹':
      return '3'
    case '焊接':
      return '4'
    case '螺纹':
      return '5'
    case '其它':
      return '6'
    default:
      return ''
  }
}

// 阀座泄漏测试标准
export function getValveSeatLeakTestUnit (val) {
  switch (val) {
    case '1':
      return 'API598'
    case '2':
      return 'FCI70-2'
    case '3':
      return 'FGS4L5'
    case '4':
      return 'FGS4L6'
    default:
      return ''
  }
}

export function getValveFillConfig (val) {
  switch (val) {
    case '1':
      return 'PTFE/Single'
    case '2':
      return 'PTFE/Double'
    case '3':
      return 'COMPOSITION'
    case '4':
        return 'Graphite/Single'
    case '5':
        return 'Graphite/Double'
    case '6':
      return 'Enviro-Seal'
    case '7':
      return 'PTFE'
    case '8':
      return 'Env-Seal Graph'
    case '9':
      return 'Hi-Seal Graph'
    case '10':
      return 'FFKM'
    default:
      return ''
  }
}

export function getUnit2ValveFillConfigValue (val) {
  switch (val) {
    case 'PTFE/SINGLE':
      return '1'
    case 'PTFE/DOUBLE':
      return '2'
    case 'COMPOSITION':
      return '3'
    case 'GRAPHITE/SINGLE':
        return '4'
    case 'GRAPHITE/DOUBLE':
        return '5'
    case 'ENVIRO-SEAL':
      return '6'
    case 'PTFE':
      return '7'
    case 'ENV-SEAL GRAPH':
      return '8'
    case 'HI-SEAL GRAPH':
      return '9'
    case 'FFKM':
      return '10'
    default:
      return ''
  }
}

export function getValveLeakLevel (val) {
  switch (val) {
    case '1':
      return 'Class Ⅱ'
    case '2':
      return 'Class Ⅲ'
    case '3':
      return 'Class Ⅳ'
    case '4':
      return 'Class Ⅴ'
    case '5':
      return 'Class Ⅵ'
    default:
      return ''
  }
}

export function getUnit2ValveLeakLevelValue (val) {
  switch (val) {
    case 'II':
      return '1'
    case 'III':
      return '2'
    case 'IV':
      return '3'
    case 'V':
      return '4'
    case 'VI':
      return '5'
    default:
      return ''
  }
}

export function getValveFlowChar (val) {
  switch (val) {
    case '1':
      return '线性'
    case '2':
      return '等百分比'
    case '3':
      return '快开'
    case '4':
      return '修正等百分比'
    case '5':
      return '定制'
    default:
      return ''
  }
}

export function getValveManufacturerUnit (val) {
  switch (val) {
    case '1':
      return '制造厂商1'
    case '2':
      return '制造厂商2'
    case '3':
      return '制造厂商3'
    default:
      return ''
  }
}

export function getSlaveLocatorBrandUnit (val) {
  switch (val) {
    case '1':
      return '定位器品牌1'
    case '2':
      return '定位器品牌2'
    case '3':
      return '定位器品牌3'
    default:
      return ''
  }
}

export function getActuTypeUnit (val) {
  switch (val) {
    case '1':
      return '弹簧薄膜'
    case '2':
      return '齿轮齿条'
    case '3':
      return '拔叉'
    case '4':
      return '其它'
    case '5':
      return '旋转'
    default:
      return ''
  }
}

export function getSlaveStandardOutputUnit (val) {
  switch (val) {
    case '1':
      return '100-75-50-25-0'
    case '2':
      return '0-25-50-75-100'
    default:
      return ''
  }
}

export function getActuUseModeUnit (val) {
  switch (val) {
    case '1':
      return '单作用'
    case '2':
      return '双作用'
    default:
      return ''
  }
}

export function getActuActionModeUnit (val) {
  switch (val) {
    case '1':
      return 'PDTC'
    case '2':
      return 'PDTO'
    default:
      return ''
  }
}

export function getActuInstallPointUnit (val) {
  switch (val) {
    case '1':
      return '左手1位(LH1)'
    case '2':
      return '左手2位(LH2)'
    case '3':
      return '左手3位(LH3)'
    case '4':
      return '左手4位(LH4)'
    case '5':
      return '右手1位(RH1)'
    case '6':
      return '右手2位(RH2)'
    case '7':
      return '右手3位(RH3)'
    case '8':
      return '右手4位(RH4)'
    default:
      return ''
  }
}

export function getActuCoverBoltToolItemUnit (val) {
  switch (val) {
    case '1':
      return '呆扳手'
    case '2':
      return '内六角'
    case '3':
      return '套筒'
    default:
      return ''
  }
}

export function getSlaveInputSignalScopeUnit (val) {
  switch (val) {
    case '1':
      return '4-20mA'
    case '2':
      return '4-12mA'
    case '3':
      return '12-20mA'
    case '4':
      return '3-9 Psi'
    case '5':
      return '3-15 Psi'
    default:
      return ''
  }
}

export function getValveWaterPressureLevelUnit (val) {
  switch (val) {
    case '1':
      return 'class 125'
    case '2':
      return 'class 150'
    case '3':
      return 'class 250'
    case '4':
      return 'class 300'
    case '5':
      return 'class 600'
    case '6':
      return 'class 900'
    case '7':
      return 'class 1500'
    case '8':
      return 'class 2500'
    default:
      return ''
  }
}

export function getUnit2ValveWaterPressureLevelValve (val) {
  switch (val) {
    case '125':
      return '1'
    case '150':
      return '1'
    case '250':
      return '3'
    case '300':
      return '4'
    case '600':
      return '5'
    case '900':
      return '6 '
    case '1500':
      return '7'
    case '2500':
      return '8'
    default:
      return ''
  }
}

export function getValveTypeUnit (val) {
  switch (val) {
    case '1':
      return 'GLOBE balanced'
    case '2':
      return 'GLOBE unbalanced'
    case '3':
      return 'Butterfly'
    case '4':
      return 'Ball'
    case '5':
      return 'Others'
    default:
      return ''
  }
}

export function getValveTestMediumUnit (val) {
  switch (val) {
    case '1':
      return '水'
    case '2':
      return '压缩空气'
    case '3':
      return '氮气'
    default:
      return ''
  }
}

// 水压测试标准
export function getValveTestStdUnit (val) {
  switch (val) {
    case '1':
      return 'API598'
    case '2':
      return 'FGS4LI'
    default:
      return ''
  }
}

// 安装执行器-阀门实际故障位置
export function getInstallActuatorValveRealFailPointUnit (val) {
  switch (val) {
    case '1':
      return 'Open'
    case '2':
      return 'Close'
    case '3':
       return 'Lock'
    default:
      return ''
  }
}

// 电磁阀作用方式
export function getSlaveElectValveActiveUnit (val) {
  switch (val) {
    case '1':
      return '故障开'
    case '2':
      return '故障关'
    case '3':
      return '故障保位'
    default:
      return ''
  }
}

// 定位器作用方式
export function getSlaveLocatorActionmodeUnit (val) {
  switch (val) {
    case '1':
      return '正作用'
    case '2':
      return '反作用'
    case '3':
      return '双作用'
    default:
      return ''
  }
}

// 新建工单-基本信息
export function getControlModelUnit (val) {
  switch (val) {
    case '1':
      return '调节阀'
    case '2':
      return '开关阀'
    default:
      return ''
  }
}

export function getYesNoSwitchUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '是'
    case 2:
    case '2':
      return '否'
    default:
      return ''
  }
}

// 附件安装支架方向
export function getActuInstallDirectoreUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '方向1'
    case 2:
    case '2':
      return '方向2'
      case 3:
    case '3':
      return '方向3'
      case 4:
    case '4':
      return '方向4'
    default:
      return ''
  }
}

// 压力表量程
export function getPressureGaugeRangeUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '60 PSI'
    case 2:
    case '2':
      return '160 PSI'
    default:
      return ''
  }
}

export function getNESwitchUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '正常'
    case 2:
    case '2':
      return '异常'
    default:
      return ''
  }
}

export function getABCSwitchUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'A'
    case 2:
    case '2':
      return 'B'
    case 3:
    case '3':
      return 'C'
    default:
      return ''
  }
}

// 定位器-执行机构
export function getLocatorActuatorTypeUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return '弹簧薄膜'
    case 2:
    case '2':
      return '单作用气缸带弹簧'
    case 3:
    case '3':
      return '双作用气缸不带弹簧'
    case 4:
    case '4':
      return '双作用气缸带弹簧'
    default:
      return ''
  }
}

// 定位器-收到时控制模式
export function getLocatorReceivedControlModeUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'Analog'
    case 2:
    case '2':
      return 'Digital'
    case 3:
    case '3':
      return 'Test'
    default:
      return ''
  }
}

// 定位器-仪表模式
export function getLocatorInstrumentModelUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'In Service'
    case 2:
    case '2':
      return 'Out Of Service'
    default:
      return ''
  }
}

// 新建工单-基本信息-工艺介质
export function getProcessMediumUnit (val) {
  switch (val) {
    case '1' : { return '水' }
    case '2' : { return '锅炉给水' }
    case '3' : { return '空气' }
    case '4' : { return '蒸汽' }
    case '5' : { return '氮气' }
    case '6' : { return '天然气' }
    case '7' : { return '氢气' }
    case '8' : { return '氧气' }
    case '9' : { return '氯气' }
    case '10' : { return '热高分油' }
    case '11' : { return '冷高分油' }
    case '12' : { return '酸水' }
    case '13' : { return '碱液' }
    case '14' : { return '氯甲烷' }
    case '15' : { return '导热油' }
    case '16' : { return '原油' }
    case '17' : { return '富胺液' }
    case '18' : { return '凝液' }
    case '19' : { return '液氨' }
    case '20' : { return '黑水' }
    case '21' : { return '灰水' }
    case '22' : { return '合成气' }
    case '23' : { return '甲醇' }
    case '24' : { return '乙醇' }
    case '25' : { return '乙二醇' }
    case '26' : { return '碳氢化合物' }
    case '27' : { return '甲烷' }
    case '28' : { return '乙烷' }
    case '29' : { return '丙烷' }
    default:
      return ''
  }
}

export function getValveCoreBallBettleflyUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'S31600'
    case 2:
    case '2':
      return 'S41600'
      case 3:
    case '3':
      return 'S31600/CORA-A'
      case 4:
    case '4':
      return 'S44004'
    case 5:
    case '5':
      return 'CF3M'
    case 6:
    case '6':
      return 'CF8M'

    default:
      return ''
  }
}

export function getUnit2ValveCoreBallBettleflyValue (val) {
  const tmpVal = val.toUpperCase()
  if (tmpVal.indexOf('COCR-A') >= 0 || tmpVal.indexOf('COCR-6')) {
    return '2'
  }
  if (tmpVal.indexOf('CORA-A') >= 0) {
    return '3'
  }

  switch (tmpVal) {
    case 'S31600':
      return '1'
    case 'S41600':
      return '2'
    case 'S31600/CORA-A':
      return '3'
    case 'S44004':
      return '4'
    case 'CF3M':
      return '5'
    case 'CF8M':
      return '6'
    default:
      return ''
  }
}

// 阀座环材质
export function getValveSetRingUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'S31600'
    case 2:
    case '2':
      return 'S41600'
      case 3:
    case '3':
      return 'S42000'
      case 4:
    case '4':
      return 'R30006'
    case 5:
    case '5':
      return '316SST'
    default:
      return ''
  }
}

// 阀笼/保持环材质
export function getValveCageRetainingRingUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'S31600/CORA-A'
    case 2:
    case '2':
      return 'S17400'
    case 3:
    case '3':
      return 'Carbon Steel'
    default:
      return ''
  }
}

// 村套/轴承材质
export function getValveVillageBearingUnit (val) {
  switch (val) {
    case 1:
    case '1':
      return 'S31600'
    case 2:
    case '2':
      return 'R30006'
    case 3:
    case '3':
      return 'PEEK'
    case 4:
    case '4':
      return '316/NITRIDED'
    default:
      return ''
  }
}

// 垫片材质
export function getValveSpacer (val) {
  switch (val) {
    case 1:
    case '1':
      return 'Graphite'
    case 2:
    case '2':
      return 'Spiral wound gasket'
    case 3:
    case '3':
      return 'Graphite/ Spiral wound gasket'
    default:
      return ''
  }
}

// 行程值+单位
export function getValveSizeUnitText (val, unitValue) {
  if (val) {
    return val + ' ' + getValveTravelUnit(unitValue)
  }

  return ''
}

export function getValveSeatLeakTestUnitText (val, unitValue) {
  if (val) {
    return val + ' ' + getValveLeakTestValueUnit(unitValue)
  }

  return ''
}

// 压力psi + 单位
export function getValveHydrostaticTestValueUnitText (val, unitValue) {
  if (val) {
    return val + ' ' + getValveHydrostaticTestValueUnit(unitValue)
  }

  return ''
}

// 时间值+单位
export function getValveHydrostaticTestTimeUnitText (val, unitValue) {
  if (val) {
    return val + ' ' + getValveHydrostaticTestTimeUnit(unitValue)
  }

  return ''
}

// 附件标准输出
export function getSlaveStandardOutputText (val) {
  if (val) {
    return val + ' ' + getSlaveStandardOutputUnit(val)
  }

  return ''
}

// 阀盖螺栓扭矩标准值
export function getValveCoverBoltTorqueUnitText (val, unitValue) {
  if (val && val.length > 0) {
    return val + ' ' + getValveCoverBoltTorqueUnit(unitValue)
  }

  return 'N/A'
}

export function getActuCoverBoltToolItemUnitTextNA (val, unitValue1, unitValue2) {
  if (val && val.length > 0) {
    return val + ' ' + getValveSizeUnit(unitValue1) + ' ' + getActuCoverBoltToolItemUnit(unitValue2)
  }

  return 'N/A'
}

export function getValveCoverBoltTorqueUnitTextNA (val, unitValue) {
  if (val && val.length > 0) {
    return val + ' ' + getValveCoverBoltTorqueUnit(unitValue)
  }

  return 'N/A'
}

export function getValveSizeUnitTextNA (val, unitValue) {
  const tmpValue = getValveSizeUnitText(val, unitValue)
  if (tmpValue.length <= 0) {
    return 'N/A'
  }

  return tmpValue
}

// /////////////////////////////////////// 处理备品数据
export function takeValveSize (data, that) { // 带回阀尺寸
  that.form.resetFields(['valve_size', 'valve_size_unit'])

  if (data.size) {
    if (data.size.toLowerCase().indexOf('inch') >= 0 && getUnit2ValveSizeValue('inch')) {
      data.valve_size = data.size.replace('inch', '')
      data.valve_size_unit = getUnit2ValveSizeValue('inch')
    } else if (data.size.toLowerCase().indexOf('mm') >= 0 && getUnit2ValveSizeValue('mm')) {
      data.valve_size = data.size.replace('inch', '')
      data.valve_size_unit = getUnit2ValveSizeValue('mm')
    }
  }
}

export function takeValveMaterial (data, that) { // 带回阀材质
  that.form.resetFields(['valve_material'])

  const selectValue = getUnit2ValveMaterialValue(data.body_material.toUpperCase())
  if (selectValue) {
    data.valve_material = selectValue
  }
}

export function takeValvePressureLevel (data, that) { // 带回阀材质和连接方式
  that.form.resetFields(['valve_pressure_level', 'valve_connect_model'])

  if (data.pressure_level) {
    const numberPart = parseInt(data.pressure_level) + '' // 数字部份
    const connectModelPart = data.pressure_level.replace(numberPart, '')

    if (numberPart) { // 存在压力等级部份
      const selectValue = getUnit2ValveWaterPressureLevelValve(numberPart)
      if (selectValue) {
        data.valve_pressure_level = numberPart
      }
    }
    if (connectModelPart) { // 存在连接方式
      const selectValue = getUnit2ValveConnectModelValue(connectModelPart.toUpperCase())
      if (selectValue) {
        data.valve_connect_model = connectModelPart
      }
    }
  }
}

export function takeValveValveCoreBallBettlefly (data, that) { // 带回阀杆材质
  that.form.resetFields(['valve_stem_axis'])

  if (data.stem_material) {
    const selectValue = getUnit2ValveStemAxisValue(data.stem_material.toUpperCase())
    if (selectValue) {
      data.valve_stem_axis = selectValue
    }
  }
}

export function takeActuator (data, that) { // 带回执行机购
  that.form.resetFields(['actu_model', 'actu_size', 'actu_size_unit'])

  if (data.actuator) {
    const actuatorModel = data.actuator.split('/')[0]
    const actuatorSize = data.actuator.split('/')[1]

    if (actuatorModel) {
      data.actu_model = actuatorModel
    }
    if (actuatorSize) {
      data.actu_size = actuatorSize
    }
  }
}

export function takeSpoolMaterial (data, that) { // 带回阀芯/阀球/蝶板材质
  that.form.resetFields(['valve_core_ball_bettlefly'])

  const selectValue = getUnit2ValveCoreBallBettleflyValue(data.spool_material)
  if (selectValue) {
    data.valve_core_ball_bettlefly = selectValue
  }
}

export function takeSeatMaterial (data, that) { // 带回阀座
  that.form.resetFields(['valve_set_ring'])

  const selectValue = getUnit2ValveCoreBallBettleflyValue(data.seat_material)
  if (selectValue) {
    data.valve_set_ring = selectValue
  }
}

export function takeCageMaterial (data, that) { // 阀笼材质
  that.form.resetFields(['valve_cage_retaining_ring'])

  const selectValue = getUnit2ValveCoreBallBettleflyValue(data.cage_material)
  if (selectValue) {
    data.valve_cage_retaining_ring = selectValue
  }
}

export function takeFlowCharacteristics (data, that) { // 流量物性
}

export function takeLeakageLevel (data, that) { // 泄漏等级
  that.form.resetFields(['valve_leak_level'])

  const selectValue = getUnit2ValveLeakLevelValue(data.leakage_level)
  if (selectValue) {
    data.valve_leak_level = selectValue
  }
}

export function takePackingType (data, that) { // 填料类型
  that.form.resetFields(['valve_fill_config'])

  const selectValue = getUnit2ValveFillConfigValue(data.packing_type)
  if (selectValue) {
    data.valve_fill_config = selectValue
  }
}

export function takeTravel (data, that) { // 行程
  that.form.resetFields(['valve_travel', 'valve_travel_unit'])

  const selectValue = getUnit2ValveTravelValue(data.travel)
  if (selectValue) {
    data.valve_travel = selectValue[0]
    data.valve_travel_unit = selectValue[1]
  }
}

export function takeBenchset (data, that) { // bench set
  that.form.resetFields(['actu_spring_set_pressure', 'actu_spring_set_pressure_unit'])

  const selectValue = getUnit2ActuSpringSetPressureValue(data.benchset)
  if (selectValue) {
    data.actu_spring_set_pressure = selectValue[0]
    data.actu_spring_set_pressure_unit = selectValue[1]
  }
}

export function takeAttachment (data, that) { // 附件
  that.form.resetFields(['slave_filter_valve_model', 'slave_locator_model', 'slave_retaining_valve_model'])

  const selectValue = getUnit2AttchementValue(data.attachment)
  if (selectValue) {
    data.slave_locator_model = selectValue[0]
    data.slave_retaining_valve_model = selectValue[1]
    data.slave_filter_valve_model = selectValue[2]
  }
}

export function getStepValveFields () {
  return ['id', 'date', 'valve_manufacturer', 'valve_serial', 'valve_size', 'valve_material', 'valve_pressure_level',
  'valve_flow', 'valve_push_done', 'valve_hydrostatic_test_value', 'valve_hydrostatic_test_time', 'valve_cover_bolt_torque',
  'valve_cover_bolt_material', 'valve_cover_bolt_size', 'valve_fill_bolt_torque', 'valve_seat_bolt_torque', 'valve_flow_char',
  'valve_caliber', 'valve_rod_diameter', 'valve_fill_config', 'valve_seat_leak_test', 'valve_leak_level', 'valve_leak_test_value',
  'valve_flange_bolt_tool', 'valve_cover_bolt_tool', 'valve_fill_bolt_tool', 'valve_seat_bolt_tool', 'valve_connect_bolt_tool',
  'valve_type', 'valve_model', 'valve_size_unit', 'valve_hydrostatic_test_time_unit', 'valve_hydrostatic_test_value_unit',
  'valve_cover_bolt_torque_unit', 'valve_cover_bolt_size_unit', 'valve_fill_bolt_torque_unit', 'valve_seat_bolt_torque_unit',
  'valve_caliber_unit', 'valve_rod_diameter_unit', 'valve_leak_test_value_unit', 'valve_flange_bolt_tool_unit',
  'valve_cover_bolt_tool_unit', 'valve_fill_bolt_tool_unit', 'valve_seat_bolt_tool_unit', 'valve_connect_bolt_tool_unit',
  'valve_leak_test_time', 'valve_leak_test_time_unit', 'valve_travel', 'valve_travel_unit', 'valve_lv', 'valve_test_medium',
  'valve_flow_input', 'valve_leak_test_medium', 'valve_leak_test_std_pressed', 'valve_leak_test_std_pressed_unit', 'valve_test_std',
  'valve_connect_model', 'valve_core_ball_bettlefly', 'valve_cage_retaining_ring', 'valve_set_ring', 'valve_village_bearing',
  'valve_spacer', 'valve_stem_axis', 'valve_serial_switch']
}

export function getStepActuatorFields () {
  return ['id', 'date', 'actu_manufacturer', 'actu_size', 'actu_type', 'actuator_serial', 'actu_action_mode',
  'actu_spring_set_pressure', 'actu_failure', 'actu_install_point', 'actu_cover_bolt_tool', 'actu_cover_bolt_torque',
  'actu_cover_bolt_material', 'actu_cover_bolt_size', 'actu_use_mode', 'actu_model', 'actu_spring_set_pressure_unit',
  'actu_cover_bolt_tool_unit', 'actu_cover_bolt_tool_item', 'actu_cover_bolt_torque_unit', 'actu_cover_bolt_size_unit',
  'actu_size_unit', 'actu_air_pressed', 'actu_air_pressed_unit', 'actu_install_bracket', 'actu_install_directore', 'actu_handwheel']
}

export function getStepSlaveFields () {
  return ['id', 'date', 'slave_locator_brand', 'slave_locator_model', 'slave_input_signal_scope', 'slave_standard_output',
  'slave_filter_valve_brand', 'slave_filter_valve_model', 'slave_elect_valve_brand1', 'slave_elect_valve_model1', 'slave_elect_valve_vol1',
  'slave_elect_valve_active1', 'slave_elect_valve_brand2', 'slave_elect_valve_model2', 'slave_elect_valve_vol2', 'slave_elect_valve_active2',
  'slave_elect_valve_brand3', 'slave_elect_valve_model3', 'slave_elect_valve_vol3', 'slave_elect_valve_active3',
  'slave_point_switch_brand', 'slave_point_switch_model', 'slave_other_slave', 'slave_locator_serial', 'slave_locator_actionmode',
  'slave_retaining_valve_brand', 'slave_retaining_valve_model', 'slave_retaining_valve_setpoint', 'slave_retaining_valve_setpoint_unit',
  'slave_retaining_valve_active']
}

export function getStepBaseFields () {
  return ['id', 'date', 'work_order_serial', 'type', 'tag',
  'estimate', 'return_part', 'repair_part', 'disassembly', 'receipt_date', 'serial_number',
  'requirst_done_date', 'project_serial', 'serial', 'content', 'receipt_number', 'purchased_part_list', 'control_model', 'process_medium']
}

export function getStepPartsFields () {
  return ['valve_part_type']
}

// 返回执行人姓名字符串
// data user对象数组
export function getStepUser (data) {
  var result = ''
  data.forEach(e => {
    result = result + e.user_name + ' '
  })

  return result
}

export function formatDateYMDHMS (date) {
  return moment(date).zone('+08:00').format('YYYY-MM-DD HH:mm:ss')
}

export function formatDateYMD (date) {
  if (date.indexOf('0001-01') >= 0) {
    return 'N/A'
  }
  return moment(date).zone('+08:00').format('YYYY-MM-DD')
}
