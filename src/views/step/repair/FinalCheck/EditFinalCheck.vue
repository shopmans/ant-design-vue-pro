<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="最终检查" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions>
          <a-descriptions-item label="工作单号">{{ baseInfo.work_order_serial }}</a-descriptions-item>
          <a-descriptions-item label="维修合同号">{{ project.contract_serial }}</a-descriptions-item>
          <a-descriptions-item label="日期">{{ moment(project.date).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
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
                  <a-radio-group v-decorator="[finalCheckFieldsA[index], { }]" :options="finalCheckOpt" />
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
                  <a-radio-group v-decorator="[finalCheckFieldsB[index], { }]" :options="finalCheckOpt" />
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
                  <a-radio-group v-decorator="[finalCheckFieldsC[index], { }]" :options="finalCheckOpt" />
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
                  <a-radio-group v-decorator="[finalCheckFieldsD[index], { }]" :options="finalCheckOpt" />
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
                  <a-radio-group v-decorator="[finalCheckFieldsE[index], { }]" :options="finalCheckOpt" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
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

    <stepAllDetailModel ref="stepAllDetailModel" />

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
      moment,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList

            saveFinalCheckData(values).then(res => {
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
      this.finalCheckFieldsA.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsB.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsC.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsD.forEach(v => this.form.getFieldDecorator(v))
      this.finalCheckFieldsE.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step

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
          this.$refs.uploadImg.imgFileList = installIAData.uploads
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
        finalCheckFieldsE: getFinalCheckFieldsE()
      }
    }
  }
</script>

<style>

</style>
