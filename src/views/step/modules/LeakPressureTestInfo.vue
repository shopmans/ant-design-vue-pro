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
    <a-card title="测漏试压" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row :gutter="16">
        <a-col :span="9">
          <a-descriptions title="阀痤测试" :column="1">
            <a-descriptions-item label="泄漏测试标准">{{ baseValveData.valve_seat_leak_test }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(baseValveData.valve_leak_test_medium) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(baseValveData.valve_leak_test_std_pressed, baseValveData.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏等级">
              {{ getValveLeakLevel(baseValveData.valve_leak_level) }}
            </a-descriptions-item>
            <a-descriptions-item label="泄漏测试标准值">
              {{ baseValveData.valve_leak_test_value ? baseValveData.valve_leak_test_value + " " + getValveLeakTestValueUnit(baseValveData.valve_leak_test_value_unit) : "" }}
            </a-descriptions-item>
            <a-descriptions-item label="泄漏测试时间">
              {{ baseValveData.valve_leak_test_time ? baseValveData.valve_leak_test_time + " " + getValveHydrostaticTestTimeUnit(baseValveData.valve_leak_test_time_unit) : "" }}
            </a-descriptions-item>
            <a-descriptions-item label="泄漏实际测试压力">
              {{ getValveHydrostaticTestValueUnitText(leakPressureData.leak_test_real_test_pressed, leakPressureData.leak_test_real_test_pressed_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试时间(分钟)">
              {{ leakPressureData.leak_pressure_test_real_time }}
            </a-descriptions-item>
            <a-descriptions-item label="泄漏测试实际值">
              {{ getValveSeatLeakTestUnitText(leakPressureData.leak_test_real_valve, leakPressureData.leak_test_real_valve_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试介质">
              {{ getValveTestMediumUnit(leakPressureData.leak_test_real_test_medium) }}
            </a-descriptions-item>
          </a-descriptions>
          备注
          <a-textarea :rows="6" :value="leakPressureData.leak_test_memo" :disabled="true"></a-textarea>
        </a-col>
        <a-col :span="9">
          <a-descriptions title="水压测试" :column="1">
            <a-descriptions-item label="水压测试标准">{{ baseValveData.valve_test_std }}</a-descriptions-item>
            <a-descriptions-item label="水压测试介质">
              {{ getValveTestMediumUnit(baseValveData.valve_test_medium) }}
            </a-descriptions-item>
            <a-descriptions-item label="水压测试标准值">
              {{ getValveHydrostaticTestValueUnitText(baseValveData.valve_hydrostatic_test_value, baseValveData.valve_hydrostatic_test_value_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="水压压力等级">
              {{ baseValveData.valve_pressure_level }}
            </a-descriptions-item>
            <a-descriptions-item label="水压测试时间">
              {{ baseValveData.valve_hydrostatic_test_time ? baseValveData.valve_hydrostatic_test_time + " " + getValveHydrostaticTestTimeUnit(baseValveData.valve_hydrostatic_test_time_unit) : "" }}
            </a-descriptions-item>
            <a-descriptions-item label="水压实际测试压力">
              {{ getValveHydrostaticTestValueUnitText(leakPressureData.leak_water_test_real_pressed, leakPressureData.leak_water_test_real_pressed_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试时间(分钟)">
              {{ leakPressureData.leak_pressure_water_test_real_time }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试介质">
              {{ getValveTestMediumUnit(leakPressureData.leak_pressure_water_real_test_medium) }}
            </a-descriptions-item>
            <a-descriptions-item label="">
              {{ }}
            </a-descriptions-item>
            <a-descriptions-item label="">
              {{ }}
            </a-descriptions-item>
          </a-descriptions>
          备注
          <a-textarea :rows="6" :value="leakPressureData.leak_pressure_water_test_memo" :disabled="true"></a-textarea>
        </a-col>
      </a-row>
      <br>
      <a-row :gutter="16">
        <a-descriptions title="结论">
          <a-descriptions-item>
            <template v-if="leakPressureData.leak_pressure_test_content && leakPressureData.leak_pressure_test_content === 1">
              <a-badge>合格</a-badge>
            </template>
            <template v-else>
              <a-badge>不合格</a-badge>
            </template>
          </a-descriptions-item>
        </a-descriptions>
        <!-- <a-col :span="18">
          结论
          <a-textarea :rows="6" :value="leakPressureData.leak_pressure_test_content" :disabled="true"></a-textarea>
        </a-col> -->
      </a-row>
      <br>
      <a-row :gutter="16">
        <a-descriptions title="工时(min)">
          <a-descriptions-item>
            {{ leakPressureData.leak_pressure_test_total_minute }}
          </a-descriptions-item>
        </a-descriptions>
      </a-row>
    </a-card>

    <br>
    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="leakPressureData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!leakPressureData.not_applicable">
          否
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
import { queryStepDataOnlyread, getValveLeakLevel, getValveWaterPressureLevelUnit, getValveHydrostaticTestValueUnitText,
getValveLeakTestValueUnit, getValveHydrostaticTestTimeUnit, getValveTestMediumUnit,
getValveSeatLeakTestUnitText, getValveTestStdUnit, getYesNoSwitchUnit, getValveSeatLeakTestUnit,
getStepUser, formatDateYMD } from '@/api/step'

export default {
  components: {
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.stepData = this.$store.state.editStepData.stepEditData
    this.leakPressureData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.leakPressureData.uploads
    this.stepUser = getStepUser(this.$store.state.editStepData.stepEditData.users)
    this.stepDoneDate = formatDateYMD(this.$store.state.editStepData.stepEditData.step_done_date)

    queryStepDataOnlyread({ id: this.leakPressureData.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 2: // 阀
              this.baseValveData = JSON.parse(stepItem.JSON)
              break
          }
        })
      })
  },
  methods: {
    getValveLeakLevel,
    getValveWaterPressureLevelUnit,
    getValveHydrostaticTestValueUnitText,
    getValveLeakTestValueUnit,
    getValveHydrostaticTestTimeUnit,
    getValveTestMediumUnit,
    getValveSeatLeakTestUnitText,
    getValveTestStdUnit,
    getYesNoSwitchUnit,
    getValveSeatLeakTestUnit
  },
  data () {
      return {
        baseValveData: {},
        leakPressureData: {},
        stepUser: '',
        stepDoneDate: '',
        stepData: {}
      }
    }
}
</script>

<style>

</style>
