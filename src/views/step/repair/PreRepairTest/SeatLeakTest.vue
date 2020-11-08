<template>
  <div>
    <a-card title="阀座泄漏测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="阀座泄漏等级">{{ getValveLeakLevel(valveData.valve_leak_level) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(valveData.valve_leak_test_medium) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(valveData.valve_leak_test_std_pressed, valveData.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试时间">{{ getValveHydrostaticTestTimeUnitText(valveData.valve_leak_test_time, valveData.valve_leak_test_time_unit) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试标准值">{{ getValveSeatLeakTestUnitText(valveData.valve_leak_test_value, valveData.valve_leak_test_value_unit) }}</a-descriptions-item>
      </a-descriptions>
      <a-divider></a-divider>
      <!-- 行1 -->
      <a-row class="form-row" :gutter="36">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">实际测试压力</div>
            <a-input
              style="width:200px;"
              :min="0"
              v-decorator="[
                'seat_leak_test_real_pressed',
                {rules: []}
              ]">
              <a-select v-decorator="[ 'seat_leak_test_real_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  PSI
                </a-select-option>
                <a-select-option value="2">
                  BAR
                </a-select-option>
                <a-select-option value="3">
                  MPa
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">实际测试时间(分钟)</div>
            <a-input-number
              style="width:200px;"
              :min="0"
              v-decorator="[
                'seat_leak_test_test_real_time',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">测试实际值</div>
            <a-input v-decorator="[ 'seat_leak_test_real_value', {} ]">
              <a-select v-decorator="[ 'seat_leak_test_real_value_unit', {rules: [{ message: '请选择阀座泄漏测试标准'}]} ]" slot="addonAfter" style="width: 120px" >
                <a-select-option value="1">SCFH</a-select-option>
                <a-select-option value="2">ml/min</a-select-option>
                <a-select-option value="3">bubbles/min</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">是否合格</div>
            <a-radio-group v-decorator="['seat_leak_test_is_success', {} ]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <!-- 行2 -->
      <a-row class="form-row" :gutter="36">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">工时(分钟)</div>
            <a-input-number
              :min="0"
              style="width:100%;"
              v-decorator="[
                'seat_leak_test_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <br><br>
  </div>
</template>

<script>
import { getValveLeakLevel, getValveSeatLeakTestUnitText, getValveTestMediumUnit, getValveHydrostaticTestValueUnitText,
getValveHydrostaticTestTimeUnitText } from '@/api/step'

export default {
  props: {
    valveData: {
      type: Object,
      default: null
    }
  },
  methods: {
    getValveLeakLevel,
    getValveSeatLeakTestUnitText,
    getValveTestMediumUnit,
    getValveHydrostaticTestValueUnitText,
    getValveHydrostaticTestTimeUnitText
  }
}
</script>

<style>

</style>
