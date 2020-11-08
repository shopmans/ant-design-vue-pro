<template>
  <div>
    <a-card v-if="valveAB" title="阀门组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="阀盖">
            <a-descriptions-item>
              阀盖螺栓扭矩标准值:  {{ getValveCoverBoltTorqueUnitText(baseData.valve_cover_bolt_torque, baseData.valve_cover_bolt_torque_unit) }}<br>
              阀盖螺栓材质:  {{ getValveCoverBoltMaterialUnitNA(baseData.valve_cover_bolt_material) }}<br>
              阀盖螺栓尺寸:  {{ getValveSizeUnitTextNA(baseData.valve_cover_bolt_size, baseData.valve_cover_bolt_size_unit) }}<br>
              阀盖螺栓工具:  {{ getValveSizeUnitTextNA(baseData.valve_cover_bolt_tool, baseData.valve_cover_bolt_tool_unit) }}<br>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-descriptions title="阀座">
            <a-descriptions-item>
              阀座螺栓扭矩标准值: {{ getValveSeatBoltTorque() }}<br>
              阀座螺栓工具: {{ getValveSeatBoltTool() }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-divider style="margin-bottom: 32px"/>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions>
            <a-descriptions-item>
              工时(分钟): {{ assembleData.assemble_valve_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="23">
          <a-form-item label="组装内容">
            <a-textarea disabled rows="6" v-model="assembleValveContent" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>

    <br><br>

    <!-- 执行机构组装 -->
    <a-card v-if="actuatorAB" title="执行机构组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions title="阀盖">
            <a-descriptions-item>
              阀盖螺栓扭矩标准值:  {{ getValveCoverBoltTorqueUnitText(actuatorData.actu_cover_bolt_torque, actuatorData.actu_cover_bolt_torque_unit) }}<br>
              阀盖螺栓材质:  {{ getValveCoverBoltMaterialUnitNA(actuatorData.actu_cover_bolt_material) }}<br>
              阀盖螺栓尺寸:  {{ getValveSizeUnitNA(actuatorData.actu_cover_bolt_size, actuatorData.actu_cover_bolt_size_unit) }}<br>
              阀盖螺栓工具:  {{ getActuCoverBoltToolItemUnitTextNA(actuatorData.actu_cover_bolt_tool, actuatorData.actu_cover_bolt_tool_unit, actuatorData.actu_cover_bolt_tool_item) }}<br>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-divider style="margin-bottom: 32px"/>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions>
            <a-descriptions-item>
              气源压力测试: {{ getValveHydrostaticTestValueUnitText(assembleData.valve_assemble_air_pressed, assembleData.valve_assemble_air_pressed_unit) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-descriptions>
            <a-descriptions-item>
              气密性测试: {{ getYesNoSwitchUnit(assembleData.valve_assemble_air_tightness_is_success) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-descriptions>
            <a-descriptions-item>
              Bench Set测试: {{ getYesNoSwitchUnit(assembleData.valve_assemble_benchset_is_success) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-descriptions>
            <a-descriptions-item>
              工时(分钟): {{ assembleData.assemble_actuator_total_minute }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="23">
          <a-form-item label="组装内容">
            <a-textarea disabled rows="6" v-model="assembleActuatorContent" />
          </a-form-item>
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
import { queryStepDataOnlyread, getValveCoverBoltTorqueUnit, getValveCoverBoltMaterialUnit, getValveSizeUnit,
getValveSeatLeakTestUnit, getActuSpringSetPressureUnit, getActuCoverBoltToolItemUnit, getValveHydrostaticTestValueUnitText,
getYesNoSwitchUnit, getActuCoverBoltToolItemUnitTextNA, getValveCoverBoltTorqueUnitText, getValveSizeUnitTextNA } from '@/api/step'

export default {
  components: {
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.assembleData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.assembleData.uploads

    // 根据拆解的工时》0的结果决定组装显示内容
    queryStepDataOnlyread({ id: this.assembleData.flow_id, current_step: 'TearDown' }).then(res => {
      if (!res.result.step_data || res.result.step_data.length <= 0) {
        this.$message.info('拆解数据为空')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      this.tearDownData = JSON.parse(res.result.step_data[0].JSON)

      this.valveAB = this.tearDownData.teardown_valve_total_minute && this.tearDownData.teardown_valve_total_minute > 0
      this.actuatorAB = this.tearDownData.teardown_actuator_total_minute && this.tearDownData.teardown_actuator_total_minute > 0
      this.accessoryAB = this.tearDownData.teardown_accessory_total_minute && this.tearDownData.teardown_accessory_total_minute > 0

      queryStepDataOnlyread({ id: this.assembleData.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 2: // 阀
              if (this.valveAB) {
                this.baseData = JSON.parse(stepItem.JSON)
                this.assembleValveContent = this.assembleData.valve_assemble_content
              }
              break
            case 3: // 执行机构
              if (this.actuatorAB) {
                this.actuatorData = JSON.parse(stepItem.JSON)
                this.assembleActuatorContent = this.assembleData.actuator_assemble_content
              }
              break
            case 4: // 附件
              if (this.accessoryAB) {
                this.accessorData = JSON.parse(stepItem.JSON)
                this.assembleAccessoryContent = this.assembleData.accessory_assemble_content
              }
              break
          }
        })
      })
    })
  },
  data () {
    return {
      assembleData: {},
      accessoryAB: false,
      actuatorAB: false,
      valveAB: false,
      flowID: '',
      currentStep: '',
      baseData: {},
      actuatorData: {},
      accessorData: {},
      assembleValveContent: '',
      assembleActuatorContent: '',
      assembleAccessoryContent: ''
    }
  },
  methods: {
    getValveCoverBoltTorqueUnit,
    getValveCoverBoltMaterialUnit,
    getValveSizeUnit,
    getValveSeatLeakTestUnit,
    getActuSpringSetPressureUnit,
    getActuCoverBoltToolItemUnit,
    getValveHydrostaticTestValueUnitText,
    getYesNoSwitchUnit,
    getActuCoverBoltToolItemUnitTextNA,
    getValveCoverBoltTorqueUnitText,
    getValveSizeUnitTextNA,
    getValveSeatBoltTorque () {
        if (!this.baseData.valve_seat_bolt_torque || this.baseData.valve_seat_bolt_torque.length <= 0) {
          return 'N/A'
        }
        return this.baseData.valve_seat_bolt_torque + ' ' + getValveCoverBoltTorqueUnit(this.baseData.valve_seat_bolt_torque_unit)
      },
      getValveSeatBoltTool () {
        if (!this.baseData.valve_seat_bolt_tool || this.baseData.valve_seat_bolt_tool.length <= 0) {
          return 'N/A'
        }
        return this.baseData.valve_seat_bolt_tool + ' ' + getValveSizeUnit(this.baseData.valve_seat_bolt_tool_unit)
      },
      getValveCoverBoltTorqueUnitTextNA (val, unitValue) {
        if (val && val.length > 0) {
          return val + ' ' + getValveCoverBoltTorqueUnit(unitValue)
        }

        return 'N/A'
      },
      getValveCoverBoltMaterialUnitNA (val) {
        if (val && val.length > 0) {
          return getValveCoverBoltMaterialUnit(val)
        }

        return 'N/A'
      },
      getValveSizeUnitNA (val, unitValue) {
        if (val && val.length > 0) {
          return val + ' ' + getValveSizeUnit(unitValue)
        }

        return 'N/A'
      }
  }
}
</script>

<style>

</style>
