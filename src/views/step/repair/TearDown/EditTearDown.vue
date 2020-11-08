<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <ValveTearDown v-if="ValveTD" />
      <ActuatorTearDown v-if="ActuatorTD" />
      <AccessoryTearDown v-if="AccessoryTD" />

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>

      <!-- 文件上传 -->
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <UploadImg ref="uploadImg" :QueueType="3" :is-mobile="isMobile" />
      </a-card>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import { saveTearDown } from '@/api/tearDown'
  import AccessoryTearDown from './AccessoryTearDown'
  import ActuatorTearDown from './ActuatorTearDown'
  import ValveTearDown from './ValveTearDown'
  import { stepDone } from '@/api/step'
  import pick from 'lodash.pick'
  import UploadImg from '../../modules/UploadImg'
  import { getSelectRepairData } from '@/api/preRepairTest'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const tearDonwFields = ['teardown_valve_total_minute', 'teardown_actuator_total_minute', 'teardown_accessory_total_minute',
  'teardown_valve_content', 'teardown_actuator_content', 'teardown_accessory_content']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      AccessoryTearDown,
      ActuatorTearDown,
      ValveTearDown,
      FooterToolBar,
      baseMixin,
      UploadImg,
      stepDetail,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        AccessoryTD: false,
        ActuatorTD: false,
        ValveTD: false,
        flow_id: '',
        current_step: '',
        baseInfoData: null
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flow_id
            values.current_step = this.current_step
            values.perrepair_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            saveTearDown(values).then(res => {
              // 清空数据
              this.$store.commit('SET_STEP_EDIT_DATA', null)
              // 刷新表格
              this.$router.push({ path: '/step/steplist' })
              this.$message.info('保存成功')

              // 重置表单数据
              this.form.resetFields()
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
      },
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
      },
      handleStepDone () {
        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flow_id, current_step: letThis.current_step }).then(res => {
                // 刷新表格
                letThis.$message.info('结束流程成功')
                letThis.$router.push({ path: '/step/steplist' })
            })
          }
        })
      }
    },
    mounted () {
      // 防止表单未注册
      tearDonwFields.forEach(v => this.form.getFieldDecorator(v))
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData
      this.flow_id = editData.flow_id
      this.current_step = editData.current_step

      // 获取引用数据（维修前测试选择的维修东东）
      getSelectRepairData({ FlowID: this.flow_id }).then(res => {
        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (res.select_repair) { // 与 baseInfo 选择的维修部件下拉列表一致
          case '1': { // 阀门维修
            this.ValveTD = true
            break
          }
          case '2': { // 执行机构维修
            this.ActuatorTD = true
            break
          }
          case '3': { // 阀门+执行机构
            this.ValveTD = true
            this.ActuatorTD = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.ValveTD = true
            this.ActuatorTD = true
            this.AccessoryTD = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryTest = true
            this.ActuatorTD = true
            break
          }
        }

        if (editData.step_data.length > 0) {
          const uploadFiles = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(uploadFiles, tearDonwFields))
          this.$refs.uploadImg.imgFileList = uploadFiles.uploads
        }
      })
    }
  }
</script>

<style>

</style>
