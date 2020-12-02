<template>
  <div>
    <a-card :bordered="false" title="硬件检查">
      <a-descriptions :column="4">
        <a-descriptions-item label="定位器铭牌是否齐全">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_nameplate) }}</a-descriptions-item>
        <a-descriptions-item label="定位器等级标签是否齐全">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_grade_label) }}</a-descriptions-item>
        <a-descriptions-item label="定位器外观是否损坏">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_exterior) }}</a-descriptions-item>
        <a-descriptions-item label="定位器是否存在污迹">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_smudge) }}</a-descriptions-item>
        <a-descriptions-item label="压力表量程">{{ getPressureGaugeRangeUnit(PreRepairTestData.hardware_check_locator_pressure_gauge_range) }}</a-descriptions-item>
        <a-descriptions-item label="压力表是否损坏">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_pressure_gauge_yesno) }}</a-descriptions-item>
        <a-descriptions-item label="放大器类型">{{ getABCSwitchUnit(PreRepairTestData.hardware_check_locator_amplifier_type) }}</a-descriptions-item>
        <a-descriptions-item label="接线端子电压 @4mA">{{ PreRepairTestData.hardware_check_locator_terminal_voltage_4ma }}VDC</a-descriptions-item>
        <a-descriptions-item label="接线端子电压 @20mA">{{ PreRepairTestData.hardware_check_locator_terminal_voltage_20ma }}VDC</a-descriptions-item>
        <a-descriptions-item label="PWB生产代码">{{ PreRepairTestData.hardware_check_locator_pwb_production_code }}</a-descriptions-item>
        <a-descriptions-item label="I/P生产代码">{{ PreRepairTestData.hardware_check_locator_ip_production_code }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="电气检查">
      <a-descriptions :column="4">
        <a-descriptions-item label="固件版本号">{{ PreRepairTestData.hardware_check_locator_fireware_ver }}</a-descriptions-item>
        <a-descriptions-item label="HART位号">{{ PreRepairTestData.hardware_check_locator_hart_tag }}</a-descriptions-item>
        <a-descriptions-item label="仪表序列号">{{ PreRepairTestData.hardware_check_locator_instrument_serial }}</a-descriptions-item>
        <a-descriptions-item label="收到时控制模式">{{ getLocatorReceivedControlModeUnit(PreRepairTestData.hardware_check_locator_received_control_mode) }}</a-descriptions-item>
        <a-descriptions-item label="仪表模式">{{ getLocatorInstrumentModelUnit(PreRepairTestData.hardware_check_locator_instrument_model) }}</a-descriptions-item>
        <a-descriptions-item label="执行机构类型">{{ getLocatorActuatorTypeUnit(PreRepairTestData.hardware_check_locator_actuator_type) }}</a-descriptions-item>
        <a-descriptions-item label="零信号状态">{{ PreRepairTestData.hardware_check_locator_zero_signal_state }}</a-descriptions-item>
        <a-descriptions-item label="阀门类型">{{ PreRepairTestData.hardware_check_locator_valve_type }}</a-descriptions-item>
        <a-descriptions-item label="行程/压力选择">{{ PreRepairTestData.hardware_check_locator_stroke_pressure_selection }}</a-descriptions-item>
        <a-descriptions-item label="行程传感器方向">{{ PreRepairTestData.hardware_check_locator_stroke_sensor_direction }}</a-descriptions-item>
        <a-descriptions-item label="输入特性">{{ PreRepairTestData.hardware_check_locator_input_characteristics }}</a-descriptions-item>
        <a-descriptions-item label="增益设定">{{ PreRepairTestData.hardware_check_locator_gain_setting }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="拆卸检查组件">
      <a-descriptions :column="2" title="接线盒">
        <a-descriptions-item label="接线端子电阻">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_terminal_resistance) }}</a-descriptions-item>
        <a-descriptions-item label="是否存在水迹或灰尘">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_terminal_resistance_water) }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2" title="I/P">
        <a-descriptions-item label="动作是否正常">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_ip_active) }}</a-descriptions-item>
        <a-descriptions-item label="是否存在水迹或灰尘">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_ip_active_water) }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2" title="Relay">
        <a-descriptions-item label="动作是否正常">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_relay_active) }}</a-descriptions-item>
        <a-descriptions-item label="是否存在水迹或灰尘">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_relay_active_water) }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2" title="PWB">
        <a-descriptions-item label="动作是否正常">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_pwb_active) }}</a-descriptions-item>
        <a-descriptions-item label="是否存在水迹或灰尘">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_pwb_active_water) }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions :column="2" title="模块基座和后壳体">
        <a-descriptions-item label="密封件是否正常">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_base_shell_seal) }}</a-descriptions-item>
        <a-descriptions-item label="是否存在水迹或灰尘">{{ getYesNoSwitchUnit(PreRepairTestData.hardware_check_locator_base_shell_seal_water) }}</a-descriptions-item>
        <a-descriptions-item label="气源接口是否正常">{{ getNESwitchUnit(PreRepairTestData.hardware_check_locator_air_connection) }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="工时">
      <a-descriptions :column="4">
        <a-descriptions-item label="工时">{{ PreRepairTestData.localtor_intofactorycheck_total_minute }}</a-descriptions-item>
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
import { getYesNoSwitchUnit, getABCSwitchUnit, getLocatorActuatorTypeUnit, getLocatorInstrumentModelUnit, getLocatorReceivedControlModeUnit,
getNESwitchUnit, getPressureGaugeRangeUnit } from '@/api/step'

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
            valveData: {}
        }
    },
    methods: {
      getYesNoSwitchUnit,
      getABCSwitchUnit,
      getLocatorActuatorTypeUnit,
      getLocatorInstrumentModelUnit,
      getLocatorReceivedControlModeUnit,
      getNESwitchUnit,
      getPressureGaugeRangeUnit
    },
    mounted () {
      if (this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.info('没有执行数据')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData

      this.PreRepairTestData = JSON.parse(editData.step_data[0].JSON)
      if (this.PreRepairTestData.uploads) {
          this.$refs.uploadImgRead.imgFileList = this.PreRepairTestData.uploads
      }
      // 获取引用数据
    //   getReferencePreRepairTestData({ id: editData.flow_id, current_step: '(start)' }).then(res => {
    //     const baseInfo = res.result.step_data
    //     baseInfo.forEach(item => {
    //       switch (item.DataNum) {
    //         case 2: { // 阀维修
    //           this.valveData = JSON.parse(item.JSON)
    //           this.SeatLeakTest = true
    //           break
    //         }
    //         case 3: { // 执行机构维修
    //           this.ActuatorLeakTest = true
    //           break
    //         }
    //         case 4: { // 附件
    //           this.AccessoryTest = true
    //           break
    //         }
    //       }
    //     })
    //     this.PreRepairTestData = JSON.parse(editData.step_data[0].JSON)
    //     this.$refs.uploadImgRead.imgFileList = this.PreRepairTestData.uploads
    // })
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
