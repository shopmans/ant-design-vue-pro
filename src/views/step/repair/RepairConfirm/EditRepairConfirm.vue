<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm" :forceRender="true">
          <ValveForm v-if="showValveForm" ref="valveForm" @selectInputChange="selectInputChangeEvent($event, selectInputChangeEvent)" />
          <br>
          <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
            <dispatchUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" tab="执行机构信息" v-if="showActuatorForm" :forceRender="true">
          <ActuatorForm v-if="showActuatorForm" @selectActuInputChange="selectActuInputChangeEvent($event, selectActuInputChangeEvent)" />
          <br>
          <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
            <dispatchUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'2'" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="4" tab="附件信息" v-if="showSlaveForm" :forceRender="true">
          <SlaveForm
            v-if="showSlaveForm"
            :targets="otherSlaveTargetProp"
            :selectArea="selectAreaTargetProp"
            @selectSlaveInputChange="selectSlaveInputChangeEvent($event, selectSlaveInputChangeEvent)"
            @selectOtherSlaveChange="selectOtherSlaveChangeEvent($event, selectOtherSlaveChangeEvent)"
            @selectAreaOtherSlaveChange="selectAreaOtherSlaveChangeEvent($event, selectAreaOtherSlaveChangeEvent)" />
          <br>
          <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
            <dispatchUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'3'" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="5" tab="零部件信息" v-if="showPartsForm" :forceRender="true">
          <ValveParts v-if="showPartsForm" />
        </a-tab-pane>
      </a-tabs>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 38px" @click="stepDone">结束流程</a-button>
      </footer-tool-bar>

      <div hidden><StepBase ref="baseInfo" @repairSelectChange="repairSelectChange($event,repairSelectChange)" /></div>
    </a-form>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import StepBase from '@/views/step/modules/StepBase'
  import ActuatorForm from '@/views/step/modules/ActuatorForm'
  import ValveForm from '@/views/step/modules/ValveForm'
  import SlaveForm from '@/views/step/modules/SlaveForm'
  import ValveParts from '@/views/step/modules/ValveParts'
  import { stepDone, getStepBaseFields, getStepValveFields, getStepActuatorFields, getStepSlaveFields, getStepPartsFields } from '@/api/step'
  import { saveRepairConfirmData } from '@/api/repairConfirm'
  import pick from 'lodash.pick'
  import { baseMixin } from '@/store/app-mixin'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import dispatchUser from '@/views/step/modules/DispatchUser'

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
    FooterToolBar,
    stepAllDetailModel,
    dispatchUser
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
      stepBaseFields: getStepBaseFields(),
      stepValveFields: getStepValveFields(),
      stepActuatorFields: getStepActuatorFields(),
      stepSlaveFields: getStepSlaveFields(),
      stepPartsFields: getStepPartsFields(),
      selectAreaTarget: [], // 保存选择结果在change中修改(决定哪个部份显示)
      selectAreaTargetProp: [], // 在mount读取出来的内容赋值给slave作为初始数据(决定哪个部份显示)
      otherSlaveTarget: [], // 保存选择结果在change中修改(其它附件穿梭框)
      otherSlaveTargetProp: [] // 在mount读取出来的内容赋值(其它附件穿梭框)
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
        this.stepBaseFields.forEach(v => this.form.getFieldDecorator(v))
        // 维修内容
        switch (stepJSONData.repair_part) {
          // 阀门
          case '1':
            // 防止表单未注册
            this.stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 执行机构
          case '2':
            // 防止表单未注册
            this.stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = false
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构
          case '3':
            // 防止表单未注册
            this.stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            this.stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = false
            this.showPartsForm = false
            break
          // 阀门+执行机构+附件
          case '4':
            // 防止表单未注册
            this.stepValveFields.forEach(v => this.form.getFieldDecorator(v))
            this.stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
            this.stepSlaveFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = true
            this.showActuatorForm = true
            this.showSlaveForm = true
            this.showPartsForm = false
            break
          // 零部件
          case '5':
            // 防止表单未注册
            this.stepPartsFields.forEach(v => this.form.getFieldDecorator(v))
            this.showValveForm = false
            this.showActuatorForm = false
            this.showSlaveForm = false
            this.showPartsForm = true
            break
            // 执行机构+附件
          case '6':
            // 防止表单未注册
            this.stepPartsFields.forEach(v => this.form.getFieldDecorator(v))
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
          this.form.setFieldsValue(pick(JSON.parse(item.JSON), this.stepValveFields))
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
            this.form.setFieldsValue(pick(JSON.parse(item.JSON), this.stepActuatorFields))
        } else if (this.showSlaveForm && item.DataNum === 4) {
            const tmpSlaveData = JSON.parse(item.JSON)
            this.selectAreaTarget = tmpSlaveData.other_slave_select_area // 第一行区域选择，决定哪个部份显示
            this.selectAreaTargetProp = this.selectAreaTarget // 第一行区域选择，决定哪个部份显示
            this.otherSlaveTargetProp = tmpSlaveData.other_slave_target // 附件选择
            this.otherSlaveTarget = this.otherSlaveTargetProp // 附件选择
            this.form.setFieldsValue(pick(tmpSlaveData, this.stepSlaveFields))
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
          // 其它附件
          values.other_slave_target = this.otherSlaveTarget

          saveRepairConfirmData(values).then(res => {
            this.$message.info('保存成功')
            // eslint-disable-next-line no-undef
            callFlutterBacktoList.postMessage('save_step_ok') // 告诉移动端vue页面本流程已经保存成功
         })
        }
      })
    },
    cancelSubmit () {
      this.$router.back(-1)
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
    },
    handleStepDetail () {
      this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
    },
    selectInputChangeEvent (data) {
      if (data.hasOwnProperty('valve_manufacturer')) {
        // 统一执行器和附件品牌
        this.form.setFieldsValue(pick({ actu_manufacturer: data.valve_manufacturer }, this.stepActuatorFields))
        this.form.setFieldsValue(pick({ slave_locator_brand: data.valve_manufacturer }, this.stepSlaveFields))
      }
      this.form.setFieldsValue(pick(data, this.stepValveFields))
    },
    selectActuInputChangeEvent (data) {
      this.form.setFieldsValue(pick(data, this.stepActuatorFields))
    },
    selectSlaveInputChangeEvent (data) {
      this.form.setFieldsValue(pick(data, this.stepSlaveFields))
    },
    selectOtherSlaveChangeEvent (data) {
      this.otherSlaveTarget = data.targetKeys
    },
    selectAreaOtherSlaveChangeEvent (data) {
      this.selectAreaTarget = data.selectAreaTargets
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
