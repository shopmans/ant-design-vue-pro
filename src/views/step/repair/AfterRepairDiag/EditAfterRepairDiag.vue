<template>
  <div ref="farther">
    <page-header-wrapper style="position: fixed;z-index: 9;border-bottom: 1px solid #e8e8e8" :style="{width:fartherWidth}">
      <template slot="extra">
        <a-checkbox key="1" v-model="not_applicable" @change="naChange">
          不适用
        </a-checkbox>
      </template>
    </page-header-wrapper>
    <br>
    <br>
    <br>
    <br>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="维修后诊断" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions title="">
          <a-descriptions-item label="序列号">{{ valveRefData.valve_serial }}</a-descriptions-item>
          <a-descriptions-item label="位号">{{ refData1.tag }}</a-descriptions-item>
          <a-descriptions-item label="出入厂单据号码">{{ refData1.receipt_number }}</a-descriptions-item>
          <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
          <a-descriptions-item label="合同号">{{ refData2.contract_serial }}</a-descriptions-item>
          <a-descriptions-item label="客户名称">{{ refData2.customer_name }}</a-descriptions-item>
          <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
        </a-descriptions>
      </a-card>
      <br>

      <a-card title="执行人" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <DispatchUser :disableAll="not_applicable" v-if="showDispatchUser" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
        <a-row :gutter="8">
          <a-col :span="4">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'work_time',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="诊断日期">
              <a-date-picker :disabled="not_applicable" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['after_repair_diag_date', {}]" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br>
    <!-- 图片上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
    </a-card>

    <br>
    <!-- 文件上传 -->
    <a-card title="上传诊断报告" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadFile ref="upload_file" :disableAll="not_applicable" :queueType="'1'" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { stepDone, queryStepData } from '@/api/step'
import { saveAfterRepairDiag } from '@/api/afterRepairDiag'
import UploadFile from '../../modules/UploadFile'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import pick from 'lodash.pick'
import DispatchUser from '../../modules/DispatchUser'
import UploadImg from '../../modules/UploadImg'
import moment from 'moment'

const afterRepairDiagFields = ['work_time', 'not_applicable', 'after_repair_diag_date']

export default {
    name: 'PreRepairDiag',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadFile,
      stepAllDetailModel,
      DispatchUser,
      UploadImg
    },
    mounted () {
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 防止表单未注册
      afterRepairDiagFields.forEach(v => this.form.getFieldDecorator(v))
      this.showDispatchUser = true
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads

      // 读baseinfo
      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
        this.refData2 = res.result.project
        this.form.setFieldsValue(pick(editData.project, afterRepairDiagFields))
        let afterRepairDiag = {}
        if (editData.step_data.length > 0) {
            afterRepairDiag = JSON.parse(editData.step_data[0].JSON)
        } else {
            afterRepairDiag.receipt_parts = []
        }

        if (!afterRepairDiag.after_repair_diag_date || afterRepairDiag.after_repair_diag_date.indexOf('0001-') >= 0) {
          afterRepairDiag.after_repair_diag_date = moment()
        }

        this.form.setFieldsValue(pick(afterRepairDiag, afterRepairDiagFields))
        this.not_applicable = afterRepairDiag.not_applicable

        res.result.step_data.forEach(e => {
          // 查找 baseinfo
          if (e.DataNum === 1) {
            this.refData1 = JSON.parse(e.JSON)
          }
          // 查找阀
          if (e.DataNum === 2) {
            this.valveRefData = JSON.parse(e.JSON)
          }
        })

        afterRepairDiag.uploads.forEach(e => {
          if (e.queue_type === '3') {
              this.$refs.uploadImg.imgFileList.push(e)
          }
          if (e.queue_type === '1') {
              this.$refs.upload_file.fileLists.push(e)
          }
        })
      })
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
      window.onresize = () => {
        this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
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
            values.uploads = [...this.$refs.upload_file.fileLists]
            values.not_applicable = this.not_applicable
            this.$refs.uploadImg.imgFileList.forEach(e => {
              values.uploads.push(e)
            })
            // values.uploads = this.$refs.upload_file.fileLists
            // values.imgUploads = this.$refs.uploadImg.imgFileList

            saveAfterRepairDiag(values).then(res => {
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
      },
      refreshUploads () {
        queryStepData({ id: this.flowID, current_step: this.currentStep }).then(res => {
          if (res.result.step_data && res.result.step_data.length > 0) {
            res.result.step_data.forEach(e => {
              const tmpData = JSON.parse(e.JSON)
              this.$refs.uploadImg.imgFileList.length = 0
              this.$refs.upload_file.fileLists.length = 0
              tmpData.uploads.forEach(e => {
              if (e.queue_type === '3') {
                  this.$refs.uploadImg.imgFileList.push(e)
              }
              if (e.queue_type === '1') {
                  this.$refs.upload_file.fileLists.push(e)
              }
            })
            })
            this.$message.info('上传照片成功')
          }
        })
      },
      naChange (e) {
        this.not_applicable = e.target.checked
      }
    },
    watch: {
      fartherWidth: {
        handler (val) {
          this.fartherWidth = val
        }
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        refData1: {},
        refData2: {},
        valveRefData: {},
        showDispatchUser: false,
        fartherWidth: '',
        not_applicable: false
      }
    }
}
</script>

<style>

</style>
