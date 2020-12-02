<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="工单基本信息" :forceRender="true">
          <StepBase ref="baseInfo" @repairSelectChange="repairSelectChange($event,repairSelectChange)" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm" :forceRender="true">
          <ValveForm v-if="showValveForm" ref="valveForm" @selectValveSerialChange="getValveContentByInputSearch($event, getValveContentByInputSearch)" />
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
  import { saveStep, stepDone, takeValveSize, takeValveMaterial, takeValvePressureLevel, takeValveValveCoreBallBettlefly,
  takeActuator, takeSpoolMaterial, takeSeatMaterial, takeCageMaterial, takeBenchset, takeAttachment,
  takeLeakageLevel, takePackingType, takeTravel, getStepValveFields, getStepActuatorFields, getStepSlaveFields, getStepBaseFields,
  getStepPartsFields } from '@/api/step'
  import pick from 'lodash.pick'
  import { baseMixin } from '@/store/app-mixin'

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
      projectData: {},
      stepValveFields: getStepValveFields(),
      stepActuatorFields: getStepActuatorFields(),
      stepSlaveFields: getStepSlaveFields(),
      stepBaseFields: getStepBaseFields(),
      stepPartsFields: getStepPartsFields()
      // valveSerial: ''
    }
  },
  mounted () {
    // 防止表单未注册
    this.stepValveFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepSlaveFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepBaseFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepPartsFields.forEach(v => this.form.getFieldDecorator(v))

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
        // 维修内容
        switch (stepJSONData.repair_part) {
          // 阀门
          case '1':
            this.showValveForm = true
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 执行机构
          case '2':
            // 防止表单未注册
            this.showValveForm = false
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构
          case '3':
            // 防止表单未注册
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构+附件
          case '4':
            // 防止表单未注册
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = true
            this.showPartsForm = false
            break
          // 零部件
          case '5':
            // 防止表单未注册
            this.showValveForm = false
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = true
            break
            // 执行机构+附件
          case '6':
            // 防止表单未注册
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
              this.form.setFieldsValue(pick(tmpBaseInfo, this.stepBaseFields))
            } else if (this.showValveForm && item.DataNum === 2) {
                const valvaData = JSON.parse(item.JSON)
                this.form.setFieldsValue(pick(valvaData, this.stepValveFields))
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

                // 还原阀门序号 还原阀门输入选择开关
                this.$refs.valveForm.addValveSelectData(valvaData.valve_serial, valvaData.valve_serial, valvaData.valve_serial_switch)
            } else if (this.showActuatorForm && item.DataNum === 3) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), this.stepActuatorFields))
            } else if (this.showSlaveForm && item.DataNum === 4) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), this.stepSlaveFields))
            } else if (this.showPartsForm && item.DataNum === 5) {
                this.form.setFieldsValue(pick(JSON.parse(item.JSON), this.stepPartsFields))
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
    getValveContentByInputSearch (data) {
      // 解析阀尺寸
      takeValveSize(data, this)
      // 解析阀材质
      takeValveMaterial(data, this)
      // 解析压力等级和连接方式
      takeValvePressureLevel(data, this)
      // 解析阀杆材质
      takeValveValveCoreBallBettlefly(data, this)
      // 解析执行机构
      takeActuator(data, this)
      // 解析阀芯
      takeSpoolMaterial(data, this)
      // 解析阀芯/阀球/蝶板材质
      takeSpoolMaterial(data, this)
      // 阀座
      takeSeatMaterial(data, this)
      // 阀笼材质
      takeCageMaterial(data, this)
      // 泄漏等级
      takeLeakageLevel(data, this)
      // 填料类型
      takePackingType(data, this)
      // 阀门行程
      takeTravel(data, this)
      // bench set
      takeBenchset(data, this)
      // 附件
      takeAttachment(data, this)

      // this.valveSerial = data.valve_serial
      this.form.setFieldsValue(pick(data, this.stepValveFields))
      this.form.setFieldsValue(pick(data, this.stepActuatorFields))
      this.form.setFieldsValue(pick(data, this.stepSlaveFields))
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
          // 阀序列号
          // values.valve_serial = this.valveSerial
          // 读取swith不存在设置为false
          var switchValue = this.form.getFieldsValue(['valve_serial_switch'])
          if (!switchValue) {
            values.valve_serial_switch = false
          }

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
