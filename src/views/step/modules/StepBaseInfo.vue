<template>
  <div>
    <a-card v-if="!showBaseInfo" :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-tabs default-active-key="1" >
      <template v-if="showBaseInfo">
        <a-tab-pane key="1" tab="工单基本信息" :forceRender="true">
          <a-card :bordered="false">
            <a-descriptions title="基本信息">
              <a-descriptions-item label="工程编号">{{ project.serial }}</a-descriptions-item>
              <a-descriptions-item label="工单编号">{{ baseInfo.work_order_serial }}</a-descriptions-item>
              <a-descriptions-item label="最终用户">{{ baseInfo.base_inf_finaluser }}</a-descriptions-item>
              <a-descriptions-item label="合同编号">{{ project.contract_serial }}</a-descriptions-item>
              <a-descriptions-item label="位号">{{ baseInfo.tag }}</a-descriptions-item>
              <a-descriptions-item label="预估检测费用">{{ formatContractTotal(baseInfo.estimate) }}</a-descriptions-item>
              <a-descriptions-item label="返厂部件">{{ repairPartComboboxText(baseInfo.return_part) }}</a-descriptions-item>
              <a-descriptions-item label="维修部件">{{ repairPartComboboxText(baseInfo.repair_part) }}</a-descriptions-item>
              <a-descriptions-item label="现场拆装">{{ disassemblyComboboxText(baseInfo.disassembly) }}</a-descriptions-item>
              <a-descriptions-item label="出入厂单据号码">{{ baseInfo.receipt_number }}</a-descriptions-item>
              <a-descriptions-item label="收货日期">{{ baseInfo.receipt_date ? moment(baseInfo.receipt_date).format("YYYY-MM-DD") : "" }}</a-descriptions-item>
              <a-descriptions-item label="要求完工日期">{{ baseInfo.requirst_done_date ? moment(baseInfo.requirst_done_date).format("YYYY-MM-DD") : "" }}</a-descriptions-item>
              <a-descriptions-item label="序列号">{{ valveInfo.valve_serial }}</a-descriptions-item>
              <a-descriptions-item label="序号">{{ baseInfo.serial_number }}</a-descriptions-item>
              <a-descriptions-item label="阀门种类">{{ getControlModelUnit(baseInfo.control_model) }}</a-descriptions-item>
              <a-descriptions-item label="工艺介质">{{ baseInfo.process_medium }}</a-descriptions-item>
              <a-descriptions-item label="生产部/分厂">{{ baseInfo.factory_branch }}</a-descriptions-item>
              <a-descriptions-item label="装置">{{ baseInfo.base_device }}</a-descriptions-item>
              <a-descriptions-item label="工时(min)">{{ baseInfo.stepbase_total_minute }}</a-descriptions-item>
              <a-descriptions-item label="完成日期">{{ baseInfo.stepbase_workerdone_date ? moment(baseInfo.stepbase_workerdone_date).format("YYYY-MM-DD") : "" }}</a-descriptions-item>
            </a-descriptions>
            <a-row>
              <a-col :span="24">
                故障现象及工作内容
                <a-textarea :rows="5" :value="baseInfo.content" :disabled="true"></a-textarea>
              </a-col>
            </a-row>
            <a-divider style="margin-bottom: 32px">已购买备件清单</a-divider>
            <a-table
              :columns="getColumnsPurchasedArray()"
              :dataSource="getPurchasedData()"
              :pagination="false"
            ></a-table>
            <a-divider style="margin-bottom: 32px"/>
            <a-descriptions title="上传附件">
              <a-descriptions-item label="">
                规格表<br>
                <a-upload :file-list="specificationTableFileList" @preview="clickSerialCardFile"></a-upload>
              </a-descriptions-item>
              <a-descriptions-item label="">
                序列卡<br>
                <a-upload :file-list="serialCardFileList" @preview="clickSerialCardFile" ></a-upload>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-tab-pane>
      </template>

      <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm" :forceRender="true">
        <a-card :bordered="false">
          <a-descriptions title="阀门信息">
            <a-descriptions-item label="阀类型">{{ getValveTypeUnit(valveInfo.valve_type) }}</a-descriptions-item>
            <a-descriptions-item label="阀门品牌">{{ valveInfo.valve_manufacturer }}</a-descriptions-item>
            <a-descriptions-item label="阀门序列号">{{ valveInfo.valve_serial }}</a-descriptions-item>
            <a-descriptions-item label="阀门型号">{{ valveInfo.valve_model }}</a-descriptions-item>
            <a-descriptions-item label="阀门尺寸">{{ valveInfo.valve_size + " " + getValveSizeUnit(valveInfo.valve_size_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀门材质">{{ getValveMaterialUnit(valveInfo.valve_material) }}</a-descriptions-item>
            <a-descriptions-item label="阀门压力等级">{{ valveInfo.valve_pressure_level }}</a-descriptions-item>
            <a-descriptions-item label="阀门流向">{{ valveInfo.valve_flow }}</a-descriptions-item>
            <a-descriptions-item label="Push down to">{{ getValvePushDoneUnit(valveInfo.valve_push_done) }}</a-descriptions-item>
            <a-descriptions-item label="阀门行程">{{ getValveSizeUnitText(valveInfo.valve_travel, valveInfo.valve_travel_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀门Cv值">{{ valveInfo.valve_lv }}</a-descriptions-item>
            <a-descriptions-item label="阀内件特性">{{ getValveFlowChar(valveInfo.valve_flow_char) }}</a-descriptions-item>
            <a-descriptions-item label="阀杆直径">{{ valveInfo.valve_rod_diameter + " " + getValveSizeUnit(valveInfo.valve_rod_diameter_unit) }}</a-descriptions-item>
            <a-descriptions-item label="口径">{{ valveInfo.valve_caliber + " " + getValveSizeUnit(valveInfo.valve_caliber_unit) }}</a-descriptions-item>
            <a-descriptions-item label="连接方式">{{ getValveConnectModelUnit(valveInfo.valve_connect_model) }}</a-descriptions-item>
            <a-descriptions-item label="法兰螺栓工具">{{ valveInfo.valve_flange_bolt_tool + " " + getValveSizeUnit(valveInfo.valve_flange_bolt_tool_unit) }}</a-descriptions-item>
            <a-descriptions-item label="连接夹块螺栓工具">{{ valveInfo.valve_connect_bolt_tool + " " + getValveSizeUnit(valveInfo.valve_connect_bolt_tool_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀芯/阀球/蝶板材质">{{ valveInfo.valve_core_ball_bettlefly }}</a-descriptions-item>
            <a-descriptions-item label="阀杆/阀轴材质">{{ valveInfo.valve_stem_axis }}</a-descriptions-item>
            <a-descriptions-item label="阀笼/保持环材质">{{ valveInfo.valve_cage_retaining_ring }}</a-descriptions-item>
            <a-descriptions-item label="阀座环材质">{{ valveInfo.valve_set_ring }}</a-descriptions-item>
            <a-descriptions-item label="村套/轴承材质">{{ valveInfo.valve_village_bearing }}</a-descriptions-item>
            <a-descriptions-item label="垫片材质">{{ valveInfo.valve_spacer }}</a-descriptions-item>

          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="阀盖" :column="4">
            <a-descriptions-item label="阀盖螺栓扭矩标准值">{{ getValveCoverBoltTorqueUnitText(valveInfo.valve_cover_bolt_torque, valveInfo.valve_cover_bolt_torque_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀盖螺栓材质">{{ valveInfo.valve_cover_bolt_material }}</a-descriptions-item>
            <a-descriptions-item label="阀盖螺栓尺寸">{{ getValveSizeUnitTextNA(valveInfo.valve_cover_bolt_size, valveInfo.valve_cover_bolt_size_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀盖螺栓工具">{{ getValveSizeUnitTextNA(valveInfo.valve_cover_bolt_tool, valveInfo.valve_cover_bolt_tool_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="阀座" :column="4">
            <a-descriptions-item label="阀座螺栓扭矩标准值">{{ valveInfo.valve_seat_bolt_torque + " " + getValveCoverBoltTorqueUnit(valveInfo.valve_seat_bolt_torque_unit) }}</a-descriptions-item>
            <a-descriptions-item label="阀座螺栓工具">{{ valveInfo.valve_seat_bolt_tool + " " +getValveSizeUnit(valveInfo.valve_seat_bolt_tool_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="填料" :column="4">
            <a-descriptions-item label="填料配置">{{ valveInfo.valve_fill_config }}</a-descriptions-item>
            <a-descriptions-item label="填料螺栓工具">{{ valveInfo.valve_fill_bolt_tool + " " + getValveSizeUnit(valveInfo.valve_fill_bolt_tool_unit) }}</a-descriptions-item>
            <a-descriptions-item label="填料螺栓扭矩标准值">{{ valveInfo.valve_fill_bolt_torque + " " + getValveCoverBoltTorqueUnit(valveInfo.valve_fill_bolt_torque_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="阀座泄漏测试" :column="4">
            <a-descriptions-item label="泄漏测试标准">{{ valveInfo.valve_seat_leak_test }}</a-descriptions-item>
            <a-descriptions-item label="阀座泄漏等级">{{ valveInfo.valve_leak_level }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(valveInfo.valve_leak_test_medium) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(valveInfo.valve_leak_test_std_pressed, valveInfo.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试标准值">{{ valveInfo.valve_leak_test_value + " " + getValveLeakTestValueUnit(valveInfo.valve_leak_test_value_unit) }}</a-descriptions-item>
            <a-descriptions-item label="泄漏测试时间">{{ getValveHydrostaticTestTimeUnitText(valveInfo.valve_leak_test_time, valveInfo.valve_leak_test_time_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="水压测试" :column="4">
            <a-descriptions-item label="水压测试介质">{{ getValveTestMediumUnit(valveInfo.valve_test_medium) }}</a-descriptions-item>
            <a-descriptions-item label="水压测试标准">{{ valveInfo.valve_test_std }}</a-descriptions-item>
            <a-descriptions-item label="水压测试标准值">{{ valveInfo.valve_hydrostatic_test_value + " " + getValveHydrostaticTestValueUnit(valveInfo.valve_hydrostatic_test_value_unit) }}</a-descriptions-item>
            <a-descriptions-item label="水压测试时间">{{ valveInfo.valve_hydrostatic_test_time + " " + getValveHydrostaticTestTimeUnit(valveInfo.valve_hydrostatic_test_time_unit) }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="执行机构信息" v-if="showActuatorForm" :forceRender="true">
        <a-card :bordered="false">
          <a-descriptions title="执行机构信息">
            <a-descriptions-item label="执行机构品牌">{{ ActuatorInfo.actu_manufacturer }}</a-descriptions-item>
            <a-descriptions-item label="类型">{{ getActuTypeUnit(ActuatorInfo.actu_type) }}</a-descriptions-item>
            <a-descriptions-item label="作用方式">{{ getActuUseModeUnit(ActuatorInfo.actu_use_mode) }}</a-descriptions-item>
            <a-descriptions-item label="序列号">{{ ActuatorInfo.actuator_serial }}</a-descriptions-item>
            <a-descriptions-item label="型号">{{ ActuatorInfo.actu_model }}</a-descriptions-item>
            <a-descriptions-item label="尺寸">{{ getValveSizeUnitText(ActuatorInfo.actu_size, ActuatorInfo.actu_size_unit) }}</a-descriptions-item>
            <a-descriptions-item label="动作方式">{{ getActuActionModeUnit(ActuatorInfo.actu_action_mode) }}</a-descriptions-item>
            <a-descriptions-item label="弹簧设置压力">{{ ActuatorInfo.actu_spring_set_pressure + " " +getActuSpringSetPressureUnit(ActuatorInfo.actu_spring_set_pressure_unit) }}</a-descriptions-item>
            <a-descriptions-item label="故障失效">{{ getActuFailureUnit(ActuatorInfo.actu_failure) }}</a-descriptions-item>
            <a-descriptions-item label="安装位置">{{ getActuInstallPointUnit(ActuatorInfo.actu_install_point) }}</a-descriptions-item>
            <a-descriptions-item label="气源压力">{{ getValveHydrostaticTestValueUnitText(ActuatorInfo.actu_air_pressed, ActuatorInfo.actu_air_pressed_unit) }}</a-descriptions-item>
            <!-- <a-descriptions-item label="是否集成附件安装支架">{{ getYesNoSwitchUnit(ActuatorInfo.actu_install_bracket) }}</a-descriptions-item>
            <a-descriptions-item label="附件安装支架方向">{{ getActuInstallDirectoreUnit(ActuatorInfo.actu_install_directore) }}</a-descriptions-item> -->
            <a-descriptions-item label="手轮">{{ getActuHandwheel(ActuatorInfo.actu_handwheel) }}</a-descriptions-item>
            <a-descriptions-item label="行程">{{ getActuInstallTravelUnit(ActuatorInfo.actu_install_travel, ActuatorInfo.actu_install_travel_unit) }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin-bottom: 32px"/>
          <a-descriptions title="">
            <a-descriptions-item label="膜盖/缸盖螺栓工具">{{ ActuatorInfo.actu_cover_bolt_tool + " " + getValveSizeUnit(ActuatorInfo.actu_cover_bolt_tool_unit) + " " + getActuCoverBoltToolItemUnit(ActuatorInfo.actu_cover_bolt_tool_item) }}</a-descriptions-item>
            <a-descriptions-item label="膜盖/缸盖螺栓扭矩标准值">{{ ActuatorInfo.actu_cover_bolt_torque + " " + getValveCoverBoltTorqueUnit(ActuatorInfo.actu_cover_bolt_torque_unit) }}</a-descriptions-item>
            <a-descriptions-item label="膜盖/缸盖螺栓材质">{{ getValveCoverBoltMaterialUnitNA(ActuatorInfo.actu_cover_bolt_material) }}</a-descriptions-item>
            <a-descriptions-item label="膜盖/缸盖螺栓尺寸">{{ ActuatorInfo.actu_cover_bolt_size + " " + getValveSizeUnit(ActuatorInfo.actu_cover_bolt_size_unit) }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="4" tab="附件信息" v-if="showSlaveForm && SlaveInfo.other_slave_select_area.length > 0" :forceRender="true">
        <a-card :bordered="false">
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('1')>=0">
            <a-descriptions title="定位器">
              <a-descriptions-item label="定位器品牌">{{ SlaveInfo.slave_locator_brand }}</a-descriptions-item>
              <a-descriptions-item label="定位器序列号">{{ SlaveInfo.slave_locator_serial }}</a-descriptions-item>
              <a-descriptions-item label="定位器型号">{{ SlaveInfo.slave_locator_model }}</a-descriptions-item>
              <a-descriptions-item label="定位器等级">{{ getSlaveLocatorLevalUnit(SlaveInfo.slave_locator_leval) }}</a-descriptions-item>
              <a-descriptions-item label="定位器作用方式">{{ getSlaveLocatorActionmodeUnit(SlaveInfo.slave_locator_actionmode) }}</a-descriptions-item>
              <a-descriptions-item label="输入信号范围">{{ getSlaveInputSignalScopeUnit(SlaveInfo.slave_input_signal_scope) }}</a-descriptions-item>
              <a-descriptions-item label="标准输出">{{ getSlaveStandardOutputUnit(SlaveInfo.slave_standard_output) }}</a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px"/>
          </template>
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('2')>=0">
            <a-descriptions title="过滤减压阀">
              <a-descriptions-item label="过滤减压阀品牌">{{ SlaveInfo.slave_filter_valve_brand }}</a-descriptions-item>
              <a-descriptions-item label="过滤减压阀型号">{{ SlaveInfo.slave_filter_valve_model }}</a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px"/>
          </template>
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('3')>=0">
            <a-descriptions title="电磁阀" :column="4">
              <a-descriptions-item label="电磁阀品牌1">{{ SlaveInfo.slave_elect_valve_brand1 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀型号1">{{ SlaveInfo.slave_elect_valve_model1 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀电压1">{{ SlaveInfo.slave_elect_valve_vol1 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀作用方式1">{{ getSlaveElectValveActiveUnit(SlaveInfo.slave_elect_valve_active1) }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀品牌2">{{ SlaveInfo.slave_elect_valve_brand2 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀型号2">{{ SlaveInfo.slave_elect_valve_model2 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀电压2">{{ SlaveInfo.slave_elect_valve_vol2 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀作用方式2">{{ getSlaveElectValveActiveUnit(SlaveInfo.slave_elect_valve_active2) }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀品牌3">{{ SlaveInfo.slave_elect_valve_brand3 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀型号3">{{ SlaveInfo.slave_elect_valve_model3 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀电压3">{{ SlaveInfo.slave_elect_valve_vol3 }}</a-descriptions-item>
              <a-descriptions-item label="电磁阀作用方式3">{{ getSlaveElectValveActiveUnit(SlaveInfo.slave_elect_valve_active3) }}</a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px"/>
          </template>
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('4')>=0">
            <a-descriptions title="位置开关">
              <a-descriptions-item label="位置开关品牌">{{ SlaveInfo.slave_point_switch_brand }}</a-descriptions-item>
              <a-descriptions-item label="位置开关型号">{{ SlaveInfo.slave_point_switch_model }}</a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px"/>
          </template>
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('5')>=0">
            <a-descriptions title="保位/切换阀" :column="4">
              <a-descriptions-item label="保位阀品牌">{{ SlaveInfo.slave_retaining_valve_brand }}</a-descriptions-item>
              <a-descriptions-item label="保位阀型号">{{ SlaveInfo.slave_retaining_valve_model }}</a-descriptions-item>
              <a-descriptions-item label="保位阀设定点">{{ getValveHydrostaticTestValueUnitText(SlaveInfo.slave_retaining_valve_setpoint, SlaveInfo.slave_retaining_valve_setpoint_unit) }}</a-descriptions-item>
              <a-descriptions-item label="保位阀动作">{{ getSlaveElectValveActiveUnit(SlaveInfo.slave_retaining_valve_active) }}</a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px"/>
          </template>
          <template v-if="SlaveInfo.other_slave_select_area.indexOf('6')>=0">
            <a-descriptions title="其它附件" :column="4">
            </a-descriptions>
            <a-row>
              <a-col :span="12">
                <a-list bordered :data-source="SlaveInfo.other_slave_target" :column="1">
                  <a-list-item slot="renderItem" slot-scope="item">
                    {{ getOtherSlaveText(item) }}
                  </a-list-item>
                </a-list>
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="5" tab="零部件信息" v-if="showPartsForm" :forceRender="true">
        <a-card :bordered="false">
          <a-descriptions title="零部件信息">
            <a-descriptions-item label="">{{ valvePartText(PartsInfo.valve_part_type) }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-tab-pane>
    </a-tabs>
    <pdfView ref="pdf"></pdfView>
  </div>
</template>

<script>
import pdfView from '@/components/PdfView'
import moment from 'moment'
import { formatTotal } from '@/api/project'
import { getRepairPartComboboxText, getDisassemblyComboboxText } from '@/api/comboxText'
import { getColumnsPurchased, getValveSizeUnit, getValveMaterialUnit, getValvePressureLevelUnit,
getValveFlowUnit, getValvePushDoneUnit, getValveHydrostaticTestValueUnit, getValveHydrostaticTestTimeUnit,
getValveCoverBoltTorqueUnit, getValveCoverBoltMaterialUnitNA, getValveSeatLeakTestUnit, getValveFillConfig,
getValveLeakLevel, getValveFlowChar, getValveManufacturerUnit,
getActuTypeUnit, getActuUseModeUnit, getActuActionModeUnit, getActuSpringSetPressureUnit,
getActuFailureUnit, getActuInstallPointUnit, getActuCoverBoltToolItemUnit, getSlaveLocatorBrandUnit,
getSlaveInputSignalScopeUnit, getValveLeakTestValueUnit, getValveTypeUnit, getValveHydrostaticTestTimeUnitText,
getValveSizeUnitText, getSlaveStandardOutputUnit, getValveTestMediumUnit, getControlModelUnit,
getProcessMediumUnit, getSlaveLocatorActionmodeUnit, getSlaveElectValveActiveUnit, getValveHydrostaticTestValueUnitText,
getValveTestStdUnit, getValveCoreBallBettleflyUnit, getValveCageRetainingRingUnit, getValveSetRingUnit, getValveVillageBearingUnit,
getValveSpacer, getYesNoSwitchUnit, getActuInstallDirectoreUnit, getValveConnectModelUnit, getValveStemAxisUnit, getActuHandwheel,
getValveSizeUnitTextNA, getValveCoverBoltTorqueUnitText, getStepUser, formatDateYMD, getActuInstallTravelUnit,
getSlaveLocatorLevalUnit, getOtherSlaveText } from '@/api/step'

export default {
  components: {
    pdfView
  },
  props: {
    stepDetailData: {
      type: Object,
      default: null
    },
    cancelButton: {
      type: Boolean,
      default: true
    },
    showBaseInfo: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      detailData: {},
      project: {},
      baseInfo: {},
      valveInfo: {},
      ActuatorInfo: {},
      SlaveInfo: {},
      PartsInfo: {},
      showValveForm: false,
      showActuatorForm: false,
      showSlaveForm: false,
      showPartsForm: false,
      specificationTableFileList: [], // 规格表
      serialCardFileList: [], // 序列卡
      current: 0,
      stepUser: '',
      stepDoneDate: ''
    }
  },
  mounted () {
    let detailData
    if (this.stepDetailData !== null) {
      detailData = this.stepDetailData
    } else {
      if (this.$store.state.editStepData.stepEditData.step_data.length > 0) {
        detailData = this.$store.state.editStepData.stepEditData
      }
    }
    if (detailData === undefined) {
      return
    }
    this.stepUser = getStepUser(detailData.users)
    this.stepDoneDate = formatDateYMD(detailData.step_done_date)

    this.project = detailData.project
    const dataList = detailData.step_data
    dataList.forEach(item => {
      const stepJSONData = JSON.parse(item.JSON)
      if (item.DataNum === 1) {
        this.baseInfo = stepJSONData

        // 处理上传附件
        if (stepJSONData.uploads && stepJSONData.uploads.length > 0) {
          stepJSONData.uploads.forEach(f => {
            if (f.queue_type === '1') { // 规格表
              this.specificationTableFileList.push(f)
            }
            if (f.queue_type === '2') { // 序列卡
              this.serialCardFileList.push(f)
            }
          })
        }
        // 维修内容
        switch (stepJSONData.return_part) {
        // 阀门
        case '1':
          this.showValveForm = true
          this.showActuatorForm = false
          this.showSlaveForm = false
          this.showPartsForm = false
          break
        // 执行机构
        case '2':
          this.showValveForm = false
          this.showActuatorForm = true
          this.showSlaveForm = false
          this.showPartsForm = false
          break
        // 阀门+执行机构
        case '3':
          this.showValveForm = true
          this.showActuatorForm = true
          this.showSlaveForm = false
          this.showPartsForm = false
          break
        // 阀门+执行机构+附件
        case '4':
          this.showValveForm = true
          this.showActuatorForm = true
          this.showSlaveForm = true
          this.showPartsForm = false
          break
        // 零部件
        case '5':
          this.showValveForm = false
          this.showActuatorForm = false
          this.showSlaveForm = false
          this.showPartsForm = true
          break
        // 执行机构+附件
        case '6':
          this.showValveForm = false
          this.showActuatorForm = true
          this.showSlaveForm = true
          this.showPartsForm = false
          break
        }
      }
    })
    dataList.forEach(item => {
      const stepJSONData = JSON.parse(item.JSON)
      if (item.DataNum === 1) {
        this.baseInfo = stepJSONData
      }
      if (item.DataNum === 2) {
          this.valveInfo = stepJSONData
      }
      if (item.DataNum === 3) {
          this.ActuatorInfo = stepJSONData
      }
      if (item.DataNum === 4) {
          this.SlaveInfo = stepJSONData
      }
      if (item.DataNum === 5) {
          this.PartsInfo = stepJSONData
      }
    })
  },
  methods: {
    moment,
    getValveSizeUnit,
    getValveMaterialUnit,
    getValvePressureLevelUnit,
    getValveFlowUnit,
    getValvePushDoneUnit,
    getValveHydrostaticTestValueUnit,
    getValveHydrostaticTestTimeUnit,
    getValveCoverBoltTorqueUnit,
    getValveCoverBoltMaterialUnitNA,
    getValveSeatLeakTestUnit,
    getValveFillConfig,
    getValveLeakLevel,
    getValveFlowChar,
    getValveManufacturerUnit,
    getActuTypeUnit,
    getActuUseModeUnit,
    getActuActionModeUnit,
    getActuSpringSetPressureUnit,
    getActuFailureUnit,
    getActuInstallPointUnit,
    getActuCoverBoltToolItemUnit,
    getSlaveLocatorBrandUnit,
    getSlaveInputSignalScopeUnit,
    getValveLeakTestValueUnit,
    getValveTypeUnit,
    getValveHydrostaticTestTimeUnitText,
    getValveSizeUnitText,
    getSlaveStandardOutputUnit,
    getValveTestMediumUnit,
    getControlModelUnit,
    getProcessMediumUnit,
    getSlaveLocatorActionmodeUnit,
    getSlaveElectValveActiveUnit,
    getValveHydrostaticTestValueUnitText,
    getValveTestStdUnit,
    getValveCoreBallBettleflyUnit,
    getValveCageRetainingRingUnit,
    getValveSetRingUnit,
    getValveVillageBearingUnit,
    getValveSpacer,
    getYesNoSwitchUnit,
    getActuInstallDirectoreUnit,
    getValveConnectModelUnit,
    getValveStemAxisUnit,
    getActuHandwheel,
    getValveSizeUnitTextNA,
    getValveCoverBoltTorqueUnitText,
    getActuInstallTravelUnit,
    getSlaveLocatorLevalUnit,
    getOtherSlaveText,
    cancelDetail () {
        this.$router.push({ path: '/step/steplist' })
    },
    formatDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    formatExDate (val) {
      if (val === undefined || val.length <= 0) {
        return ''
      }
      return moment(val).format('YYYY-MM-DD')
    },
    projectState (val) {
        switch (val) {
            case '1':
                return '未完工'
            case '2':
                return '已完工'
            case '3':
                return '完工重开'
        }
    },
    projectRepairPlan (val) {
        switch (val) {
            case '1':
                return '成都车间'
            case '2':
                return '榆林车间'
        }
    },
    valvePartText (val) {
      switch (val) {
        case 1:
            return '阀体'
        case 2:
            return '阀笼/导向/保持环'
        case 3:
            return '阀座环'
        case 4:
            return '未知'
        case 5:
            return '阀杆/轴'
        case 6:
            return '定位器'
        case 7:
            return '减压阀'
        case 8:
            return '过滤器'
        case 9:
            return '电磁阀'
        case 10:
            return '位置变送器'
        case 11:
            return '电气转换器'
        case 12:
            return '位置开关'
        case 13:
            return '保位/切换阀'
        case 14:
            return '手轮'
      }
    },
    formatContractTotal (val) {
      return formatTotal(val)
    },
    repairPartComboboxText (val) {
      return getRepairPartComboboxText(val)
    },
    disassemblyComboboxText (val) {
      return getDisassemblyComboboxText(val)
    },
    getColumnsPurchasedArray () {
      // 删除“操作”列
      var tmpObj = getColumnsPurchased()
      return tmpObj.splice(0, tmpObj.length - 1)
    },
    getPurchasedData () {
      if (!this.baseInfo.valve_purchased_parts) {
        return
      }
      let key = 1
      this.baseInfo.valve_purchased_parts.forEach(e => {
        e.key = key
        key++
      })
      return this.baseInfo.valve_purchased_parts
    },
    clickSerialCardFile (file) {
      this.$refs.pdf.show(file.url, file.name)
      return false
    }
  }
}
</script>

<style scope>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
