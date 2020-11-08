<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="工单基本信息">
          <StepBase ref="baseInfo" @repairSelectChange="repairSelectChange($event,repairSelectChange)" @projectSelectChange="projectSelectChange($event,projectSelectChange)" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm">
          <ValveForm v-if="showValveForm" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="执行机构信息" v-if="showActuatorForm">
          <ActuatorForm v-if="showActuatorForm" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="附件信息" v-if="showSlaveForm">
          <SlaveForm v-if="showSlaveForm" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="零部件信息" v-if="showPartsForm">
          <ValveParts v-if="showPartsForm" />
        </a-tab-pane>
      </a-tabs>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
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
  import { newStep } from '@/api/step'
  import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'StepForm',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    StepBase,
    ActuatorForm,
    ValveForm,
    SlaveForm,
    ValveParts
  },
  state: {
    firstButton: false,
    nextButton: false
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentTab: 0,
      currentStepIndex: 0,
      setpNumberList: [],
      showValveForm: false,
      showActuatorForm: false,
      showSlaveForm: false,
      showPartsForm: false
    }
  },
  methods: {

    // handler
    nextStep () {
      setTimeout(() => {
        let tmpCurrentStepIndex = this.currentStepIndex
      tmpCurrentStepIndex++
      if (tmpCurrentStepIndex <= this.setpNumberList.length) {
        this.currentTab = this.setpNumberList[tmpCurrentStepIndex]
        this.currentStepIndex = tmpCurrentStepIndex
        this.$store.state.firstButton = true
      }
      // 测试是否还有下一步
      if ((this.currentStepIndex + 1) < this.setpNumberList.length) {
        this.$store.state.nextButton = true
      } else {
        this.$store.state.nextButton = false
      }
      }, 400)
    },
    prevStep () {
      let tmpCurrentStepIndex = this.currentStepIndex
      tmpCurrentStepIndex--
      if (tmpCurrentStepIndex >= 0) {
        this.currentTab = this.setpNumberList[tmpCurrentStepIndex]
        this.currentStepIndex = tmpCurrentStepIndex
        // this.props.nextButton = true
      }
      // 测试是否还有上一步
      if ((this.currentStepIndex - 1) >= 0) {
        // this.props.firstButton = true
      } else {
        // this.props.firstButton = false
      }
    },
    finish () {
      this.currentTab = 0
    },
    repairSelectChange (value) {
      this.setpNumberList.length = 0
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
        // 定位器
        case '7':
          this.showValveForm = false
          this.showActuatorForm = false
          this.showSlaveForm = false
          this.showPartsForm = false
          break
      }
    },
    projectSelectChange (value) {
      this.form.setFieldsValue({ work_order_serial: value })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 创建者ID
          values.create_user_id = this.$store.state.user.info.id
          // 上传文件MD5值 列表
          var md5List = this.$store.state.uploadFileMD5Store.uploadFileMD5
          if (md5List.length > 0) {
            values.uploads = md5List
          }
          // 采购部件列表
          values.valve_purchased_parts = this.$refs.baseInfo.dataPurchased
          values.project_id = values.project_id.key

          // 新增
          newStep(values).then(res => {
            // 清空上传文件信息
            this.$store.commit('SET_UPLOAD_MD5', [])
            // 刷新表格
            this.$router.push({ path: '/step/steplist' })
            this.$message.info('新增成功')
            // 重置表单数据
            this.form.resetFields()
          })
        }
      })
    },
    cancelSubmit () {
      // 清空上传文件信息
      this.$store.commit('SET_UPLOAD_MD5', [])
      this.$router.push({ path: '/step/steplist' })
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
