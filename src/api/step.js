import request from '@/utils/request'

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
      return 'None'
    default:
      return ''
  }
}

export function getValvePressureLevelUnit (val) {
  switch (val) {
    case '1':
      return '300'
    case '2':
      return '125'
    case '3':
      return '150'
    case '4':
      return '250'
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

export function getValveSeatLeakTestUnit (val) {
  switch (val) {
    case '1':
      return 'API598'
    case '2':
      return 'FCI70-2'
    case '3':
      return 'FGS4L5'
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

export function getValveFlowChar (val) {
  switch (val) {
    case '1':
      return '线性'
    case '2':
      return '等百分比'
    case '3':
      return '快开'
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
      return '100-75-50-25-0(Default)'
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
      return '气'
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
      return '开'
    case '2':
      return '关'
    case '3':
      return '保位'
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
      return '正反作用'
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
