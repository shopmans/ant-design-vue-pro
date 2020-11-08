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
          state: 'valve_body'
        },
        {
            title: 'Flanges（法兰密封面）',
            state: 'valve_flanges'
        },
        {
            title: 'Bolting（螺栓）',
            state: 'valve_bolting'
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
            state: 'valve_bonnet'
        },
        {
            title: 'Packing Box（填料函）',
            state: 'valve_packing_box'
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
      title: 'Air tightness（气密性）',
      state: 'actuator_air_tightness'
    },
    {
        title: 'Casing/Piston（膜室/活塞）',
        state: 'actuator_casing_tiston'
    },
    {
        title: 'Yoke（支架)',
        state: 'actuator_yoke'
    },
    {
        title: 'Stem/Shaft(推杆/轴）',
        state: 'actuator_stem_shaft'
    },
    {
      title: 'Clamp/Coupling(夹块/联轴器）',
      state: 'actuator_clamp_oupling'
    },
    {
      title: 'spring(弹簧）',
      state: 'actuator_spring'
    },
    {
        title: 'Diaphragm（膜片）',
        state: 'actuator_diaphragm'
    },
    {
        title: 'Seals/Orings（密封/O型环）',
        state: 'actuator_seals_orings'
    },
    {
        title: 'Bolting（螺栓）',
        state: 'actuator_bolting'
    },
    {
        title: 'Tagging（标记）',
        state: 'actuator_tagging'
    },
    {
      title: 'Handwheel（手轮机构）',
      state: 'actuator_handwheel'
    }
  ]
}

export function getAccessariesASFields () {
    return [
        {
            title: 'Positioner（定位器）',
            state: 'accessaries_positioner'
        },
        {
          title: 'Amplifier（放大器）',
          state: 'accessaries_amplifier'
        },
        {
            title: 'Airset（减压阀）',
            state: 'accessaries_airset'
        },
        {
            title: 'Filter（过滤器）',
            state: 'accessaries_filter'
        },
        {
            title: 'Solenoid（电磁阀）',
            state: 'accessaries_solenoid'
        },
        {
            title: 'Transmitter(位置变送器）',
            state: 'accessaries_transmitter'
        },
        {
            title: 'I/P Transducer（电气转换器）',
            state: 'accessaries_ip_transducer'
        },
        {
          title: 'Feedback（反馈部件）',
          state: 'accessaries_feedback'
        },
        {
          title: 'Pressure gauge（压力表）',
          state: 'accessaries_pressure_gauge'
        },
        {
            title: 'Limit Switch（位置开关）',
            state: 'accessaries_limitswitch'
        },
        {
            title: 'Lockup/Trip Valve（保位/切换阀）',
            state: 'accessaries_lockup_trip_valve'
        },
        {
            title: 'Handwheel（手轮）',
            state: 'accessaries_handwheel'
        },
        {
            title: 'Bypass Valve（旁路）',
            state: 'accessaries_bypass_valve'
        },
        {
            title: 'Fittings（接头）',
            state: 'accessaries_fittings'
        },
        {
            title: 'Tubing（管子）',
            state: 'accessaries_tubing'
        }
    ]
}

export function getRepairCheckBoxOptions () {
    return [
        { label: '喷砂/喷漆', value: '1' },
        { label: '清洗', value: '2' },
        { label: '热处理', value: '3' },
        { label: '机加工', value: '4' },
        { label: '全新', value: '5' },
        { label: '抛光', value: '6' },
        { label: '重新组装', value: '7' },
        { label: '替换', value: '8' },
        { label: '再次使用', value: '9' },
        { label: 'Other', value: '10' }
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

// 评估状态列表
export function getAssessmentUnit (val) {
    switch (val) {
      case '1':
        return '完好'
      case '2':
        return '损坏'
      case '3':
        return '螺栓损坏'
      case '4':
        return '气蚀'
      case '5':
        return '腐蚀'
      case '6':
        return '破裂'
      case '7':
        return '剪切'
      case '8':
        return '侵蚀'
      case '9':
        return '闪蒸'
      case '10':
        return '咬合(擦伤)'
      case '11':
        return '点蚀'
      case '12':
        return '水洗'
      case '13':
        return '磨损'
      case '14':
        return 'N/A'
      case '15':
        return 'Other'
      default:
        return ''
    }
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
