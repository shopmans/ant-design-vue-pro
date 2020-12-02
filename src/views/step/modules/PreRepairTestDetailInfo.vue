<template>
  <div>
    <a-card :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
        <a-descriptions-item label="总工时">待汇总</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="阀座泄漏测试" v-if="SeatLeakTest">
        <a-card :bordered="false">
          <a-descriptions :column="4">
            <a-descriptions-item label="阀座泄漏等级">{{ getValveLeakLevel(valveData.valve_leak_level) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(valveData.valve_leak_test_medium) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(valveData.valve_leak_test_std_pressed, valveData.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试时间">{{ getValveHydrostaticTestTimeUnitText(valveData.valve_leak_test_time, valveData.valve_leak_test_time_unit) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试标准值">{{ getValveSeatLeakTestUnitText(valveData.valve_leak_test_value, valveData.valve_leak_test_value_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider></a-divider>
          <a-descriptions :column="4">
            <a-descriptions-item label="实际测试压力">
              {{ getValveHydrostaticTestValueUnitText(PreRepairTestData.seat_leak_test_real_pressed, PreRepairTestData.seat_leak_test_real_pressed_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="实际测试时间(分钟)">
              {{ PreRepairTestData.seat_leak_test_test_real_time }}
            </a-descriptions-item>
            <a-descriptions-item label="测试实际值">
              {{ getValveSeatLeakTestUnitText(PreRepairTestData.seat_leak_test_real_value, PreRepairTestData.seat_leak_test_real_value_unit) }}
            </a-descriptions-item>
            <a-descriptions-item label="是否合格">
              <div v-if="PreRepairTestData.seat_leak_test_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.seat_leak_test_is_success===1" class="green-circle"></div>
            </a-descriptions-item>
            <a-descriptions-item label="阀座泄漏实际测试介质">{{ getValveTestMediumUnit(PreRepairTestData.seat_leak_test_real_medium) }}</a-descriptions-item>
            <a-descriptions-item label="见证人">{{ PreRepairTestData.seat_leak_test_witness }}</a-descriptions-item>
          </a-descriptions>
          <a-divider></a-divider>
          <a-descriptions title="">
            <a-descriptions-item label="人工工时(分钟)">{{ PreRepairTestData.seat_leak_test_total_minute }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="2" tab="执行机构泄漏测试" v-if="ActuatorLeakTest">
        <a-card :bordered="false">
          <a-descriptions :column="4">
            <a-descriptions-item label="行程测试是否合格">
              <div v-if="PreRepairTestData.actuator_leak_test_travel_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.actuator_leak_test_travel_is_success===1" class="green-circle"></div>
            </a-descriptions-item>
            <a-descriptions-item label="气密性测试是否合格">
              <div v-if="PreRepairTestData.actuator_leak_test_air_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.actuator_leak_test_air_is_success===1" class="green-circle"></div>
            </a-descriptions-item>
            <a-descriptions-item label="Bench Set">
              <div v-if="PreRepairTestData.actuator_leak_test_benchset_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.actuator_leak_test_benchset_is_success===1" class="green-circle"></div>
            </a-descriptions-item>
            <a-descriptions-item label="是否合格">
              <div v-if="PreRepairTestData.actuator_leak_test_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.actuator_leak_test_is_success===1" class="green-circle"></div>
            </a-descriptions-item>
          </a-descriptions>
          <a-divider></a-divider>
          <a-descriptions title="">
            <a-descriptions-item label="工时(分钟)">{{ PreRepairTestData.actuator_leak_test_total_minute }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="附件功能测试" v-if="AccessoryTest">
        <a-card :bordered="false">
          <a-descriptions title="">
            <a-descriptions-item label="定位器">
              <div v-if="PreRepairTestData.accessory_locator_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_locator_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="过滤减压阀">
              <div v-if="PreRepairTestData.accessory_test_filter_reducing_valve_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_filter_reducing_valve_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="位置开关">
              <div v-if="PreRepairTestData.accessory_test_position_switch_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_position_switch_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="电磁阀">
              <div v-if="PreRepairTestData.accessory_test_elec_valve_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_elec_valve_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="气动放大器">
              <div v-if="PreRepairTestData.accessory_test_pneumatic_amplifier_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_pneumatic_amplifier_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="保位阀">
              <div v-if="PreRepairTestData.accessory_test_retaining_valve_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_retaining_valve_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

            <a-descriptions-item label="其它">
              <div v-if="PreRepairTestData.accessory_test_other_is_success===2" class="red-circle"></div>
              <div v-if="PreRepairTestData.accessory_test_other_is_success===1" class="green-circle"></div>
            </a-descriptions-item>

          </a-descriptions>
        </a-card>
      </a-tab-pane>
    </a-tabs>
    <br>
    <!-- 结论 -->
    <a-card title="结论">
      结论:
      <template v-if="PreRepairTestData.prerepair_content && PreRepairTestData.prerepair_content === 1">
        <a-badge>合格</a-badge>
      </template>
      <template v-else>
        <a-badge>不合格</a-badge>
      </template>
    </a-card>
    <br>
    <!-- 备注 -->
    <a-card title="备注">
      <a-textarea disabled :rows="4" :value="PreRepairTestData.prerepair_memo" />
    </a-card>
    <br>
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import { getReferencePreRepairTestData } from '@/api/preRepairTest'
import UploadImgRead from '../modules/UploadImgRead'
import { getValveLeakLevel, getValveSeatLeakTestUnitText, getValveTestMediumUnit, getValveHydrostaticTestValueUnitText,
getValveHydrostaticTestTimeUnitText, getStepUser, formatDateYMD } from '@/api/step'

export default {
    components: {
        UploadImgRead
    },
    data () {
        return {
            SeatLeakTest: false,
            ActuatorLeakTest: false,
            AccessoryTest: false,
            PreRepairTestData: {},
            valveData: {},
            stepUser: '',
            stepDoneDate: ''
        }
    },
    methods: {
      getValveLeakLevel,
      getValveSeatLeakTestUnitText,
      getValveTestMediumUnit,
      getValveHydrostaticTestValueUnitText,
      getValveHydrostaticTestTimeUnitText
    },
    mounted () {
      if (this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.info('没有执行数据')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData
      this.stepUser = getStepUser(editData.users)
      this.stepDoneDate = formatDateYMD(editData.step_done_date)

      // 获取引用数据
      getReferencePreRepairTestData({ id: editData.flow_id, current_step: '(start)' }).then(res => {
        const baseInfo = res.result.step_data
        baseInfo.forEach(item => {
          switch (item.DataNum) {
            case 2: { // 阀维修
              this.valveData = JSON.parse(item.JSON)
              this.SeatLeakTest = true
              break
            }
            case 3: { // 执行机构维修
              this.ActuatorLeakTest = true
              break
            }
            case 4: { // 附件
              this.AccessoryTest = true
              break
            }
          }
        })
        this.PreRepairTestData = JSON.parse(editData.step_data[0].JSON)
        this.$refs.uploadImgRead.imgFileList = this.PreRepairTestData.uploads
    })
  }
}
</script>

<style scoped>
    .red-circle{
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }
    .green-circle{
        width: 10px;
        height: 10px;
        background-color: greenyellow;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }
</style>
