<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="维修内容">
        <!-- 维修内容 -->
        <a-form-item label="维修内容">
          <a-textarea :rows="5" v-decorator="['localtor_repair_content',{rules: []}]" />
        </a-form-item>
      </a-card>

      <br>

      <!-- 工时 -->
      <a-card title="工时" :headStyle="{fontWeight:'bold'}" >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="工时(min)">
              <a-input-number
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'localtor_repair_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :QueueType="3" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" />
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import UploadImg from '../../modules/UploadImg'
  import { stepDone, saveStepPublic } from '@/api/step'
  import pick from 'lodash.pick'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const Fields = ['localtor_repair_content', 'localtor_repair_total_minute']

export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      UploadImg,
      FooterToolBar,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        repairData: {}
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.purchased_parts = this.dataPurchased

            saveStepPublic(values).then(res => {
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
      handleStepDone () {
        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flowID, current_step: letThis.currentStep }).then(res => {
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
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
      }
    },
    mounted () {
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      Fields.forEach(v => this.form.getFieldDecorator(v))

      if (editData.step_data && editData.step_data.length > 0) {
        this.repairData = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(this.repairData, Fields))
        if (this.repairData.uploads) {
            this.$refs.uploadImg.imgFileList = this.repairData.uploads
        }
      }
    }
}
</script>

<style>

</style>
