<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <!-- 完成日期 -->
      <a-card title="发货" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item >
              <div class="linehight">完成日期</div>
              <a-date-picker
                :disabled="not_applicable"
                style="width:100%;"
                :format="'YYYY-MM-DD'"
                v-decorator="[
                  'package_delivery_done_date',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row>
          <a-col :lg="6" :md="12" :sm="24">
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
        </a-row>
      </a-card>
      <br>

      <a-card title="派员" :headStyle="{fontWeight:'bold'}">
        <dispatchUser :disableAll="not_applicable" v-if="showDispatchUser" :flowID="flow_id" :currentStep="current_step" :flag="'1'" />
      </a-card>

      <!-- 文件上传 -->
      <br>
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
      </a-card>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="current_step" :flowId="flow_id" />

  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { savePackingDelivery } from '@/api/packingDelivery'
import { stepDone, queryStepData } from '@/api/step'
import selectUser from '../../modules/SelectUser'
import pick from 'lodash.pick'
import stepDetail from '../../modules/StepBaseInfo'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import dispatchUser from '../../modules/DispatchUser'
import UploadImg from '../../modules/UploadImg'

  const deliveryFields = ['package_delivery_done_date', 'work_time', 'not_applicable']

export default {
  name: 'ReceiptForm',
  mixins: [baseMixin],
  components: {
    selectUser,
    FooterToolBar,
    baseMixin,
    stepDetail,
    stepAllDetailModel,
    dispatchUser,
    UploadImg
  },
  data () {
    return {
      form: this.$form.createForm(this),
      memberLoading: false,
      flow_id: '',
      current_step: '',
      stepData: {},
      showDispatchUser: false,
      not_applicable: false
    }
  },
  mounted () {
    this.stepData = this.$store.state.editStepData.stepEditData
    this.flow_id = this.stepData.flow_id
    this.current_step = this.stepData.current_step
    this.showDispatchUser = true
    // 防止表单未注册
    deliveryFields.forEach(v => this.form.getFieldDecorator(v))
    // 供flutter刷新上传文件列表
    window.refreshUploads = this.refreshUploads

    queryStepData({ id: this.flow_id, current_step: this.current_step }).then(res => {
        const tmpStepData = JSON.parse(res.result.step_data[0].JSON)
        this.$refs.uploadImg.imgFileList = tmpStepData.uploads
        this.form.setFieldsValue(pick(tmpStepData, deliveryFields))
        this.not_applicable = tmpStepData.not_applicable
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.flow_id = this.flow_id
          values.current_step = this.current_step
          values.uploads = this.$refs.uploadImg.imgFileList
          values.not_applicable = this.not_applicable

          savePackingDelivery(values).then(res => {
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
    },
    handleStepDetail () {
      this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
    },
    refreshUploads () {
      queryStepData({ id: this.flow_id, current_step: this.current_step }).then(res => {
        if (res.result.step_data && res.result.step_data.length > 0) {
          const tmpData = JSON.parse(res.result.step_data[0].JSON)
          this.$refs.uploadImg.imgFileList = tmpData.uploads
          this.$message.info('上传照片成功')
        }
      })
    },
    naChange (e) {
      this.not_applicable = e.target.checked
    }
  }
}
</script>

<style scoped>
.linehight {
  line-height: 20px;
  padding: 0;
  margin:0
}

</style>
