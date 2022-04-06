<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card v-if="flowID" title="执行人" :headStyle="{fontWeight:'bold'}">
        <dispatchUser :disableAll="not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'1'"/>
        <a-row :gutter="8">
          <a-col :span="4">
            <a-form-item>
              <div class="linehight">工时(min)</div>
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'leak_pressure_test_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="测漏试压日期">
              <a-date-picker :disabled="assemble_valve_not_applicable || isAssembleValveTableDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['leak_test_date', {}]" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <br>

      <a-card title="测漏试压" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-descriptions title="阀痤测试" :column="1">
              <a-descriptions-item label="泄漏测试标准">{{ baseValveData.valve_seat_leak_test }}</a-descriptions-item>
              <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(baseValveData.valve_leak_test_medium) }}</a-descriptions-item>
              <a-descriptions-item label="泄漏等级">
                {{ baseValveData.valve_leak_level }}
              </a-descriptions-item>
              <a-descriptions-item label="泄漏测试标准值">
                {{ getValveSeatLeakTestUnitText(baseValveData.valve_leak_test_value, baseValveData.valve_leak_test_value_unit) }}
              </a-descriptions-item>
              <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(baseValveData.valve_leak_test_std_pressed, baseValveData.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
              <a-descriptions-item label="泄漏测试时间">
                {{ baseValveData.valve_leak_test_time ? baseValveData.valve_leak_test_time + " " + getValveHydrostaticTestTimeUnit(baseValveData.valve_leak_test_time_unit) : "" }}
              </a-descriptions-item>
            </a-descriptions>
            <a-form-item>
              <div class="linehight">实际测试介质</div>
              <a-select :disabled="not_applicable" v-decorator="[ 'leak_test_real_test_medium', {rules: [{}]}]" style="width: 200px">
                <a-select-option value="1">
                  水
                </a-select-option>
                <a-select-option value="2">
                  压缩空气
                </a-select-option>
                <a-select-option value="3">
                  氮气
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <div class="linehight">泄漏实际测试压力</div>
              <a-input
                :disabled="not_applicable"
                style="width:200px;"
                :min="0"
                v-decorator="[
                  'leak_test_real_test_pressed',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'leak_test_real_test_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                  <a-select-option value="1">
                    PSI
                  </a-select-option>
                  <a-select-option value="2">
                    BAR
                  </a-select-option>
                  <a-select-option value="3">
                    MPa
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item>
              <div class="linehight">实际测试时间(分钟)</div>
              <a-input-number
                :disabled="not_applicable"
                style="width:200px;"
                :min="0"
                v-decorator="[
                  'leak_pressure_test_real_time',
                  {rules: []}
                ]" />
            </a-form-item>
            <a-form-item>
              <div class="linehight">泄漏测试实际值</div>
              <a-input
                :disabled="not_applicable"
                style="width:200px;"
                :min="0"
                v-decorator="[
                  'leak_test_real_valve',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'leak_test_real_valve_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 120px">
                  <a-select-option value="1">
                    SCFH
                  </a-select-option>
                  <a-select-option value="2">
                    ml/min
                  </a-select-option>
                  <a-select-option value="3">
                    bbl/min
                  </a-select-option>
                  <a-select-option value="4">
                    cc/min
                  </a-select-option>
                  <a-select-option value="5">
                    L/min
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item>
              <div class="linehight">备注</div>
              <a-textarea
                :disabled="not_applicable"
                rows="6"
                v-decorator="[
                  'leak_test_memo',
                  {rules: []}
                ]" />
            </a-form-item>
            <a-form-item>
              <div class="linehight">见证人</div>
              <a-input
                :disabled="not_applicable"
                style="width:200px;"
                v-decorator="[
                  'leak_test_real_test_witness',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-descriptions title="水压测试" :column="1">
              <a-descriptions-item label="水压测试标准">{{ baseValveData.valve_test_std }}</a-descriptions-item>
              <a-descriptions-item label="水压测试介质">
                {{ getValveTestMediumUnit(baseValveData.valve_test_medium) }}
              </a-descriptions-item>
              <a-descriptions-item label="水压测试标准值">
                {{ getValveHydrostaticTestValueUnitText(baseValveData.valve_hydrostatic_test_value, baseValveData.valve_hydrostatic_test_value_unit) }}
              </a-descriptions-item>
              <a-descriptions-item label="水压压力等级">
                {{ baseValveData.valve_pressure_level }}
              </a-descriptions-item>
              <a-descriptions-item label="水压测试时间">
                {{ baseValveData.valve_hydrostatic_test_time ? baseValveData.valve_hydrostatic_test_time + " " + getValveHydrostaticTestTimeUnit(baseValveData.valve_hydrostatic_test_time_unit) : "" }}
              </a-descriptions-item>
              <a-descriptions-item label="">
                {{ }}
              </a-descriptions-item>
            </a-descriptions>
            <a-form-item>
              <div class="linehight">实际测试介质</div>
              <a-select :disabled="not_applicable" v-decorator="[ 'leak_pressure_water_real_test_medium', {rules: [{}]}]" style="width: 200px" :allowClear="true">
                <a-select-option value="1">
                  水
                </a-select-option>
                <a-select-option value="2">
                  压缩空气
                </a-select-option>
                <a-select-option value="3">
                  氮气
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <div class="linehight">水压实际测试压力</div>
              <a-input
                :disabled="not_applicable"
                style="width:200px;"
                :min="0"
                v-decorator="[
                  'leak_water_test_real_pressed',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'leak_water_test_real_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                  <a-select-option value="1">
                    PSI
                  </a-select-option>
                  <a-select-option value="2">
                    BAR
                  </a-select-option>
                  <a-select-option value="3">
                    MPa
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item>
              <div class="linehight">实际测试时间(分钟)</div>
              <a-input-number
                :disabled="not_applicable"
                style="width:200px;"
                :min="0"
                v-decorator="[
                  'leak_pressure_water_test_real_time',
                  {rules: []}
                ]" />
            </a-form-item>
            <br>
            <br>
            <br>
            <br>
            <a-form-item>
              <div class="linehight" style="margin-top:20px;">备注</div>
              <a-textarea
                :disabled="not_applicable"
                rows="6"
                v-decorator="[
                  'leak_pressure_water_test_memo',
                  {rules: []}
                ]" />
            </a-form-item>
            <a-form-item>
              <div class="linehight">见证人</div>
              <a-input
                :disabled="not_applicable"
                style="width:200px;"
                v-decorator="[
                  'leak_pressure_water_test_witness',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider style="margin-bottom: 32px"/>
        <a-row class="form-row" :gutter="16">
          <a-col :span="24">
            <a-form-item>
              <div class="linehight">结论</div>
              <a-radio-group :disabled="not_applicable" v-decorator="['leak_pressure_test_content', {rules: []}]">
                <a-radio :value="1">
                  合格
                </a-radio>
                <a-radio :value="2" style="margin-left:50px;">
                  不合格
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider style="margin-bottom: 32px"/>
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
    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <uploadImg ref="uploadImg" :disableAll="not_applicable" :isMobile="isMobile" :queueType="'3'"/>
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData, getValveLeakLevel, getValveLeakTestValueUnit, getValveHydrostaticTestTimeUnit,
  getValveWaterPressureLevelUnit, getValveHydrostaticTestValueUnitText, getValveSeatLeakTestUnitText,
  getValveTestMediumUnit, getValveTestStdUnit, getValveSeatLeakTestUnit } from '@/api/step'
  import uploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import { saveLeakPressureData } from '@/api/leakPressureTest'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import dispatchUser from '@/views/step/modules/DispatchUser'
  import moment from 'moment'

  const leakPressureFields = ['leak_pressure_test_total_minute', 'leak_pressure_water_test_real_time',
  'leak_pressure_test_real_time', 'leak_test_real_valve', 'leak_test_real_valve_unit', 'leak_pressure_water_test_real_value',
  'leak_pressure_water_test_real_value_unit', 'leak_test_real_test_pressed', 'leak_test_real_test_pressed_unit',
  'leak_water_test_real_pressed', 'leak_water_test_real_pressed_unit', 'leak_pressure_test_content', 'leak_test_date',
  'leak_pressure_water_test_content', 'leak_pressure_water_test_memo', 'leak_test_memo', 'leak_test_real_test_medium',
  'leak_pressure_water_real_test_medium', 'leak_pressure_water_test_witness', 'leak_test_real_test_witness', 'not_applicable']

  export default {
    name: 'LeakPressureTest',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      uploadImg,
      stepDetail,
      stepAllDetailModel,
      dispatchUser
    },
    methods: {
      getValveLeakLevel,
      getValveLeakTestValueUnit,
      getValveHydrostaticTestTimeUnit,
      getValveWaterPressureLevelUnit,
      getValveHydrostaticTestValueUnitText,
      getValveSeatLeakTestUnitText,
      getValveTestMediumUnit,
      getValveTestStdUnit,
      getValveSeatLeakTestUnit,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.not_applicable = this.not_applicable

            saveLeakPressureData(values).then(res => {
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
      // 防止表单未注册
      leakPressureFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads

      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 2: // 阀
              this.baseValveData = JSON.parse(stepItem.JSON)
              break
          }
        })

        if (editData.step_data.length > 0) {
          const leakPressureData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(leakPressureData, leakPressureFields))
          this.$refs.uploadImg.imgFileList = leakPressureData.uploads
          this.not_applicable = leakPressureData.not_applicable
          // 初始化日期
          if (!leakPressureData.leak_test_date || leakPressureData.leak_test_date.indexOf('0001-') >= 0) {
            this.form.setFieldsValue(pick({ leak_test_date: moment() }, 'leak_test_date'))
          }
        }
      })
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        baseValveData: {},
        not_applicable: false
      }
    }
  }
</script>

<style>

</style>
