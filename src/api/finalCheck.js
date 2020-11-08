import request from '@/utils/request'

  const finalCheckApi = {
    finalCheckSave: '/save-final-check'
  }

  export function saveFinalCheckData (parameter) {
    return request({
      url: finalCheckApi.finalCheckSave,
      method: 'post',
      data: parameter
    })
  }

  // finalCheckFieldsLabelA finalCheckFields 一一对应
  export function getFinalCheckFieldsLabelA () {
    return [ '正确铭牌信息', // 1
    '阀体尺寸、材质、端部连接、焊接方式是否正确，相关信息被清晰标识', // 2
    '阀体压力等级标识正确', // 3
    '阀体无磕伤、锈迹、砂眼等铸造缺陷', // 4
    '铆印或铸造的流向箭头方向正确', // 5
    '所有未喷涂表面无锈迹', // 6
    '阀体水线是否完好，是否有保护盖', // 7
    '所有开放端口都已被用塑质或纸质材料密封', // 8
    '铸件满足MSS-SP55', // 9
    '螺栓扭矩符合要求', // 10
    '防锈油涂刷', // 11
    '油漆满足FFS 6A28（颜色）', // 12
    '是否按照客户要求进行喷漆' // 13
  ]
  }

  export function getFinalCheckFieldsA () {
    return ['valve_final_check_1',
          'valve_final_check_2',
          'valve_final_check_3',
          'valve_final_check_4',
          'valve_final_check_5',
          'valve_final_check_6',
          'valve_final_check_7',
          'valve_final_check_8',
          'valve_final_check_9',
          'valve_final_check_10',
          'valve_final_check_11',
          'valve_final_check_12',
          'valve_final_check_13']
  }

  export function getFinalCheckFieldsLabelB () {
    return ['执行机构尺寸和类型是否正确', // 1
    '正确铭牌信息', // 2
    '警示牌标签是否正确', // 3
    '安装类型是否正确，气开/气关', // 4
    '油漆满足FFS 6A28（颜色）', // 5
    '是否按照客户要求进行喷漆', // 6
    '夹块连接牢固/位置正确', // 7
    '手轮正确且位于正确的位置', // 8
    '防雨帽安装', // 9
    '维修铭牌正确' // 10
  ]
  }

  export function getFinalCheckFieldsB () {
    return ['actuator_final_check_1',
          'actuator_final_check_2',
          'actuator_final_check_3',
        'actuator_final_check_4',
        'actuator_final_check_5',
        'actuator_final_check_6',
        'actuator_final_check_7',
        'actuator_final_check_8',
        'actuator_final_check_9',
        'actuator_final_check_10'
      ]
  }

  export function getFinalCheckFieldsLabelC () {
    return ['仪表、附件的型号和数量，安装类型是否正确',
    '有防爆需求的部件是否有防爆标识',
    '管子和接头是否正确',
    '安装方向正确',
    '无松动的紧固件、连接（填料螺母、连接螺母、仪表连接、接头连接）'
  ]
  }

  export function getFinalCheckFieldsC () {
    return ['accessory_final_check_1',
          'accessory_final_check_2',
          'accessory_final_check_3',
        'accessory_final_check_4',
        'accessory_final_check_5'
      ]
  }

  export function getFinalCheckFieldsLabelD () {
    return ['维修订单完成',
    '工作指令完成',
    '维修报告完成',
    '诊断报告完成',
    '焊接报告和PWHT图表完成'
  ]
  }

  export function getFinalCheckFieldsD () {
    return ['document_final_check_1',
          'document_final_check_2',
          'document_final_check_3',
        'document_final_check_4',
        'document_final_check_5'
      ]
  }

  export function getFinalCheckFieldsLabelE () {
    return ['工作指令完成',
    '最后整体照片齐全',
    '法兰封盖',
    '开放口封堵',
    '旧备件：返回',
    '旧备件：报废'
  ]
  }

  export function getFinalCheckFieldsE () {
    return ['ship_final_check_1',
          'ship_final_check_2',
          'ship_final_check_3',
        'ship_final_check_4',
        'ship_final_check_5',
        'ship_final_check_6'
      ]
  }
