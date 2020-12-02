import request from '@/utils/request'

  const adjustApi = {
    adjustSave: '/save-adjust'
  }

  export function saveAdjustData (parameter) {
    return request({
      url: adjustApi.adjustSave,
      method: 'post',
      data: parameter
    })
  }

  export function getInputSignalColumns () {
    return [
      {
        title: '输入电流',
        dataIndex: 'leftTitle',
        width: '8%'
      },
      {
        title: 'mA',
        dataIndex: 'ma',
        width: '5%'
      },
      {
        title: '4',
        dataIndex: 'ma4',
        width: '9%',
        scopedSlots: { customRender: 'ma4' }
      },
      {
        title: '8',
        dataIndex: 'ma8',
        width: '9%',
        scopedSlots: { customRender: 'ma8' }
      },
      {
        title: '12',
        dataIndex: 'ma12',
        width: '9%',
        scopedSlots: { customRender: 'ma12' }
      },
      {
        title: '16',
        dataIndex: 'ma16',
        width: '9%',
        scopedSlots: { customRender: 'ma16' }
      },
      {
        title: '20',
        dataIndex: 'ma20',
        width: '9%',
        scopedSlots: { customRender: 'ma20' }
      },
      {
        title: '16',
        dataIndex: 'ma161',
        width: '9%',
        scopedSlots: { customRender: 'ma161' }
      },
      {
        title: '12',
        dataIndex: 'ma121',
        width: '9%',
        scopedSlots: { customRender: 'ma121' }
      },
      {
        title: '8',
        dataIndex: 'ma81',
        width: '9%',
        scopedSlots: { customRender: 'ma81' }
      },
      {
        title: '4',
        dataIndex: 'ma41',
        width: '9%',
        scopedSlots: { customRender: 'ma41' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width: '5%'
      }
    ]
  }

  export function getInputSignalData () {
    return [
      {
        leftTitle: '输入阀位',
        key: '1',
        ma: '%',
        ma4: '',
        ma8: '',
        ma12: '',
        ma16: '',
        ma20: '',
        ma161: '',
        ma121: '',
        ma81: '',
        ma41: ''
      },
      {
        leftTitle: '反馈电流',
        key: '2',
        ma: 'mA',
        ma4: '',
        ma8: '',
        ma12: '',
        ma16: '',
        ma20: '',
        ma161: '',
        ma121: '',
        ma81: '',
        ma41: ''
      },
      {
        leftTitle: '反馈阀位',
        key: '3',
        ma: '%',
        ma4: '',
        ma8: '',
        ma12: '',
        ma16: '',
        ma20: '',
        ma161: '',
        ma121: '',
        ma81: '',
        ma41: ''
      }
    ]
  }

  export function getDeadBandColumns () {
    return [
      {
        title: '测试位置',
        dataIndex: 'deadLeftTitle',
        width: '8%',
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 0) {
            obj.attrs.rowSpan = 2
          } else {
            obj.attrs.rowSpan = 0
          }
          return obj
        }
      },
      {
        title: '%',
        dataIndex: 'testPostion',
        width: '5%'
      },
      {
        title: '0%',
        dataIndex: 'p0',
        width: '15%',
        scopedSlots: { customRender: 'p0' }
      },
      {
        title: '25%',
        dataIndex: 'p25',
        width: '15%',
        scopedSlots: { customRender: 'p25' }
      },
      {
        title: '50%',
        dataIndex: 'p50',
        width: '15%',
        scopedSlots: { customRender: 'p50' }
      },
      {
        title: '75%',
        dataIndex: 'p75',
        width: '15%',
        scopedSlots: { customRender: 'p75' }
      },
      {
        title: '100%',
        dataIndex: 'p100',
        width: '15%',
        scopedSlots: { customRender: 'p100' }
      },
      {
        title: '操作',
        width: '10%',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
    ]
  }

  export function getDeadBandData () {
    return [
      {
        key: '1',
        deadLeftTitle: '输入信号',
        testPostion: 'mA',
        p0: '',
        p100: '',
        p25: '',
        p50: '',
        p75: ''
      },
      {
        key: '2',
        testPostion: '%',
        p0: '',
        p100: '',
        p25: '',
        p50: '',
        p75: ''
      }
    ]
  }
