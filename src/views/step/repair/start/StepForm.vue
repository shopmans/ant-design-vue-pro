<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="工单基本信息">
          <StepBase ref="baseInfo" @selectValveSerialChange="getValveContentByInputSearch($event, getValveContentByInputSearch)" @repairSelectChange="repairSelectChange($event,repairSelectChange)" @projectSelectChange="projectSelectChange($event,projectSelectChange)" @selectInputChange="selectInputChangeEvent($event, selectInputChangeEvent)" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="阀门信息" v-if="showValveForm" :forceRender="true">
          <ValveForm v-if="showValveForm" @selectInputChange="selectInputChangeEvent($event, selectInputChangeEvent)" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="执行机构信息" v-if="showActuatorForm" :forceRender="true">
          <ActuatorForm v-if="showActuatorForm" @selectActuInputChange="selectActuInputChangeEvent($event, selectActuInputChangeEvent)" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="附件信息" v-if="showSlaveForm" :forceRender="true">
          <SlaveForm
            v-if="showSlaveForm"
            @selectSlaveInputChange="selectSlaveInputChangeEvent($event, selectSlaveInputChangeEvent)"
            @selectOtherSlaveChange="selectOtherSlaveChangeEvent($event, selectOtherSlaveChangeEvent)"
            @selectAreaOtherSlaveChange="selectAreaOtherSlaveChangeEvent($event, selectAreaOtherSlaveChangeEvent)"/>
        </a-tab-pane>
        <a-tab-pane key="5" tab="零部件信息" v-if="showPartsForm" :forceRender="true">
          <ValveParts v-if="showPartsForm" />
        </a-tab-pane>
      </a-tabs>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">返回</a-button>
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
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { getProjectList } from '@/api/project'
  import { newStep, takeValveSize, takeValveMaterial, takeValvePressureLevel, takeValveValveCoreBallBettlefly,
  takeActuator, takeSpoolMaterial, takeSeatMaterial, takeCageMaterial, takeBenchset, takeAttachment,
  takeLeakageLevel, takePackingType, takeTravel, getStepValveFields, getStepActuatorFields, getStepSlaveFields, getStepBaseFields } from '@/api/step'

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
  mounted () {
    //
    this.$store.state.user.savePropmt = '1'
    // 防止表单未注册
    this.stepValveFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepActuatorFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepSlaveFields.forEach(v => this.form.getFieldDecorator(v))
    this.stepBaseFields.forEach(v => this.form.getFieldDecorator(v))
    // 清空上传文件列表
    this.$store.commit('SET_UPLOAD_MD5', [])

    // 读取10个最近的工程编号
    var lastTenProjectSerial = []
    getProjectList({ pageNo: 1, pageSize: 10, sortField: 'date', sortOrder: 'desc' }).then(res => {
      res.result.data.forEach(e => {
      lastTenProjectSerial.push({
          value: e.id,
          text: e.serial
        })
      })

      const tmpProjectSerialData = {
        value: this.$route.params.projectId,
        text: this.$route.params.projectSerial
      }
      // 是否存在已读取的10个工程项中
      var isExsis = false
      lastTenProjectSerial.forEach(e => {
        if (e.value === tmpProjectSerialData.value) {
          isExsis = true
        }
      })
      if (!isExsis) {
        lastTenProjectSerial.push(tmpProjectSerialData)
        this.$refs.baseInfo.setTenProject(lastTenProjectSerial)
      }

      this.$refs.baseInfo.setTenProject(lastTenProjectSerial)
    })

    // 工程详细中的新建工单会传入工程信息
    if (this.$route.params.projectSerial && this.$route.params.customerName && this.$route.params.orderSerial && this.$route.params.projectId) {
      const tmpProjectData = {
        work_order_serial: this.$route.params.orderSerial,
        base_inf_finaluser: this.$route.params.customerName,
        project_serial: this.$route.params.projectSerial
      }
      this.form.setFieldsValue(pick(tmpProjectData, this.stepBaseFields))
      this.form.setFieldsValue(pick({ project_id: { value: this.$route.params.projectId, text: this.$route.params.projectSerial } }, ['project_id']))
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentTab: 0,
      currentStepIndex: 0,
      setpNumberList: [],
      showValveForm: true,
      showActuatorForm: true,
      showSlaveForm: true,
      showPartsForm: false,
      stepValveFields: getStepValveFields(),
      stepActuatorFields: getStepActuatorFields(),
      stepSlaveFields: getStepSlaveFields(),
      stepBaseFields: getStepBaseFields(),
      otherSlaveTarget: [],
      selectAreaTarget: [],
      lastTenProjectSerial: []
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
      if (value.indexOf('-') > 0) {
        this.form.setFieldsValue({ work_order_serial: value })
      }
      if (value.indexOf('+') === 0) {
        const finalUser = value.replace('+', '')
        this.form.setFieldsValue({ base_inf_finaluser: finalUser })
      }
    },
    handleSubmit (e) {
      this.$store.state.user.savePropmt = '0'
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
          // 选择的其它附件
          values.other_slave_target = this.otherSlaveTarget
          // 其它附件区域选择
          values.other_slave_select_area = this.selectAreaTarget
          // 获取project_id 从工程详细直接保存时 prject_id 是一个对象，新建工单时是一个字符串
          // 工程详细中如果有执行selectChange也是一个字符串
          if (values.project_id instanceof Object) {
            values.project_id = values.project_id.value
          }

          // 新增
          newStep(values).then(res => {
            // 清空上传文件信息
            this.$store.commit('SET_UPLOAD_MD5', [])
            // 刷新表格
            this.$router.back(-1)
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
      this.$router.back(-1)
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

      this.form.setFieldsValue(pick(data, this.stepBaseFields))
      this.form.setFieldsValue(pick(data, this.stepValveFields))
      this.form.setFieldsValue(pick(data, this.stepActuatorFields))
      this.form.setFieldsValue(pick(data, this.stepSlaveFields))
    },
    selectInputChangeEvent (data) {
      if (data.hasOwnProperty('valve_manufacturer')) {
        // 统一执行器和附件品牌
        this.form.setFieldsValue(pick({ actu_manufacturer: data.valve_manufacturer }, this.stepActuatorFields))
        this.form.setFieldsValue(pick({ slave_locator_brand: data.valve_manufacturer }, this.stepSlaveFields))
      }
      this.form.setFieldsValue(pick(data, this.stepValveFields))
      this.form.setFieldsValue(pick(data, this.stepBaseFields))
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
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.user.savePropmt !== '1') {
      next()
      return
    }
    this.$confirm({
      title: '提示',
      content: '还未保存数据确定要退出？',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        next()
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
