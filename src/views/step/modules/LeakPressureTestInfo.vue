<template>
  <div>
    <a-card title="测漏试压" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row :gutter="16">
        <a-col :span="9">
          <a-descriptions title="阀痤测试" :column="1">
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
            <a-descriptions-item label="">
              {{ }}
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
          </a-descriptions>
          备注
          <a-textarea :rows="6" :value="leakPressureData.leak_test_memo" :disabled="true"></a-textarea>
        </a-col>
        <a-col :span="9">
          <a-descriptions title="水压测试" :column="1">
            <a-descriptions-item label="水压测试标准">{{ getValveTestStdUnit(baseValveData.valve_test_std) }}</a-descriptions-item>
            <a-descriptions-item label="水压测试介质">
              {{ getValveTestMediumUnit(baseValveData.valve_test_medium) }}
            </a-descriptions-item>
            <a-descriptions-item label="水压测试标准值">
              {{ getValveHydrostaticTestValueUnitText(baseValveData.valve_hydrostatic_test_value, baseValveData.valve_hydrostatic_test_value_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="水压压力等级">
              {{ getValveWaterPressureLevelUnit(baseValveData.valve_pressure_level) }}
            </a-descriptions-item>
            <a-descriptions-item label="水压测试时间">
              {{ baseValveData.valve_hydrostatic_test_time ? baseValveData.valve_hydrostatic_test_time + " " + getValveHydrostaticTestTimeUnit(baseValveData.valve_hydrostatic_test_time_unit) : "" }}
            </a-descriptions-item>
            <a-descriptions-item label="">
              {{ }}
            </a-descriptions-item>
            <a-descriptions-item label="水压实际测试压力">
              {{ getValveHydrostaticTestValueUnitText(leakPressureData.leak_water_test_real_pressed, leakPressureData.leak_water_test_real_pressed_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试时间(分钟)">
              {{ leakPressureData.leak_pressure_water_test_real_time }}
            </a-descriptions-item>
            <a-descriptions-item label="水压测试结论">
              {{ getYesNoSwitchUnit(leakPressureData.leak_pressure_water_test_content) }}
            </a-descriptions-item>
          </a-descriptions>
          备注
          <a-textarea :rows="6" :value="leakPressureData.leak_pressure_water_test_memo" :disabled="true"></a-textarea>
        </a-col>
      </a-row>
      <br>
      <a-row :gutter="16">
        <a-col :span="18">
          结论
          <a-textarea :rows="6" :value="leakPressureData.leak_pressure_test_content" :disabled="true"></a-textarea>
        </a-col>
      </a-row>
      <br>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="工时(分钟)">
            <a-descriptions-item>
              {{ leakPressureData.leak_pressure_test_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>

    <br><br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
import { queryStepDataOnlyread, getValveLeakLevel, getValveWaterPressureLevelUnit, getValveHydrostaticTestValueUnitText,
getValveLeakTestValueUnit, getValveHydrostaticTestTimeUnit, getValveTestMediumUnit,
getValveSeatLeakTestUnitText, getValveTestStdUnit, getYesNoSwitchUnit } from '@/api/step'

export default {
  components: {
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.leakPressureData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.leakPressureData.uploads

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
    getYesNoSwitchUnit
  },
  data () {
      return {
        baseValveData: {},
        leakPressureData: {}
      }
    }
}
</script>

<style>

</style>
