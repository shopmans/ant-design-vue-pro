<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs @change="tabChange">
        <!-- 安装附件 -->
        <a-tab-pane key="1" tab="安装附件" :forceRender="true">
          <a-card title="安装附件" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <template slot="extra">
              <a-checkbox v-model="install_slave_not_applicable" @change="installSlaveChange">
                不适用
              </a-checkbox>
            </template>
            <a-descriptions title="">
              <a-descriptions-item label="故障位置">
                {{ getValvePushDoneUnit(actuData.actu_failure) }}
              </a-descriptions-item>
            </a-descriptions>
            <br>
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item label="安装附件日期">
                  <a-date-picker :disabled="install_slave_not_applicable" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['install_slave_date', {}]" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="工时(min)">
                  <a-input-number
                    :disabled="install_slave_not_applicable"
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
          <!-- 执行人 -->
          <br>
          <a-card v-if="flowID" title="执行人" :headStyle="{fontWeight:'bold'}">
            <ExecutorUser :disableAll="install_slave_not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg ref="uploadImg1" :disableAll="install_slave_not_applicable" :isMobile="isMobile" :queueType="'3'" :flag="'1'" />
          </a-card>
        </a-tab-pane>
        <!-- 配制气源管 -->
        <a-tab-pane key="2" tab="配制气源管" :forceRender="true">
          <a-card title="配制气源管" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <template slot="extra">
              <a-checkbox v-model="air_source_not_applicable" @change="airSourceChange">
                不适用
              </a-checkbox>
            </template>
            <a-descriptions title="">
              <a-descriptions-item label="故障位置">
                {{ getValvePushDoneUnit(actuData.actu_failure) }}
              </a-descriptions-item>
            </a-descriptions>
            <br>
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item label="安装气源管日期">
                  <a-date-picker :disabled="air_source_not_applicable" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['install_source_date', {}]" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="工时(min)">
                  <a-input-number
                    :disabled="air_source_not_applicable"
                    style="width:100%;"
                    :min="0"
                    v-decorator="[
                      'install_source_total_minute',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <br>
          <a-card v-if="flowID" title="执行人" :headStyle="{fontWeight:'bold'}">
            <ExecutorUser :disableAll="air_source_not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'2'" />
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg ref="uploadImg2" :disableAll="air_source_not_applicable" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
          </a-card>
        </a-tab-pane>
      </a-tabs>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />

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
  import ExecutorUser from '@/views/step/modules/ExecutorUser'
  import moment from 'moment'

  const installAccessoryFields = ['install_slave_total_minute', 'install_slave_date', 'install_source_date', 'install_source_total_minute',
  'install_slave_not_applicable', 'air_source_not_applicable', 'not_applicable']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel,
      ExecutorUser
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
            values.not_applicable = this.not_applicable
            values.install_slave_not_applicable = this.install_slave_not_applicable
            values.air_source_not_applicable = this.air_source_not_applicable

            var tmpUpload = []
            // 安装附件
            if (this.$refs.uploadImg1) {
              this.$refs.uploadImg1.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 配制汽源管
            if (this.$refs.uploadImg1) {
              this.$refs.uploadImg2.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            values.uploads = tmpUpload

            saveInstallSlaveData(values).then(res => {
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
            this.refreshImageList(tmpData.uploads)
            this.$message.info('上传照片成功')
          }
        })
      },
      getCurrentImgFlag () {
        return this.currentImgFlag
      },
      naChange (e) {
        this.not_applicable = e.target.checked
        if (this.not_applicable) {
          this.install_slave_not_applicable = true
          this.air_source_not_applicable = true
        } else {
          this.install_slave_not_applicable = false
          this.air_source_not_applicable = false
        }
      },
      tabChange (activeKey) {
        this.currentImgFlag = activeKey
      },
      installSlaveChange (e) {
        this.install_slave_not_applicable = e.target.checked
        this.checkDiskableAll()
      },
      airSourceChange (e) {
        this.air_source_not_applicable = e.target.checked
        this.checkDiskableAll()
      },
      checkDiskableAll () {
        if (this.install_slave_not_applicable && this.air_source_not_applicable) {
          this.not_applicable = true
        } else {
          this.not_applicable = false
        }
      },
      refreshImageList (uploadFiles) {
        var imgList1 = []
        var imgList2 = []
        uploadFiles.forEach(e => {
          if (e.flag === '1') {
            imgList1.push(e)
          }
        })
        uploadFiles.forEach(e => {
          if (e.flag === '2') {
            imgList2.push(e)
          }
        })

        setTimeout(() => {
          installAccessoryFields.forEach(v => this.form.getFieldDecorator(v))
          if (this.$refs.uploadImg1) {
            this.$refs.uploadImg1.imgFileList = imgList1
          }
          if (this.$refs.uploadImg2) {
            this.$refs.uploadImg2.imgFileList = imgList2
          }
        }, 0)
      }
    },
    mounted () {
      installAccessoryFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag

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

          if (!installIAData.install_slave_date || installIAData.install_slave_date.indexOf('0001-') >= 0) {
            installIAData.install_slave_date = moment()
          }
          if (!installIAData.install_source_date || installIAData.install_source_date.indexOf('0001-') >= 0) {
            installIAData.install_source_date = moment()
          }

          this.form.setFieldsValue(pick(installIAData, installAccessoryFields))
          this.not_applicable = installIAData.not_applicable
          this.install_slave_not_applicable = installIAData.install_slave_not_applicable
          this.air_source_not_applicable = installIAData.air_source_not_applicable
          this.refreshImageList(installIAData.uploads)
        })
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        valveData: {},
        actuData: {},
        not_applicable: false,
        install_slave_not_applicable: false,
        air_source_not_applicable: false,
        currentImgFlag: '1'
      }
    }
  }
</script>

<style>

</style>
