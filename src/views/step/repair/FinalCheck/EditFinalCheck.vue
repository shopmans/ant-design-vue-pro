<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <template v-if="flowID" >
        <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
          <dispatchUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
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
                <a-date-picker :disabled="not_applicable" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['final_check_date', {}]" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <br>
      </template>
      <a-card title="最终检查" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions>
          <a-descriptions-item label="工作单号">{{ baseInfo.work_order_serial }}</a-descriptions-item>
          <a-descriptions-item label="维修合同号">{{ project.contract_serial }}</a-descriptions-item>
          <a-descriptions-item label="工程日期">{{ moment(project.date).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
          <a-descriptions-item label="客户名称">{{ project.customer_name }}</a-descriptions-item>
          <a-descriptions-item label="位号">{{ baseInfo.tag }}</a-descriptions-item>
          <a-descriptions-item label="序列号">{{ valveInfo.valve_serial }}</a-descriptions-item>
          <a-descriptions-item label="阀门型号">{{ valveInfo.valve_model }}</a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="阀门" :forceRender="true">
            <a-row v-for="(item,index) in finalCheckFieldsLabelA" :gutter="16" :key="finalCheckFieldsA[index] + index">
              <a-col :span="13">
                <a-descriptions size="small">
                  <a-descriptions-item :label="item"></a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-radio-group :disabled="not_applicable" v-decorator="[finalCheckFieldsA[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="执行机构" :forceRender="true">
            <a-row v-for="(item,index) in finalCheckFieldsLabelB" :gutter="16" :key="finalCheckFieldsB[index] + index">
              <a-col :span="13">
                <a-descriptions size="small">
                  <a-descriptions-item :label="item"></a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-radio-group :disabled="not_applicable" v-decorator="[finalCheckFieldsB[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" tab="附件" :forceRender="true">
            <a-row v-for="(item,index) in finalCheckFieldsLabelC" :gutter="16" :key="finalCheckFieldsC[index] + index">
              <a-col :span="13">
                <a-descriptions size="small">
                  <a-descriptions-item :label="item"></a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-radio-group :disabled="not_applicable" v-decorator="[finalCheckFieldsC[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="4" tab="文档" :forceRender="true">
            <a-row v-for="(item,index) in finalCheckFieldsLabelD" :gutter="16" :key="finalCheckFieldsD[index] + index">
              <a-col :span="13">
                <a-descriptions size="small">
                  <a-descriptions-item :label="item"></a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-radio-group :disabled="not_applicable" v-decorator="[finalCheckFieldsD[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="5" tab="发货" :forceRender="true">
            <a-row v-for="(item,index) in finalCheckFieldsLabelE" :gutter="16" :key="finalCheckFieldsE[index] + index">
              <a-col :span="13">
                <a-descriptions size="small">
                  <a-descriptions-item :label="item"></a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-radio-group :disabled="not_applicable" v-decorator="[finalCheckFieldsE[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-card>

      <!-- 备注 -->
      <a-card>
        <a-form-item label="建议">
          <a-textarea
            :disabled="not_applicable"
            rows="6"
            v-decorator="[
              'finalcheck_content_text',
              {rules: []}
            ]" />
        </a-form-item>
      </a-card>
      <br>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
    </a-card>

    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData } from '@/api/step'
  import { saveFinalCheckData, getFinalCheckFieldsLabelA, getFinalCheckFieldsA, getFinalCheckFieldsLabelB, getFinalCheckFieldsB,
  getFinalCheckFieldsLabelC, getFinalCheckFieldsC, getFinalCheckFieldsLabelD, getFinalCheckFieldsD,
  getFinalCheckFieldsLabelE, getFinalCheckFieldsE } from '@/api/finalCheck'
  import UploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import moment from 'moment'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import dispatchUser from '@/views/step/modules/DispatchUser'

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel,
      dispatchUser
    },
    methods: {
      moment,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.not_applicable = this.not_applicable

            saveFinalCheckData(values).then(res => {
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
            const tmpData = JSON.parse(res.result.step_data[0].JSON)
            this.$refs.uploadImg.imgFileList = tmpData.uploads
            this.$message.info('上传照片成功')
          }
        })
      },
      naChange (e) {
        this.not_applicable = e.target.checked
      }
    },
    mounted () {
      this.finalCheckFieldsA.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsB.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsC.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsD.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsE.forEach(v => this.form.getFieldDecorator(v))
      var tmpFields = []
      tmpFields.push('not_applicable', 'work_time')
      tmpFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads

      queryStepData({ id: editData.flow_id, current_step: '(start)' }).then(res => {
        // 找到 baseInfo
        res.result.step_data.forEach(item => {
          if (item.DataNum === 1) {
            this.baseInfo = JSON.parse(item.JSON)
          }
           if (item.DataNum === 2) {
            this.valveInfo = JSON.parse(item.JSON)
          }
        })
        // 找到project
        this.project = res.result.project
      })

      if (editData.step_data.length > 0) {
        this.$nextTick(() => {
          const installIAData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installIAData, this.finalCheckFieldsA))
          this.form.setFieldsValue(pick(installIAData, this.finalCheckFieldsB))
          this.form.setFieldsValue(pick(installIAData, this.finalCheckFieldsC))
          this.form.setFieldsValue(pick(installIAData, this.finalCheckFieldsD))
          this.form.setFieldsValue(pick(installIAData, this.finalCheckFieldsE))
          this.form.setFieldsValue(pick(installIAData, ['not_applicable', 'work_time']))
          this.$refs.uploadImg.imgFileList = installIAData.uploads
          this.not_applicable = installIAData.not_applicable
          // 初始化日期
          if (!installIAData.final_check_date || installIAData.final_check_date.indexOf('0001-') >= 0) {
            this.form.setFieldsValue(pick({ final_check_date: moment() }, 'final_check_date'))
          }
        })
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        baseInfo: {},
        project: {},
        valveInfo: {},
        finalCheckOpt: [
          { label: '是', value: '1' },
          { label: '否', value: '2' },
          { label: '不适用', value: '3' }
        ],
        finalCheckFieldsLabelA: getFinalCheckFieldsLabelA(),
        finalCheckFieldsA: getFinalCheckFieldsA(),
        finalCheckFieldsLabelB: getFinalCheckFieldsLabelB(),
        finalCheckFieldsB: getFinalCheckFieldsB(),
        finalCheckFieldsLabelC: getFinalCheckFieldsLabelC(),
        finalCheckFieldsC: getFinalCheckFieldsC(),
        finalCheckFieldsLabelD: getFinalCheckFieldsLabelD(),
        finalCheckFieldsD: getFinalCheckFieldsD(),
        finalCheckFieldsLabelE: getFinalCheckFieldsLabelE(),
        finalCheckFieldsE: getFinalCheckFieldsE(),
        not_applicable: false
      }
    }
  }
</script>

<style>

</style>
