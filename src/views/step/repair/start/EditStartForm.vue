<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="工单基本信息" :forceRender="true">
          <StepBase ref="baseInfo" @repairSelectChange="repairSelectChange($event,repairSelectChange)" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm" :forceRender="true">
          <ValveForm v-if="showValveForm" ref="valveForm" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="执行机构信息" v-if="showActuatorForm" :forceRender="true">
          <ActuatorForm v-if="showActuatorForm" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="附件信息" v-if="showSlaveForm" :forceRender="true">
          <SlaveForm v-if="showSlaveForm" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="零部件信息" v-if="showPartsForm" :forceRender="true">
          <ValveParts v-if="showPartsForm" />
        </a-tab-pane>
      </a-tabs>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="stepDone">结束流程</a-button>
      </footer-tool-bar>

    </a-form>
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import StepBase from '@/views/step/modules/StepBase'
  import ActuatorForm from '@/views/step/modules/ActuatorForm'
  import ValveForm from '@/views/step/modules/ValveForm'
  import SlaveForm from '@/views/step/modules/SlaveForm'
  import ValveParts from '@/views/step/modules/ValveParts'
  import { saveStep, stepDone } from '@/api/step'
  import pick from 'lodash.pick'
  import { baseMixin } from '@/store/app-mixin'

  const stepBaseFields = ['id', 'date', 'work_order_serial', 'type', 'tag',
  'estimate', 'return_part', 'repair_part', 'disassembly', 'receipt_date',
  'requirst_done_date', 'project_serial', 'serial', 'content', 'receipt_number', 'purchased_part_list', 'control_model', 'process_medium']

  const stepValveFields = ['id', 'date', 'valve_manufacturer', 'valve_serial', 'valve_size', 'valve_material', 'valve_pressure_level',
  'valve_flow', 'valve_push_done', 'valve_hydrostatic_test_value', 'valve_hydrostatic_test_time', 'valve_cover_bolt_torque',
  'valve_cover_bolt_material', 'valve_cover_bolt_size', 'valve_fill_bolt_torque', 'valve_seat_bolt_torque', 'valve_flow_char',
  'valve_caliber', 'valve_rod_diameter', 'valve_fill_config', 'valve_seat_leak_test', 'valve_leak_level', 'valve_leak_test_value',
  'valve_flange_bolt_tool', 'valve_cover_bolt_tool', 'valve_fill_bolt_tool', 'valve_seat_bolt_tool', 'valve_connect_bolt_tool',
  'valve_type', 'valve_model', 'valve_size_unit', 'valve_hydrostatic_test_time_unit', 'valve_hydrostatic_test_value_unit',
  'valve_cover_bolt_torque_unit', 'valve_cover_bolt_size_unit', 'valve_fill_bolt_torque_unit', 'valve_seat_bolt_torque_unit',
  'valve_caliber_unit', 'valve_rod_diameter_unit', 'valve_leak_test_value_unit', 'valve_flange_bolt_tool_unit',
  'valve_cover_bolt_tool_unit', 'valve_fill_bolt_tool_unit', 'valve_seat_bolt_tool_unit', 'valve_connect_bolt_tool_unit',
  'valve_leak_test_time', 'valve_leak_test_time_unit', 'valve_travel', 'valve_travel_unit', 'valve_lv', 'valve_test_medium',
  'valve_flow_input', 'valve_leak_test_medium', 'valve_leak_test_std_pressed', 'valve_leak_test_std_pressed_unit', 'valve_test_std',
  'valve_connect_model']

  const stepActuatorFields = ['id', 'date', 'actu_manufacturer', 'actu_size', 'actu_type', 'actuator_serial', 'actu_action_mode',
  'actu_spring_set_pressure', 'actu_failure', 'actu_install_point', 'actu_cover_bolt_tool', 'actu_cover_bolt_torque',
  'actu_cover_bolt_material', 'actu_cover_bolt_size', 'actu_use_mode', 'actu_model', 'actu_spring_set_pressure_unit',
  'actu_cover_bolt_tool_unit', 'actu_cover_bolt_tool_item', 'actu_cover_bolt_torque_unit', 'actu_cover_bolt_size_unit',
  'actu_size_unit', 'actu_air_pressed', 'actu_air_pressed_unit']

  const stepSlaveFields = ['id', 'date', 'slave_locator_brand', 'slave_locator_model', 'slave_input_signal_scope', 'slave_standard_output',
  'slave_filter_valve_brand', 'slave_filter_valve_model', 'slave_elect_valve_brand1', 'slave_elect_valve_model1', 'slave_elect_valve_vol1',
  'slave_elect_valve_active1', 'slave_elect_valve_brand2', 'slave_elect_valve_model2', 'slave_elect_valve_vol2', 'slave_elect_valve_active2',
  'slave_elect_valve_brand3', 'slave_elect_valve_model3', 'slave_elect_valve_vol3', 'slave_elect_valve_active3',
  'slave_point_switch_brand', 'slave_point_switch_model', 'slave_other_slave', 'slave_locator_serial', 'slave_locator_actionmode',
  'slave_retaining_valve_brand', 'slave_retaining_valve_model', 'slave_retaining_valve_setpoint', 'slave_retaining_valve_setpoint_unit',
  'slave_retaining_valve_active']
  const stepPartsFields = ['valve_part_type']

export default {
  name: 'EditStepDataForm',
  mixins: [baseMixin],
  components: {
    StepBase,
    ActuatorForm,
    ValveForm,
    SlaveForm,
    ValveParts,
    baseMixin,
    FooterToolBar
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentTab: 0,
      currentStepIndex: 0,
      showValveForm: false,
      showActuatorForm: false,
      showSlaveForm: false,
      showPartsForm: false,
      flowID: '',
      currentStep: '',
      projectData: {}
    }
  },
  mounted () {
    const dataList = this.$store.state.editStepData.stepEditData.step_data
    this.flowID = this.$store.state.editStepData.stepEditData.flow_id
    this.currentStep = this.$store.state.editStepData.stepEditData.current_step
    this.projectData = this.$store.state.editStepData.stepEditData.project
    // 首先显示出界面
    // 找到工单BASE数据，之后根据维修内容显示出其余数据
    dataList.forEach(item => {
      const stepJSONData = JSON.parse(item.JSON)
      if (item.DataNum === 1) {
        // 防止表单未注册
        stepBaseFields.forEach(v => this.form.getFieldDecorator(v))
        // 维修内容
        switch (stepJSONData.repair_part) {
          // 阀门
          case '1':
            // 防止表单未注册
            stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 执行机构
          case '2':
            // 防止表单未注册
            stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = false
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构
          case '3':
            // 防止表单未注册
            stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构+附件
          case '4':
            // 防止表单未注册
            stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            stepSlaveFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = true
            this.showPartsForm = false
            break
          // 零部件
          case '5':
            // 防止表单未注册
            stepPartsFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = false
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = true
            break
            // 执行机构+附件
          case '6':
            // 防止表单未注册
            stepPartsFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = false
            this.showActuatorForm = true
            this.showSlaveForm = true
            this.showPartsForm = false
            break
        }
      }
    })
    this.$nextTick(() => {
        dataList.forEach(item => {
            if (item.DataNum === 1) {
              const tmpBaseInfo = JSON.parse(item.JSON)
              tmpBaseInfo.project_serial = this.projectData.serial
              this.$refs.baseInfo.$emit('baseHasEdit', tmpBaseInfo)
              this.form.setFieldsValue(pick(tmpBaseInfo, stepBaseFields))
            } else if (this.showValveForm && item.DataNum === 2) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), stepValveFields))
                // 根据阀类型决定流向字段内容
                const valveType = this.form.getFieldsValue(['valve_type'])
                switch (valveType.valve_type) {
                  case '1':
                  case '2': { // 选择的  GLOBE balanced    GLOBE unbalanced
                    this.$refs.valveForm.selectArray = this.$refs.valveForm.globeValveTypeSelect
                    this.$refs.valveForm.selectArrayKey = this.$refs.valveForm.globeValveTypeSelectKey
                    this.$refs.valveForm.valueTypeValue = '1'
                    break
                  }
                  case '3': {
                    this.$refs.valveForm.selectArray = this.$refs.valveForm.butterflyValveTypeSelect
                    this.$refs.valveForm.selectArrayKey = this.$refs.valveForm.butterflyValveTypeSelectKey
                    this.$refs.valveForm.valueTypeValue = '1'
                    break
                  }
                  case '4': {
                    this.$refs.valveForm.selectArray = this.$refs.valveForm.BallValveTypeSelect
                    this.$refs.valveForm.selectArrayKey = this.$refs.valveForm.BallValveTypeSelectKey
                    this.$refs.valveForm.valueTypeValue = '1'
                    break
                  }
                  case '5': {
                    this.$refs.valveForm.valueTypeValue = '5'
                    this.form.setFieldsValue({ valve_flow_input: this.form.getFieldsValue(['valve_flow_input']).valve_flow_input })
                  }
                }
            } else if (this.showActuatorForm && item.DataNum === 3) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), stepActuatorFields))
            } else if (this.showSlaveForm && item.DataNum === 4) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), stepSlaveFields))
            } else if (this.showPartsForm && item.DataNum === 5) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), stepPartsFields))
            }
        })
    })
  },
  methods: {
    repairSelectChange (value) {
      switch (value) {
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
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 流程 ＩＤ
          values.FlowID = this.flowID
          // 修改人员ID
          values.create_user_id = this.$store.state.user.info.id
          // 上传文件MD5值 列表
          var md5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
          if (md5List.length > 0) {
            values.uploads = md5List
          }
          // 采购部件列表
          values.valve_purchased_parts = this.$refs.baseInfo.dataPurchased

          saveStep(values).then(res => {
            // 刷新表格
            this.$router.push({ path: '/step/steplist' })
            this.$message.info('保存成功')
            // 清空数据
            this.flowID = ''
            this.$store.commit('SET_STEP_EDIT_DATA', null)

            // 重置表单数据
            this.form.resetFields()
          })
        }
      })
    },
    cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
    },
    stepDone () {
      const letThis = this
      this.$confirm({
        title: '结束流程',
        content: '确定要结束流程？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          stepDone({ id: letThis.flowID, current_step: letThis.currentStep, user_id: letThis.$store.state.user.info.id }).then(res => {
              // 刷新表格
              letThis.$message.info('结束流程成功')
              letThis.$router.push({ path: '/step/steplist' })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
