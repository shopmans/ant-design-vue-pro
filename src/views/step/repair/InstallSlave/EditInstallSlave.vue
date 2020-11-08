<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="安装附件" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions title="">
          <a-descriptions-item label="故障位置">
            {{ getValvePushDoneUnit(actuData.actu_failure) }}
          </a-descriptions-item>
        </a-descriptions>
        <br>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="工时(分钟)">
              <a-input-number
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'install_slave_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br><br>

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
  import pick from 'lodash.pick'
  import { stepDone, queryStepData, getValveSizeUnitText, getValvePushDoneUnit } from '@/api/step'
  import { saveInstallSlaveData } from '@/api/installSlave'
  import UploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const installAccessoryFields = ['install_slave_total_minute']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel
    },
    methods: {
      getValveSizeUnitText,
      getValvePushDoneUnit,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList

            saveInstallSlaveData(values).then(res => {
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
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
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
      }
    },
    mounted () {
      installAccessoryFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step

      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
        const stepDate = res.result.step_data
        if (stepDate && stepDate.length > 0) {
          stepDate.forEach(e => {
            // 查找阀信息
            if (e.DataNum === 2) {
              this.valveData = JSON.parse(e.JSON)
            }
            // 查找执行机构信息
            if (e.DataNum === 3) {
              this.actuData = JSON.parse(e.JSON)
            }
          })
        }
      })

      if (editData.step_data.length > 0) {
        this.$nextTick(() => {
          const installIAData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installIAData, installAccessoryFields))
          this.$refs.uploadImg.imgFileList = installIAData.uploads
        })
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        valveData: {},
        actuData: {}
      }
    }
  }
</script>

<style>

</style>
