<template>
  <div>
    <a-card :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
        <a-descriptions-item label="总工时">{{ stepData.work_time_all }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <template v-if="valveControlModel === 2">
      <a-card title="开关型" :headStyle="{fontWeight:'bold'}">
        <!-- 开关型 -->
        <a-descriptions title="">
          <a-descriptions-item label="">
            <template v-if="adjustData.adjust_on_off_open_close && adjustData.adjust_on_off_open_close[0] === '1'">
              <a-badge status="success" :offset="[-1,5]" text="开位正常"></a-badge>
            </template>
            <template v-else>
              <a-badge>开位正常</a-badge>
            </template>
          </a-descriptions-item>
          <a-descriptions-item label="">
            <template v-if="adjustData.adjust_on_off_open_close && adjustData.adjust_on_off_open_close[0] === '2'">
              <a-badge status="success" :offset="[-1,5]" text="关位正常"></a-badge>
            </template>
            <template v-else>
              <a-badge>关位正常</a-badge>
            </template>
          </a-descriptions-item>
        </a-descriptions>
        <!-- 结论 -->
        结论:
        <template v-if="adjustData.adjust_control_valve_conclustion && adjustData.adjust_control_valve_conclustion === 1">
          <a-badge>合格</a-badge>
        </template>
        <template v-else>
          <a-badge>不合格</a-badge>
        </template>
      </a-card>
      <br><br>
    </template>

    <template v-if="valveControlModel === 1">
      <!-- 调节性 -->
      <a-card title="定位器" :headStyle="{fontWeight:'bold'}">
        <!-- 调节性 -->
        <a-table :columns="inputSignalColumns" :dataSource="inputSignalData" :pagination="false" bordered>
        </a-table>
      </a-card>

      <br><br>

      <!-- 死区 -->
      <a-card title="死区" :headStyle="{fontWeight:'bold'}">
        <a-table :columns="deadBandColumns" :dataSource="deadBandData" :pagination="false" bordered>
          <template slot="title">
            死区
          </template>
        </a-table>
        <br>
        <a-descriptions :column="4">
          <a-descriptions-item label="全开到全关(s)">
            {{ adjustData.adjust_deadband_open_to_close }}
          </a-descriptions-item>
          <a-descriptions-item label="全关到全开(s)">
            {{ adjustData.adjust_deadband_close_to_open }}
          </a-descriptions-item>
          <a-descriptions-item label="线性">
            {{ adjustData.adjust_deadband_linearity }}
          </a-descriptions-item>
          <a-descriptions-item label="回差">
            {{ adjustData.adjust_deadband_hysteresis }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <br><br>

      <!-- 电磁阀 -->
      <a-card title="电磁阀" :headStyle="{fontWeight:'bold'}">
        <a-descriptions :column="4">
          <a-descriptions-item label="动作">
            {{ adjustData.adjust_solenoid_valve_active }}
          </a-descriptions-item>
          <a-descriptions-item label="时间(秒)">
            {{ adjustData.adjust_solenoid_valve_time }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <br><br>

      <!-- 保位/切换阀 -->
      <a-card title="保位/切换阀" :headStyle="{fontWeight:'bold'}">
        <a-descriptions :column="4">
          <a-descriptions-item label="动作">
            {{ adjustData.adjust_lockup_active }}
          </a-descriptions-item>
          <a-descriptions-item label="设定点">
            {{ getValveHydrostaticTestValueUnitText(adjustData.adjust_lockup_time, adjustData.adjust_lockup_time_unit) }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <br><br>

      <!-- 结论 -->
      <a-card title="结论" :headStyle="{fontWeight:'bold'}">
        <template v-if="adjustData.adjust_conclustion && adjustData.adjust_conclustion === 1">
          <a-badge>成功</a-badge>
        </template>
        <template v-else>
          <a-badge>失败</a-badge>
        </template>
      </a-card>

      <br><br>

      <!-- 备注 -->
      <a-card title="备注" :headStyle="{fontWeight:'bold'}">
        <a-textarea disabled :rows="5" v-model="adjustMemo" />
      </a-card>

      <br><br>

      <a-card title="工时(min)" :headStyle="{fontWeight:'bold'}">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-descriptions title="">
              <a-descriptions-item>
                {{ adjustData.adjust_total_minute }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
      </a-card>

      <br><br>
      <a-card title="适用" :headStyle="{fontWeight:'bold'}">
        <a-descriptions :column="4">
          <a-descriptions-item label="不适用" v-if="adjustData.not_applicable">
            是
          </a-descriptions-item>
          <a-descriptions-item label="不适用" v-if="!adjustData.not_applicable">
            否
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </template>

    <br><br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
  import { getValveHydrostaticTestValueUnitText, queryStepData, getStepUser, formatDateYMD } from '@/api/step'

  const inputSignalColumns = [
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
      title: '4 mA',
      dataIndex: 'ma4',
      scopedSlots: { customRender: 'ma4' }
    },
    {
      title: '8 mA',
      dataIndex: 'ma8',
      scopedSlots: { customRender: 'ma8' }
    },
    {
      title: '12 mA',
      dataIndex: 'ma12',
      scopedSlots: { customRender: 'ma12' }
    },
    {
      title: '16 mA',
      dataIndex: 'ma16',
      scopedSlots: { customRender: 'ma16' }
    },
    {
      title: '20 mA',
      dataIndex: 'ma20',
      scopedSlots: { customRender: 'ma20' }
    },
    {
      title: '16 mA',
      dataIndex: 'ma161',
      scopedSlots: { customRender: 'ma161' }
    },
    {
      title: '12 mA',
      dataIndex: 'ma121',
      scopedSlots: { customRender: 'ma121' }
    },
    {
      title: '8 mA',
      dataIndex: 'ma81',
      scopedSlots: { customRender: 'ma81' }
    },
    {
      title: '4 mA',
      dataIndex: 'ma41',
      scopedSlots: { customRender: 'ma41' }
    }
  ]

  const deadBandColumns = [
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
      scopedSlots: { customRender: 'p0' }
    },
    {
      title: '100%',
      dataIndex: 'p100',
      scopedSlots: { customRender: 'p100' }
    },
    {
      title: '25%',
      dataIndex: 'p25',
      scopedSlots: { customRender: 'p25' }
    },
    {
      title: '50%',
      dataIndex: 'p50',
      scopedSlots: { customRender: 'p50' }
    },
    {
      title: '75%',
      dataIndex: 'p75',
      scopedSlots: { customRender: 'p75' }
    }
  ]

  const inputSignalData = [
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

  const deadBandData = [
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

export default {
  components: {
    UploadImgRead
  },
  methods: {
    getValveHydrostaticTestValueUnitText
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.stepData = this.$store.state.editStepData.stepEditData
    const flowId = this.$store.state.editStepData.stepEditData.flow_id
    this.adjustData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.adjustData.uploads
    this.inputSignalData = this.adjustData.inputSignalData
    this.feedBackData = this.adjustData.feedBackData
    this.deadBandData = this.adjustData.deadBandData
    this.adjustControlValveConclustion = this.adjustData.adjust_control_valve_conclustion
    this.adjustConclustion = this.adjustData.adjust_conclustion
    this.adjustMemo = this.adjustData.adjust_memo
    this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
    this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

    queryStepData({ id: flowId, current_step: '(start)' }).then(res => {
      res.result.step_data.forEach(stepItem => {
        switch (stepItem.DataNum) {
          case 1: // baseInfo
            const baseData = JSON.parse(stepItem.JSON)
            // 开关阀、调节阀数据
            if (baseData.control_model === '1') { // 调节阀
              this.valveControlModel = 1
              return
            }
            if (baseData.control_model === '2') { // 开关阀
              this.valveControlModel = 2
              return
            }

            this.$message.info('不能识别的阀类型(开关阀、调节阀)')
        }
      })
    })
  },
  data () {
      return {
        adjustData: {},
        inputSignalColumns: inputSignalColumns,
        inputSignalData: inputSignalData,
        deadBandColumns: deadBandColumns,
        deadBandData: deadBandData,
        adjustControlValveConclustion: '',
        adjustConclustion: '',
        adjustMemo: '',
        valveControlModel: 0,
        stepUser: '',
        stepDoneDate: '',
        stepData: {}
      }
    }
}
</script>

<style>

</style>
