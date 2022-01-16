<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="安装执行机构" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions title="">
          <a-descriptions-item label="阀行程">
            {{ getValveSizeUnitText(valveData.valve_travel, valveData.valve_travel_unit) }}
          </a-descriptions-item>
          <a-descriptions-item label="故障失效">
            {{ getActuFailureUnit(actuData.actu_failure) }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="阀门实际行程">
              <a-input
                :disabled="not_applicable"
                style="width:100%;"
                v-decorator="[
                  'install_actuator_valve_real_travel',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'install_actuator_valve_real_travel_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                  <a-select-option value="1">
                    inch
                  </a-select-option>
                  <a-select-option value="2">
                    mm
                  </a-select-option>
                  <a-select-option value="3">
                    °
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="阀门实际故障位置">
              <a-select :disabled="not_applicable" v-decorator="[ 'install_actuator_valve_real_fail_point', {rules: [{ message: '请选择故障位置'}]}]" :allowClear="true">
                <a-select-option value="1">
                  Open
                </a-select-option>
                <a-select-option value="2">
                  Close
                </a-select-option>
                <a-select-option value="3">
                  Lock
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'install_actuator_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="备注">
              <a-textarea
                :disabled="not_applicable"
                rows="6"
                v-decorator="[
                  'install_actuator_memo',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>
      <a-card v-if="flowID" title="派员" :headStyle="{fontWeight:'bold'}">
        <dispatchUser :disableAll="not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'1'"/>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <uploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData, getValveSizeUnitText, getActuFailureUnit } from '@/api/step'
  import { saveinstallActuatorData } from '@/api/installActuator'
  import uploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import dispatchUser from '@/views/step/modules/DispatchUser'

  const installActuatorFields = ['install_actuator_total_minute', 'install_actuator_valve_real_travel', 'install_actuator_valve_real_travel_unit',
  'install_actuator_valve_real_fail_point', 'not_applicable', 'install_actuator_memo']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      uploadImg,
      stepDetail,
      stepAllDetailModel,
      dispatchUser
    },
    methods: {
      getValveSizeUnitText,
      getActuFailureUnit,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.not_applicable = this.not_applicable

            saveinstallActuatorData(values).then(res => {
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
      installActuatorFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads

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
          const installACData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installACData, installActuatorFields))
          this.$refs.uploadImg.imgFileList = installACData.uploads
          this.not_applicable = installACData.not_applicable
        })
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        valveData: {},
        actuData: {},
        not_applicable: false
      }
    }
  }
</script>

<style>

</style>
