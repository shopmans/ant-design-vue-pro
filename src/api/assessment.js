import request from '@/utils/request'

  const assessmentApi = {
    assessmentSave: '/save-assessment'
  }

  export function saveAssessmentData (parameter) {
    return request({
      url: assessmentApi.assessmentSave,
      method: 'post',
      data: parameter
    })
  }

  export function getValveASFields () {
    return [
        {
          title: 'Body（阀体）',
          state: 'break5'
        },
        {
          title: 'Body（阀体）',
          state: 'valve_body'
        },
        {
            title: 'Flanges（法兰密封面）',
            state: 'valve_flanges'
        },
        {
          title: 'Gasket Surface（垫片表面）',
          state: 'valve_gasket_surface'
        },
        {
          title: 'Seat Area（阀座区域）',
          state: 'valve_seat_area'
        },
        {
          title: 'Bonnet（阀盖）',
          state: 'break1'
        },
        {
          title: 'Bonnet（阀盖）',
          state: 'valve_bonnet'
        },
        {
          title: 'Packing Box（填料函）',
          state: 'valve_packing_box'
        },
        {
            title: 'Bolting（螺栓）',
            state: 'valve_bolting'
        },
        {
          title: 'Trim（阀内件）',
          state: 'break2'
        },
        {
            title: 'Plug/Ball/Disc（阀芯/球/蝶板）',
            state: 'valve_plug_ball_disc'
        },
        {
            title: 'Cage/Guide/Ret（阀笼/导向/保持环）',
            state: 'valve_cage_guide_ret'
        },
        {
            title: 'Seat Ring（阀座环）',
            state: 'valve_seat_ring'
        },
        {
            title: 'Stem/Shaft（阀杆/轴）',
            state: 'valve_stem_shaft'
        },
        {
            title: 'Seal/Piston Ring（密封环）',
            state: 'valve_seal_piston_ring'
        },
        {
            title: 'Bushing/Bearing（衬套/轴承）',
            state: 'valve_bushing_bearing'
        }
    ]
}

export function getActuatorASFields () {
  return [
    {
      title: 'Actuator（执行机构）',
      state: 'actuator'
    },
    {
        title: 'Casing/Piston（膜室/活塞）',
        state: 'actuator_casing_tiston'
    },
    {
        title: 'Cylinder(气缸)',
        state: 'actuator_cylinder'
    },
    {
      title: 'Diaphragm（膜片）',
      state: 'actuator_diaphragm'
    },
    {
      title: 'spring(弹簧）',
      state: 'actuator_spring'
    },
    {
      title: 'Stem/Shaft(推杆/轴）',
      state: 'actuator_stem_shaft'
    },
    {
        title: 'Yoke（支架)',
        state: 'actuator_yoke'
    },
    {
      title: 'Seals/Orings（密封/O型环）',
      state: 'actuator_seals_orings'
    },
    {
      title: 'Bushing (衬套)',
      state: 'actuator_bushing'
    },
    {
      title: 'Handwheel（手轮机构）',
      state: 'actuator_handwheel'
    },
    {
      title: 'Bolting（螺栓）',
      state: 'actuator_bolting'
    },
    {
      title: 'Clamp/Coupling/level(夹块/联轴器/曲轴）',
      state: 'actuator_clamp_oupling'
    },
    {
      title: 'Nameplate/Tagging(铭牌/标示牌)',
      state: 'actuator_tagging'
    }
  ]
}

export function getAccessariesASFields () {
    return [
      {
        title: 'Positioner（定位器）',
        state: 'break3'
      },
      {
        title: 'Positioner（定位器）',
        state: 'accessaries_positioner'
      },
      {
        title: 'Booster（放大器）',
        state: 'accessaries_amplifier'
      },
      {
        title: 'I/P Transducer（电气转换器）',
        state: 'accessaries_ip_transducer'
      },
      {
        title: 'PWB（电路板）',
        state: 'accessaries_pwb'
      },
      {
        title: 'Housing (外壳)',
        state: 'accessaries_housing'
      },
      {
        title: 'Pressure gauge（压力表）',
        state: 'accessaries_pressure_gauge'
      },
      {
        title: 'Terminal (接线端子盒)',
        state: 'accessaries_terminal'
      },
      {
        title: 'Feedback（反馈部件）',
        state: 'accessaries_feedback'
      },
      {
        title: 'Airset（过滤减压阀）',
        state: 'break6'
      },
      {
          title: 'Airset（过滤减压阀）',
          state: 'accessaries_airset'
      },
      {
        title: 'Solenoid（电磁阀）',
        state: 'break7'
      },
      {
        title: 'Solenoid（电磁阀）',
        state: 'accessaries_solenoid'
      },
      {
        title: 'Limit Switch（位置开关）',
        state: 'break8'
      },
      {
        title: 'Limit Switch（位置开关）',
        state: 'accessaries_limitswitch'
      },
      {
        title: 'Lockup/Trip Valve（保位/切换阀）',
        state: 'break9'
      },
      {
        title: 'Lockup/Trip Valve（保位/切换阀）',
        state: 'accessaries_lockup_trip_valve'
      },
      {
        title: '其它附件',
        state: 'break4'
      },
      {
        title: 'Other（其它附件）',
        state: 'accessaries_other'
      }
      // {
      //     title: 'Transmitter(位置变送器）',
      //     state: 'accessaries_transmitter'
      // },
      // {
      //     title: 'Handwheel（手轮）',
      //     state: 'accessaries_handwheel'
      // },
      // {
      //     title: 'Bypass Valve（旁路）',
      //     state: 'accessaries_bypass_valve'
      // },
      // {
      //     title: 'Fittings（接头）',
      //     state: 'accessaries_fittings'
      // },
      // {
      //     title: 'Tubing（管子）',
      //     state: 'accessaries_tubing'
      // }
    ]
}

export function getRepairCheckBoxOptions () {
    return [
        // { label: '喷砂/喷漆', value: '1' },
        // { label: '清洗', value: '2' },
        // { label: '热处理', value: '3' },
        // { label: '机加工', value: '4' },
        // { label: '全新', value: '5' },
        // { label: '抛光', value: '6' },
        // { label: '重新组装', value: '7' },
        // { label: '替换', value: '8' },
        // { label: '再次使用', value: '9' },
        // { label: 'Other', value: '10' }
        { label: '清洗清洁', value: '1' },
        { label: '打磨抛光', value: '2' },
        { label: '机加工', value: '3' },
        { label: '焊接', value: '4' },
        { label: '热处理', value: '5' },
        { label: '喷砂', value: '6' },
        { label: '喷漆', value: '7' },
        { label: '喷涂', value: '8' },
        { label: '电镀', value: '9' },
        { label: '原样使用', value: '10' },
        { label: '更换', value: '11' },
        { label: '校直', value: '12' }
    ]
    // return [
    //     { label: '抛光', value: '1' },
    //     { label: '校直', value: '2' },
    //     { label: '研磨', value: '3' },
    //     { label: '焊补', value: '4' },
    //     { label: '电镀', value: '5' },
    //     { label: '喷涂', value: '6' },
    //     { label: '车修', value: '7' },
    //     { label: '磨修', value: '8' },
    //     { label: '喷砂', value: '9' },
    //     { label: '喷漆', value: '10' },
    //     { label: '更换', value: '11' }
    // ]
}

// /////////////////////////////////////////////////////////////// 执行机购

// 查看详细- 评估状态列表
export function getActuatorAssessmentUnit (val, index) {
  switch (val) { // case 值取至getActuatorASFields
    case 'actuator':
      return getActuatorAssessmentText(getActuatorSelectItem(), index)
    case 'actuator_casing_tiston': // Casing/Piston（膜室/活塞）
      return getActuatorAssessmentText(getCasingPistonSelectItem(), index)
    case 'actuator_cylinder': // 'Cylinder(气缸)'
      return getActuatorAssessmentText(getCylinderSelectItem(), index)
    case 'actuator_diaphragm': // 'Diaphragm（膜片）'
      return getActuatorAssessmentText(getDiaphramSelectItem(), index)
    case 'actuator_spring': // spring(弹簧）
      return getActuatorAssessmentText(getSpringSelectItem(), index)
    case 'actuator_stem_shaft': // Stem/Shaft(推杆/轴）
      return getActuatorAssessmentText(getStemShaftSelectItem(), index)
    case 'actuator_yoke': // Yoke（支架)
      return getActuatorAssessmentText(getYokeSelectItem(), index)
    case 'actuator_seals_orings': // Seals/Orings（密封/O型环）
      return getActuatorAssessmentText(getSealsOringsSelectItem(), index)
    case 'actuator_bushing': // Bushing (衬套)
      return getActuatorAssessmentText(getBushingSelectItem(), index)
    case 'actuator_handwheel': // Handwheel（手轮机构）
      return getActuatorAssessmentText(getHandwheelSelectItem(), index)
    case 'actuator_bolting': // Bolting（螺栓）
      return getActuatorAssessmentText(getBoltsSelectItem(), index)
    case 'actuator_clamp_oupling': // Clamp/Coupling/level(夹块/联轴器/曲轴）
      return getActuatorAssessmentText(getClampCouplingSelectItem(), index)
    case 'actuator_tagging': // Nameplate/Tagging(铭牌/标示牌)
      return getActuatorAssessmentText(getNameplateTaggingSelectItem(), index)
    default:
      return ''
  }
}

  function getActuatorAssessmentText (array, index) {
    const key = index + ''
    for (var i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        return array[i].text
      }
    }
  }

  // // 查看详细 - 维修动作执行机购维修运作
  export function getActuatorRepairCheckFields (val) {
    switch (val) { // case 值取至getActuatorASFields
      case 'actuator':
        return getActuatorCheckBoxOptions()
      case 'actuator_casing_tiston': // Casing/Piston（膜室/活塞）
        return getCasingPistonCheckBoxOptions()
      case 'actuator_cylinder': // 'Cylinder(气缸)'
        return getCylinderCheckBoxOptions()
      case 'actuator_diaphragm': // 'Diaphragm（膜片）'
        return getDiaphramCheckBoxOptions()
      case 'actuator_spring': // spring(弹簧）
        return getSpringCheckBoxOptions()
      case 'actuator_stem_shaft': // Stem/Shaft(推杆/轴）
        return getStemShaftCheckBoxOptions()
      case 'actuator_yoke': // Yoke（支架)
        return getYokeCheckBoxOptions()
      case 'actuator_seals_orings': // Seals/Orings（密封/O型环）
        return getSealsOringsCheckBoxOptions()
      case 'actuator_bushing': // Bushing (衬套)
        return getBushingCheckBoxOptions()
      case 'actuator_handwheel': // Handwheel（手轮机构）
        return getHandwheelCheckBoxOptions()
      case 'actuator_bolting': // Bolting（螺栓）
        return getBoltsCheckBoxOptions()
      case 'actuator_clamp_oupling': // Clamp/Coupling/level(夹块/联轴器/曲轴）
        return getClampCouplingCheckBoxOptions()
      case 'actuator_tagging': // Nameplate/Tagging(铭牌/标示牌)
        return getNameplateTaggingCheckBoxOptions()
      default:
        return ''
    }
  }

// 执行机构评估-状态下拉 - Actuator（执行机构)
export function getActuatorSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '腐蚀'
    },
    {
      key: '4',
      text: '锈蚀'
    },
    {
      key: '5',
      text: '损坏'
    },
    {
      key: '6',
      text: '漏气'
    },
    {
      key: '7',
      text: '窜气'
    },
    {
      key: '8',
      text: 'N/A'
    },
    {
      key: '9',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作 - Actuator（执行机构)
export function getActuatorCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '喷砂', value: '3' },
    { label: '喷漆', value: '4' },
    { label: '原样使用', value: '5' },
    { label: '更换密封组件', value: '6' },
    { label: '整体更换', value: '7' }
  ]
}

  // 执行机构评估-状态下拉-Casing/Piston(膜盖/活塞)
  export function getCasingPistonSelectItem () {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '断裂'
      },
      {
        key: '3',
        text: '腐蚀'
      },
      {
        key: '4',
        text: '裂纹破裂'
      },
      {
        key: '5',
        text: '锈蚀'
      },
      {
        key: '6',
        text: '磨损'
      },
      {
        key: '7',
        text: 'N/A'
      },
      {
        key: '8',
        text: 'Other'
      }
    ]
  }

  // 执行机构评估-维修动作-Casing/Piston(膜盖/活塞)
  export function getCasingPistonCheckBoxOptions () {
    return [
      { label: '清洗清洁', value: '1' },
      { label: '抛光打磨', value: '2' },
      { label: '喷涂', value: '3' },
      { label: '电镀', value: '4' },
      { label: '焊接', value: '5' },
      { label: '加工', value: '6' },
      { label: '更换', value: '7' }
    ]
  }

  // 执行机构评估-状态下拉-Cylinder(气缸)
  export function getCylinderSelectItem () {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '腐蚀'
      },
      {
        key: '3',
        text: '划伤拉伤'
      },
      {
        key: '4',
        text: '裂纹破裂'
      },
      {
        key: '5',
        text: '磨损'
      },
      {
        key: '6',
        text: 'N/A'
      },
      {
        key: '7',
        text: 'Other'
      }
    ]
  }

  // 执行机构评估-维修动作-Cylinder(气缸)
  export function getCylinderCheckBoxOptions () {
    return [
      { label: '清洗清洁', value: '1' },
      { label: '抛光打磨', value: '2' },
      { label: '喷涂', value: '3' },
      { label: '电镀', value: '4' },
      { label: '焊接', value: '5' },
      { label: '加工', value: '6' },
      { label: '更换', value: '7' }
    ]
  }

// 执行机构评估-状态下拉-Diaphram (膜片)
export function getDiaphramSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '破裂'
    },
    {
      key: '3',
      text: '划伤'
    },
    {
      key: '4',
      text: '磨损'
    },
    {
      key: '5',
      text: '老化'
    },
    {
      key: '6',
      text: 'N/A'
    },
    {
      key: '7',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作-Diaphram (膜片)
export function getDiaphramCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '更换', value: '2' }
  ]
}

// 执行机构评估-状态下拉 - spring(弹簧）
export function getSpringSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '锈蚀'
    },
    {
      key: '4',
      text: '点蚀坑洼'
    },
    {
      key: '5',
      text: '裂纹破裂'
    },
    {
      key: '6',
      text: '擦伤'
    },
    {
      key: '7',
      text: '磨损'
    },
    {
      key: '8',
      text: '疲劳'
    },
    {
      key: '9',
      text: 'N/A'
    },
    {
      key: '10',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作 - spring(弹簧）
export function getSpringCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '抛光打磨', value: '2' },
    { label: '更换', value: '4' }
  ]
}

// 执行机构评估-状态下拉 - Stem/Shaft(推杆/轴)
export function getStemShaftSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '锈蚀'
    },
    {
      key: '4',
      text: '点蚀坑洼'
    },
    {
      key: '5',
      text: '擦伤'
    },
    {
      key: '6',
      text: '弯曲扭曲'
    },
    {
      key: '7',
      text: '磨损'
    },
    {
      key: '8',
      text: 'N/A'
    },
    {
      key: '9',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作 - Stem/Shaft(推杆/轴)
export function getStemShaftCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '抛光打磨', value: '2' },
    { label: '喷涂', value: '3' },
    { label: '电镀', value: '4' },
    { label: '焊接', value: '5' },
    { label: '加工', value: '6' },
    { label: '校直', value: '7' },
    { label: '更换', value: '8' }
  ]
}

  // 执行机构评估-状态下拉-Yoke(支架)
  export function getYokeSelectItem () {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '断裂'
      },
      {
        key: '3',
        text: '锈蚀'
      },
      {
        key: '4',
        text: '点蚀坑洼'
      },
      {
        key: '5',
        text: '裂纹破裂'
      },
      {
        key: '6',
        text: '擦伤'
      },
      {
        key: '8',
        text: 'N/A'
      },
      {
        key: '9',
        text: 'Other'
      }
    ]
  }

  // 执行机构评估-维修动作-Yoke(支架)
  export function getYokeCheckBoxOptions () {
    return [
      { label: '清洗清洁', value: '1' },
      { label: '抛光打磨', value: '2' },
      { label: '焊接', value: '3' },
      { label: '喷砂喷漆', value: '5' },
      { label: '更换', value: '6' }
    ]
  }

// 执行机构评估-状态下拉-Seals/Orings(密封件/O型环)
export function getSealsOringsSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '破裂'
    },
    {
      key: '3',
      text: '划伤'
    },
    {
      key: '4',
      text: '磨损'
    },
    {
      key: '5',
      text: '老化'
    },
    {
      key: '6',
      text: 'N/A'
    },
    {
      key: '7',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作-Seals/Orings(密封件/O型环)
export function getSealsOringsCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '更换', value: '2' }
  ]
}

  export function getAssessmentSelectItem (val) {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '断裂'
      },
      {
        key: '3',
        text: '气蚀'
      },
      {
        key: '4',
        text: '腐蚀'
      },
      {
        key: '5',
        text: '裂纹破裂'
      },
      {
        key: '6',
        text: '划伤刮伤'
      },
      {
        key: '7',
        text: '锈蚀'
      },
      {
        key: '8',
        text: '闪蒸'
      },
      {
        key: '9',
        text: '咬合（擦伤）'
      },
      {
        key: '10',
        text: '点蚀坑洼'
      },
      {
        key: '11',
        text: '冲刷'
      },
      {
        key: '12',
        text: '磨损'
      },
      {
        key: '13',
        text: 'N/A'
      },
      {
        key: '14',
        text: 'Other'
      },
      // //////////////////////////////////////
      {
        key: '15',
        text: '弯曲扭曲'
      },
      {
        key: '16',
        text: '螺栓断裂'
      }
    ]
  }

// 执行机构评估-状态下拉-Bushing/衬套
export function getBushingSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '腐蚀'
    },
    {
      key: '4',
      text: '裂纹破裂'
    },
    {
      key: '5',
      text: '磨损'
    },
    {
      key: '6',
      text: 'N/A'
    },
    {
      key: '7',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作-Bushing/衬套
export function getBushingCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '抛光打磨', value: '2' },
    { label: '电镀', value: '4' },
    { label: '更换', value: '5' }
  ]
}

  // 执行机构评估-状态下拉-Handwheel（手轮机构）
  export function getHandwheelSelectItem () {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '断裂'
      },
      {
        key: '3',
        text: '锈蚀'
      },
      {
        key: '4',
        text: '破裂'
      },
      {
        key: '5',
        text: '磨损'
      },
      {
        key: '6',
        text: 'N/A'
      },
      {
        key: '7',
        text: 'Other'
      }
    ]
  }

  // 执行机构评估-维修动作-Handwheel（手轮机构）
  export function getHandwheelCheckBoxOptions () {
    return [
      { label: '清洁', value: '1' },
      { label: '喷砂喷漆', value: '2' },
      { label: '加工', value: '3' },
      { label: '焊接', value: '4' },
      { label: '更换', value: '5' }
    ]
  }

// 执行机构评估-状态下拉- Bolts(螺栓)
export function getBoltsSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '锈蚀'
    },
    {
      key: '4',
      text: '咬死'
    },
    {
      key: '5',
      text: '磨损'
    },
    {
      key: '6',
      text: 'N/A'
    },
    {
      key: '7',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作- Bolts(螺栓)
export function getBoltsCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '抛光', value: '2' },
    { label: '电镀', value: '4' },
    { label: '更换', value: '5' }
  ]
}

// 执行机构评估-状态下拉- Clamp/Coupling/level(夹块/联轴器/曲轴）
export function getClampCouplingSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '锈蚀'
    },
    {
      key: '4',
      text: '磨损'
    },
    {
      key: '5',
      text: 'N/A'
    },
    {
      key: '6',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作- Clamp/Coupling/level(夹块/联轴器/曲轴）
export function getClampCouplingCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '抛光', value: '2' },
    { label: '加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '电镀', value: '5' },
    { label: '更换', value: '6' }
  ]
}

// 执行机构评估-状态下拉- Nameplate/Tagging(铭牌/标示牌)
export function getNameplateTaggingSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '损坏'
    },
    {
      key: '3',
      text: '缺失'
    },
    {
      key: '4',
      text: 'N/A'
    },
    {
      key: '5',
      text: 'Other'
    }
  ]
}

// 执行机构评估-维修动作- Nameplate/Tagging(铭牌/标示牌)
export function getNameplateTaggingCheckBoxOptions () {
  return [
    { label: '清洗', value: '1' },
    { label: '更换', value: '2' }
  ]
}

  export function getAssessmentCheckOrRepairUnit (val) {
    switch (val) {
      case 1: {
        return '检测'
      }
      case 2: {
        return '维修'
      }
    }
  }

  // /////////////////////////////////////////////////////////////// 阀门

  // 查看详细-评估
  export function getValvaAssessmentUnit (val, index) {
    switch (val) {
      case 'valve_body': // Body（阀体）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_flanges': // Flanges（法兰密封面）
        return getActuatorAssessmentText(getFlangesSelectItem(), index)
      case 'valve_gasket_surface': // Gasket Surface（垫片表面）
        return getActuatorAssessmentText(getFlangesSelectItem(), index)
      case 'valve_seat_area': // Seat Area（阀座区域）
        return getActuatorAssessmentText(getValveSeatSelectItem(), index)
      case 'valve_bonnet': // Bonnet（阀盖）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_packing_box': // Packing Box（填料函）
        return getActuatorAssessmentText(getValvePackingBoxSelectItem(), index)
      case 'valve_bolting': // Bolting（螺栓）
        return getActuatorAssessmentText(getValveBoltSelectItem(), index)
      case 'valve_plug_ball_disc': // Plug/Ball/Disc（阀芯/球/蝶板）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_cage_guide_ret': // Cage/Guide/Ret（阀笼/导向/保持环）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_seat_ring': // Seat Ring（阀座环）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_stem_shaft': // Stem/Shaft（阀杆/轴）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_seal_piston_ring': // Seal/Piston Ring（密封环）
        return getActuatorAssessmentText(getValvaDefaultSelectItem(), index)
      case 'valve_bushing_bearing': // Bushing/Bearing（衬套/轴承）
        return getActuatorAssessmentText(getValveBushingBearingSelectItem(), index)
      default:
        return ''
    }
  }

  // 查看详细-维修动作
  export function getValvaRepairCheckFields (val) {
    switch (val) {
      case 'valve_body': // Body（阀体）
        return getValveCheckBoxOptions()
      case 'valve_flanges': // Flanges（法兰密封面）
        return getFlangCheckBoxOpions()
      case 'valve_gasket_surface': // Gasket Surface（垫片表面）
        return getFlangCheckBoxOpions()
      case 'valve_seat_area': // Seat Area（阀座区域）
        return getFlangCheckBoxOpions()
      case 'valve_bonnet': // Bonnet（阀盖）
        return getValveCheckBoxOptions()
      case 'valve_packing_box': // Packing Box（填料函）
        return getValvePackingBoxCheckBoxOptions()
      case 'valve_bolting': // Bolting（螺栓）
        return getValveBoltCheckBoxOptions()
      case 'valve_plug_ball_disc': // Plug/Ball/Disc（阀芯/球/蝶板）
        return getValvePlugBallDiscCheckBoxOptions()
      case 'valve_cage_guide_ret': // Cage/Guide/Ret（阀笼/导向/保持环）
        return getValveCageGuideRetCheckBoxOptions()
      case 'valve_seat_ring': // Seat Ring（阀座环）
        return getValvePlugBallDiscCheckBoxOptions()
      case 'valve_stem_shaft': // Stem/Shaft（阀杆/轴）
        return getValveStemShaftCheckBoxOptions()
      case 'valve_seal_piston_ring': // Seal/Piston Ring（密封环）
        return getValvePlugBallDiscCheckBoxOptions()
      case 'valve_bushing_bearing': // Bushing/Bearing（衬套/轴承）
        return getValvePlugBallDiscCheckBoxOptions()
      default:
        return []
    }
  }

  // 阀门评估-状态下拉 - 默认评估
export function getValvaDefaultSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '气蚀'
    },
    {
      key: '4',
      text: '腐蚀'
    },
    {
      key: '5',
      text: '裂纹破裂'
    },
    {
      key: '6',
      text: '划伤刮伤'
    },
    {
      key: '7',
      text: '锈蚀'
    },
    {
      key: '8',
      text: '闪蒸'
    },
    {
      key: '9',
      text: '咬合（擦伤）'
    },
    {
      key: '10',
      text: '点蚀坑洼'
    },
    {
      key: '11',
      text: '冲刷'
    },
    {
      key: '12',
      text: '磨损'
    },
    {
      key: '13',
      text: 'N/A'
    },
    {
      key: '14',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作-默认动作
export function getValveDefaultCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' },
    { label: '喷砂', value: '6' },
    { label: '喷漆', value: '7' },
    { label: '喷涂', value: '8' },
    { label: '原样使用', value: '9' },
    { label: '更换', value: '10' }
  ]
}

  // 阀门评估-状态下拉-Body（阀体）
  export function getValveSelectItem () {
    return [
      {
        key: '1',
        text: '良好'
      },
      {
        key: '2',
        text: '腐蚀'
      },
      {
        key: '3',
        text: '锈蚀'
      },
      {
        key: '4',
        text: '冲刷'
      },
      {
        key: '5',
        text: '裂纹破裂'
      },
      {
        key: '6',
        text: 'other'
      }
    ]
  }

  // 阀门评估-维修动作-Body（阀体）
  export function getValveCheckBoxOptions () {
    return [
      { label: '清洗清洁', value: '1' },
      { label: '打磨抛光', value: '2' },
      { label: '机加工', value: '3' },
      { label: '焊接', value: '4' },
      { label: '热处理', value: '5' },
      { label: '喷砂', value: '6' },
      { label: '喷漆', value: '7' },
      { label: '喷涂', value: '8' },
      { label: '电镀', value: '9' },
      { label: '更换', value: '10' }
    ]
  }

// 阀门评估-状态下拉-法兰
export function getFlangesSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '腐蚀'
    },
    {
      key: '3',
      text: '划伤刮伤'
    },
    {
      key: '4',
      text: '锈蚀'
    },
    {
      key: '5',
      text: '点蚀坑洼'
    },
    {
      key: '6',
      text: '冲刷'
    },
    {
      key: '7',
      text: 'N/A'
    },
    {
      key: '8',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作-法兰
export function getFlangCheckBoxOpions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' }
  ]
}

// 阀门评估-状态下拉-阀座
export function getValveSeatSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '气蚀'
    },
    {
      key: '3',
      text: '腐蚀'
    },
    {
      key: '4',
      text: '裂纹破裂'
    },
    {
      key: '5',
      text: '锈蚀'
    },
    {
      key: '6',
      text: '闪蒸'
    },
    {
      key: '7',
      text: '咬合（擦伤）'
    },
    {
      key: '8',
      text: '点蚀坑洼'
    },
    {
      key: '9',
      text: '冲刷'
    },
    {
      key: '10',
      text: 'N/A'
    },
    {
      key: '11',
      text: 'Other'
    }
  ]
}

// 阀门评估-状态下拉-填料函
export function getValvePackingBoxSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '腐蚀'
    },
    {
      key: '3',
      text: '裂纹破裂'
    },
    {
      key: '4',
      text: '划伤刮伤'
    },
    {
      key: '5',
      text: '锈蚀'
    },
    {
      key: '6',
      text: '咬合（擦伤）'
    },
    {
      key: '7',
      text: '点蚀坑洼'
    },
    {
      key: '8',
      text: '冲刷'
    },
    {
      key: '9',
      text: 'N/A'
    },
    {
      key: '10',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作-填料函
export function getValvePackingBoxCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' }
  ]
}

// 阀门评估-状态下拉-螺栓
export function getValveBoltSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '腐蚀'
    },
    {
      key: '4',
      text: '裂纹破裂'
    },
    {
      key: '5',
      text: '划伤刮伤'
    },
    {
      key: '6',
      text: '锈蚀'
    },
    {
      key: '7',
      text: '咬合（擦伤）'
    },
    {
      key: '8',
      text: 'N/A'
    },
    {
      key: '9',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作-螺栓
export function getValveBoltCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '电镀', value: '4' },
    { label: '更换', value: '5' }
  ]
}

// 阀门评估-状态下拉 - Stem/Shaft（阀杆/轴）
export function getValvaStemShaftSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '气蚀'
    },
    {
      key: '4',
      text: '腐蚀'
    },
    {
      key: '5',
      text: '裂纹破裂'
    },
    {
      key: '6',
      text: '划伤刮伤'
    },
    {
      key: '7',
      text: '锈蚀'
    },
    {
      key: '8',
      text: '闪蒸'
    },
    {
      key: '9',
      text: '咬合（擦伤）'
    },
    {
      key: '10',
      text: '点蚀坑洼'
    },
    {
      key: '11',
      text: '冲刷'
    },
    {
      key: '12',
      text: '磨损'
    },
    {
      key: '15',
      text: '弯曲扭曲'
    },
    {
      key: '13',
      text: 'N/A'
    },
    {
      key: '14',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作 - Stem/Shaft（阀杆/轴）
export function getValveStemShaftCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' },
    { label: '喷涂', value: '6' },
    { label: '电镀', value: '7' },
    { label: '更换', value: '8' },
    { label: '校直', value: '9' }
  ]
}

// 阀门评估-状态下拉 - Bolts(螺栓)
export function getValvaBoltsSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '3',
      text: '气蚀'
    },
    {
      key: '4',
      text: '腐蚀'
    },
    {
      key: '5',
      text: '裂纹破裂'
    },
    {
      key: '6',
      text: '划伤刮伤'
    },
    {
      key: '7',
      text: '锈蚀'
    },
    {
      key: '8',
      text: '闪蒸'
    },
    {
      key: '9',
      text: '咬合（擦伤）'
    },
    {
      key: '10',
      text: '点蚀坑洼'
    },
    {
      key: '11',
      text: '冲刷'
    },
    {
      key: '12',
      text: '磨损'
    },
    {
      key: '15',
      text: '螺栓断裂'
    },
    {
      key: '13',
      text: 'N/A'
    },
    {
      key: '14',
      text: 'Other'
    }
  ]
}

// 阀门评估-维修动作-阀芯/球/蝶板
export function getValvePlugBallDiscCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' },
    { label: '喷涂', value: '6' },
    { label: '电镀', value: '7' },
    { label: '更换', value: '8' }
  ]
}

// 阀门评估-维修动作-阀笼/导向/保持环
export function getValveCageGuideRetCheckBoxOptions () {
  return [
    { label: '清洗清洁', value: '1' },
    { label: '打磨抛光', value: '2' },
    { label: '机加工', value: '3' },
    { label: '焊接', value: '4' },
    { label: '热处理', value: '5' },
    { label: '电镀', value: '6' },
    { label: '更换', value: '7' }
  ]
}

// 阀门评估-状态下拉-衬套/轴承
export function getValveBushingBearingSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '断裂'
    },
    {
      key: '4',
      text: '腐蚀'
    },
    {
      key: '5',
      text: '裂纹破裂'
    },
    {
      key: '6',
      text: '划伤刮伤'
    },
    {
      key: '7',
      text: '锈蚀'
    },
    {
      key: '9',
      text: '咬合（擦伤）'
    },
    {
      key: '10',
      text: '点蚀坑洼'
    },
    {
      key: '11',
      text: '冲刷'
    },
    {
      key: '12',
      text: '磨损'
    },
    {
      key: '15',
      text: '变形'
    },
    {
      key: '13',
      text: 'N/A'
    },
    {
      key: '14',
      text: 'Other'
    }
  ]
}

// /////////////////////////////////////////////////////////////// 附件

// 查看详细 - 评估
export function getOtherAssessmentUnit (val, index) {
  switch (val) {
    case 'accessaries_amplifier': // Amplifier（放大器）
    case 'accessaries_ip_transducer': // I/P Transducer（电气转换器）
    case 'accessaries_pwb': // PWB（电路板）
    case 'accessaries_housing': // Housing (外壳)
    case 'accessaries_pressure_gauge': // Pressure gauge（压力表）
    case 'accessaries_terminal': // Terminal (接线端子盒)
    case 'accessaries_feedback': // Feedback（反馈部件）
      return getActuatorAssessmentText(getAccessariesSelectItem(), index)
    case 'accessaries_positioner': // Positioner（定位器）
      return getActuatorAssessmentText(getAccessariesSelectItem(), index)
    case 'accessaries_airset': // Airset（过滤减压阀）
    case 'accessaries_solenoid': // Solenoid（电磁阀）
    case 'accessaries_limitswitch': // Limit Switch（位置开关）
    case 'accessaries_lockup_trip_valve': // Lockup/Trip Valve（保位/切换阀）
    case 'accessaries_other': // Other（其它附件）
      return getActuatorAssessmentText(getOtherAccessariesSelectItem(), index)
    default:
      return ''
  }
}

// 查看详细 - 维修动作
export function getOtherRepairCheckFields (val) {
  switch (val) {
    case 'accessaries_ip_transducer': // I/P Transducer（电气转换器）
      return getIpTransducerCheckBoxOptions()
    case 'accessaries_amplifier': // Amplifier（放大器）
    case 'accessaries_pwb': // PWB（电路板）
    case 'accessaries_housing': // Housing (外壳)
    case 'accessaries_pressure_gauge': // Pressure gauge（压力表）
    case 'accessaries_terminal': // Terminal (接线端子盒)
    case 'accessaries_feedback': // Feedback（反馈部件）
      return getOtherAccessariesCheckBoxOptions()
    case 'accessaries_positioner': // Positioner（定位器）
      return getPositionerCheckBoxOptions()
    case 'accessaries_limitswitch': // Limit Switch（位置开关）
      return getPositionerCheckBoxOptions()
    case 'accessaries_airset': // Airset（过滤减压阀）
    case 'accessaries_solenoid': // Solenoid（电磁阀）
    case 'accessaries_lockup_trip_valve': // Lockup/Trip Valve（保位/切换阀）
    case 'accessaries_other': // Other（其它附件）
      return getOtherAccessariesCheckBoxOptions()
    default:
      return ''
  }
}

// 附件-维修动作 - Positioner（定位器）
export function getPositionerCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '原样使用', value: '2' },
    { label: '调校', value: '3' },
    { label: '更换', value: '4' }
  ]
}

// 附件-维修动作 - I/P Transducer（电气转换器）
export function getIpTransducerCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '吹扫', value: '2' },
    { label: '原样使用', value: '3' },
    { label: '更换', value: '4' }
  ]
}

export function getAccessariesSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '损坏'
    },
    {
      key: '3',
      text: '锈蚀'
    },
    {
      key: '4',
      text: '迟滞'
    },
    {
      key: '5',
      text: '堵塞'
    },
    {
      key: '6',
      text: '超范围'
    },
    {
      key: '7',
      text: '缺失'
    },
    {
      key: '8',
      text: '破裂'
    },
    {
      key: '9',
      text: 'N/A'
    },
    {
      key: '10',
      text: 'Other'
    }
  ]
}

export function getAccessariesCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '吹扫', value: '2' },
    { label: '抛光', value: '3' },
    { label: '调校', value: '4' },
    { label: '更换', value: '5' }
  ]
}

// 其它附件-状态下拉
export function getOtherAccessariesSelectItem () {
  return [
    {
      key: '1',
      text: '良好'
    },
    {
      key: '2',
      text: '损伤'
    },
    {
      key: '3',
      text: '损坏'
    },
    {
      key: '4',
      text: '缺失'
    },
    {
      key: '5',
      text: 'N/A'
    },
    {
      key: '6',
      text: 'Other'
    }
  ]
}

// 其它附件-维修动作
export function getOtherAccessariesCheckBoxOptions () {
  return [
    { label: '清洁', value: '1' },
    { label: '原样使用', value: '2' },
    { label: '更换', value: '3' }
  ]
}

// 其它附件-与新建工单中附件的选择区域对应
export function isSelectAreaOtherAccessaries (val, selectArea, selectFields) {
  if (selectArea === null || selectFields === null) {
    return false
  }

  var result = false
  selectFields.forEach(field => {
    if (val === field.desc) {
      result = selectArea.indexOf(field.key) >= 0
    }
  })

  return result
}
