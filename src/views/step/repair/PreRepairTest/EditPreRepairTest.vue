<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form" ref="mform">
      <a-tabs default-active-key="5" @change="tabChange">
        <!-- /////////////////////////////////////////////// 动作测试 /////////////////////////////////////////////////// -->
        <a-tab-pane key="1" tab="动作测试" v-if="SeatLeakTest || ActuatorLeakTest" :forceRender="true">
          <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
            <template slot="extra">
              <a-checkbox :disabled="isActionSave" v-model="action_not_applicable" @change="actionNotApplicableChange">
                不适用
              </a-checkbox>
            </template>
            <dispatchUser :disableAll="disableAll_1 || isActionSave" :flowID="flow_id" :currentStep="current_step" :flag="'5'" />
            <a-row :gutter="8">
              <a-col :span="4">
                <a-form-item label="工时(min)">
                  <a-input-number
                    :disabled="disableAll_1 || isActionSave"
                    :min="0"
                    style="width:100%;"
                    v-decorator="[
                      'action_total_minute',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item label="测试日期">
                  <a-date-picker :disabled="disableAll_1 || isActionSave" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['prerepair_test_date', {}]" style="width: 90%" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <br>
          <a-card title="动作测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <a-row>
              <a-col :lg="6" :md="12" :sm="24">
                <a-form-item>
                  <div class="linehight">动作测试-开</div>
                  <a-radio-group :disabled="disableAll_1 || isActionSave" v-decorator="['accessory_test_active_open', { } ]">
                    <a-radio :value="1">
                      正常
                    </a-radio>
                    <a-radio :value="2">
                      异常
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="12" :sm="24">
                <a-form-item>
                  <div class="linehight">动作测试-关</div>
                  <a-radio-group :disabled="disableAll_1 || isActionSave" v-decorator="['accessory_test_active_close', { } ]">
                    <a-radio :value="1">
                      正常
                    </a-radio>
                    <a-radio :value="2">
                      异常
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider></a-divider>
          </a-card>
          <br>
          <a-card title="结论">
            <a-row class="form-row" :gutter="16">
              <a-col :span="24">
                <a-form-item>
                  <div class="linehight"></div>
                  <a-radio-group :disabled="disableAll_1 || isActionSave" v-decorator="['prerepair_content_5', {rules: []}]">
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
          </a-card>
          <br>
          <!-- 备注 -->
          <a-card title="备注">
            <a-form-item>
              <a-textarea :disabled="disableAll_1 || isActionSave" v-decorator="['prerepair_memo_5',{rules: []}]" rows="4" />
            </a-form-item>
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg
              ref="uploadImg1"
              :disableAll="disableAll_1 || isActionSave"
              :queueType="'3'"
              :isMobile="isMobile"
              :flag="'1'" />
          </a-card>
          <br>
          <a-card>
            <div style="float:right;">
              <a-button style="margin-right: 8px;" :disabled="disableAll_1 || isActionSave" type="primary" @click="saveActionTab($event)">操作完毕</a-button>
              <a-button @click="editActionTab($event)">编辑</a-button>
            </div>
          </a-card>
        </a-tab-pane>
        <!-- /////////////////////////////////////////////// 附件功能测试 /////////////////////////////////////////////////// -->
        <a-tab-pane key="2" tab="附件功能测试" v-if="AccessoryTest" :forceRender="true">
          <accessoryTest
            ref="accessoryTest"
            :flowId="flow_id"
            :currentStep="current_step"
            :baseInfo="valveBaseInfo"
            :selectArea="accessoryData"
            :disableAll="disableAll_2"
            :isDone="isAccessoryDone"
            :isMobile="isMobile"
            @notOk="AccessoryLeakNotOk"
            @setFieldValue="setFieldValue"
            @done="accessoryDone"
            @edit="editAccessoryTab"
            v-if="AccessoryTest" />
        </a-tab-pane>
        <!-- /////////////////////////////////////////////// 阀座泄漏测试 /////////////////////////////////////////////////// -->
        <a-tab-pane key="3" tab="阀座泄漏测试" v-if="SeatLeakTest" :forceRender="true">
          <seatLeakTest
            ref="refSeatLeak"
            :valveData="valveData"
            :flowId="flow_id"
            :currentStep="current_step"
            :disableAll="disableAll_3"
            :isMobile="isMobile"
            v-if="SeatLeakTest"
            :isDone="isLeakTestDone"
            @done="leakTestTabDone"
            @edit="editLeakTestTab"
            @notOk="seatLeakNotOk"
            @setFieldValue="setFieldValue" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="水压测试" v-if="SeatLeakTest" :forceRender="true">
          <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
            <template slot="extra">
              <a-checkbox :disabled="isWaterDone" v-model="water_not_applicable" @change="waterNotApplicableChange">
                不适用
              </a-checkbox>
            </template>
            <dispatchUser :disableAll="disableAll_4 || isWaterDone" :flowID="flow_id" :currentStep="current_step" :flag="'4'" />
            <a-row :gutter="8">
              <a-col :span="4">
                <a-form-item>
                  <div class="linehight">工时(min)</div>
                  <a-input-number
                    :disabled="disableAll_4 || isWaterDone"
                    style="width:100%;"
                    :min="0"
                    v-decorator="[
                      'leak_pressure_test_total_minute',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item label="测试日期">
                  <a-date-picker :disabled="disableAll_4 || isWaterDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['leak_pressure_test_date', {}]" style="width: 90%" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <br>
          <a-card title="测漏试压" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-descriptions title="水压测试" :column="1">
                  <a-descriptions-item label="水压测试标准">{{ valveData.valve_test_std }}</a-descriptions-item>
                  <a-descriptions-item label="水压测试介质">
                    {{ getValveTestMediumUnit(valveData.valve_test_medium) }}
                  </a-descriptions-item>
                  <a-descriptions-item label="水压测试标准值">
                    {{ getValveHydrostaticTestValueUnitText(valveData.valve_hydrostatic_test_value, valveData.valve_hydrostatic_test_value_unit) }}
                  </a-descriptions-item>
                  <a-descriptions-item label="水压压力等级">
                    {{ valveData.valve_pressure_level }}
                  </a-descriptions-item>
                  <a-descriptions-item label="水压测试时间">
                    {{ valveData.valve_hydrostatic_test_time ? valveData.valve_hydrostatic_test_time + " " + getValveHydrostaticTestTimeUnit(valveData.valve_hydrostatic_test_time_unit) : "" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="">
                    {{ }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-form-item>
                  <div class="linehight">水压实际测试压力</div>
                  <a-input
                    :disabled="disableAll_4 || isWaterDone"
                    style="width:200px;"
                    :min="0"
                    v-decorator="[
                      'leak_water_test_real_pressed',
                      {rules: []}
                    ]">
                    <a-select :disabled="disableAll_4 || isWaterDone" v-decorator="[ 'leak_water_test_real_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
                    :disabled="disableAll_4 || isWaterDone"
                    style="width:200px;"
                    :min="0"
                    v-decorator="[
                      'leak_pressure_water_test_real_time',
                      {rules: []}
                    ]" />
                </a-form-item>
                <a-form-item>
                  <div class="linehight">实际测试介质</div>
                  <a-select :disabled="disableAll_4 || isWaterDone" v-decorator="[ 'leak_pressure_water_real_test_medium', {rules: [{}]}]" style="width: 200px" :allowClear="true">
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
                <br>
                <br>
                <br>
                <br>
                <a-form-item>
                  <div class="linehight" style="margin-top:20px;">备注</div>
                  <a-textarea
                    :disabled="disableAll_4 || isWaterDone"
                    rows="6"
                    v-decorator="[
                      'leak_pressure_water_test_memo',
                      {rules: []}
                    ]" />
                </a-form-item>
                <a-form-item>
                  <div class="linehight">见证人</div>
                  <a-input
                    :disabled="disableAll_4 || isWaterDone"
                    style="width:200px;"
                    v-decorator="[
                      'leak_pressure_water_test_witness',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider style="margin-bottom: 32px"/>
          </a-card>
          <br>
          <a-card title="结论">
            <a-row class="form-row" :gutter="16">
              <a-col :span="24">
                <a-form-item>
                  <div class="linehight">结论</div>
                  <a-radio-group :disabled="disableAll_4 || isWaterDone" v-decorator="['leak_pressure_test_content', {rules: []}]">
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
          </a-card>
          <br>
          <!-- 备注 -->
          <a-card title="备注">
            <a-form-item>
              <a-textarea :disabled="disableAll_4 || isWaterDone" v-decorator="['prerepair_memo_4',{rules: []}]" rows="4" />
            </a-form-item>
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg ref="uploadImg4" :disableAll="disableAll_4 || isWaterDone" :queueType="'3'" :isMobile="isMobile" :flag="'4'" />
          </a-card>
          <br>
          <a-card>
            <div style="float:right;">
              <a-button style="margin-right: 8px;" :disabled="disableAll_4 || isWaterDone" type="primary" @click="waterTabDone">操作完毕</a-button>
              <a-button :disabled="disableAll_4" @click="editWaterTab">编辑</a-button>
            </div>
          </a-card>
        </a-tab-pane>
        <!-- /////////////////////////////////////////////// 执行机构测试 /////////////////////////////////////////////////// -->
        <a-tab-pane key="5" tab="执行机构测试" v-if="ActuatorLeakTest" :forceRender="true">
          <actuatorLeakTest
            ref="actuatorLeakTest"
            :flowId="flow_id"
            :currentStep="current_step"
            v-if="ActuatorLeakTest"
            :isMobile="isMobile"
            :disableAll="disableAll_5"
            :isDone="isActuatorDone"
            @done="actuatorTabDone"
            @edit="editActuatorTab"
            @notOk="ActuatorLeakNotOk"
            :mainForm="form"
            @setFieldValue="setFieldValue" />
        </a-tab-pane>
      </a-tabs>
      <br>
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary" >保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>

      <!-- 与首页 baseInfo 一致 -->
      <!-- <a-card title="选择维修部件">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="维修部件">
              <a-select
                v-decorator="[ 'prerepair_test_select_repair', {rules: [{ required: true, message: '请选择维修部件'}]}]" >
                <a-select-option value="1">阀门</a-select-option>
                <a-select-option value="2">执行机构</a-select-option>
                <a-select-option value="3">阀门+执行机构</a-select-option>
                <a-select-option value="4">阀门+执行机构+附件</a-select-option>
                <a-select-option value="6">执行机构+附件</a-select-option>
                <a-select-option value="5">零部件</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card> -->

      <a-form-item>
        <input hidden v-decorator="[ 'valve_leak_test_not_applicable', {rules: [{}]}]" />
      </a-form-item>
      <a-form-item>
        <input hidden v-decorator="[ 'actuator_leak_test_not_applicable', {rules: [{}]}]" />
      </a-form-item>
      <a-form-item>
        <input hidden v-decorator="[ 'accessory_test_not_applicable', {rules: [{}]}]" />
      </a-form-item>
      <a-form-item>
        <input hidden v-decorator="[ 'water_press_test_not_applicable', {rules: [{}]}]" />
      </a-form-item>
      <a-form-item>
        <input hidden v-decorator="[ 'action_test_not_applicable', {rules: [{}]}]" />
      </a-form-item>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="current_step" :flowId="flow_id" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import { savePreRepairTest, getReferencePreRepairTestData } from '@/api/preRepairTest'
  import accessoryTest from './AccessoryTest'
  import actuatorLeakTest from './ActuatorLeakTest'
  import seatLeakTest from './SeatLeakTest'
  import { stepDone, getValveSeatLeakTestUnit, getValveTestMediumUnit, getValveLeakLevel, getValveSeatLeakTestUnitText, getValveHydrostaticTestValueUnitText,
  getValveHydrostaticTestTimeUnit, getValveTestStdUnit, getValveWaterPressureLevelUnit, queryStepData } from '@/api/step'
  import uploadImg from '../../modules/UploadImg'
  import pick from 'lodash.pick'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import moment from 'moment'
  import dispatchUser from '@/views/step/modules/DispatchUser'

  const intoPreRepairFields = ['seat_leak_test_is_success', 'seat_leak_test_real_value', 'seat_leak_test_total_minute',
  'actuator_leak_test_is_success', 'actuator_leak_test_total_minute', 'accessory_locator_is_success', 'accessory_test_filter_reducing_valve_is_success',
  'accessory_test_position_switch_is_success', 'accessory_test_elec_valve_is_success', 'accessory_test_pneumatic_amplifier_is_success',
  'accessory_test_retaining_valve_is_success', 'accessory_test_other_is_success', 'prerepair_test_select_repair',
  'seat_leak_test_real_value_unit', 'seat_leak_test_real_pressed_unit', 'seat_leak_test_real_pressed', 'seat_leak_test_test_real_time',
  'actuator_leak_test_travel_is_success', 'actuator_leak_test_air_is_success', 'actuator_leak_test_benchset_is_success', 'prerepair_content',
  'accessory_test_memo', 'seat_leak_test_real_medium', 'seat_leak_test_witness', 'prerepair_memo', 'leak_pressure_test_total_minute',
  'leak_pressure_water_test_real_time',
  'leak_pressure_test_real_time', 'leak_test_real_valve', 'leak_test_real_valve_unit', 'leak_pressure_water_test_real_value',
  'leak_pressure_water_test_real_value_unit', 'leak_test_real_test_pressed', 'leak_test_real_test_pressed_unit',
  'leak_water_test_real_pressed', 'leak_water_test_real_pressed_unit', 'leak_pressure_test_content',
  'leak_pressure_water_test_content', 'leak_pressure_water_test_memo', 'leak_test_memo', 'leak_test_real_test_medium',
  'leak_pressure_water_real_test_medium', 'leak_pressure_water_test_witness', 'leak_test_real_test_witness', 'accessory_test_position_switch_close_is_success',
  'accessory_test_retaining_valve_set_point', 'accessory_test_retaining_valve_set_point_unit', 'accessory_test_active_open', 'accessory_test_active_close',
  'not_applicable', 'accessory_test_active_total_minute', 'seat_leak_test_date', 'actuator_leak_test_date', 'accessory_test_date',
  'leak_pressure_test_date', 'prerepair_test_date', 'prerepair_content_1', 'prerepair_memo_1', 'prerepair_content_2', 'prerepair_memo_2',
  'prerepair_content_3', 'prerepair_memo_3', 'prerepair_content_4', 'prerepair_memo_4', 'prerepair_content_5', 'prerepair_memo_5',
  'valve_leak_test_not_applicable', 'actuator_leak_test_not_applicable', 'accessory_test_not_applicable', 'water_press_test_not_applicable', 'action_test_not_applicable',
  'action_total_minute']

  export default {
    name: 'PreRepairTest',
    mixins: [baseMixin],
    components: {
      accessoryTest,
      actuatorLeakTest,
      seatLeakTest,
      FooterToolBar,
      uploadImg,
      stepDetail,
      stepAllDetailModel,
      dispatchUser
    },
    data () {
      return {
        form: this.$form.createForm(this),
        SeatLeakTest: false,
        ActuatorLeakTest: false,
        AccessoryTest: false,
        flow_id: '',
        current_step: '',
        baseInfoData: null,
        valveData: null,
        showDispatchUser: false,
        valveBaseInfo: null,
        not_applicable: false,
        accessoryData: {},
        water_not_applicable: false,
        action_not_applicable: false,
        disableAll: false,
        disableAll_1: false,
        disableAll_2: false,
        disableAll_3: false,
        disableAll_4: false,
        disableAll_5: false,
        isActionSave: false,
        isAccessoryDone: false,
        isLeakTestDone: false,
        isWaterDone: false,
        isActuatorDone: false,
        currentImgFlag: '1'
      }
    },
    methods: {
      getValveSeatLeakTestUnit,
      getValveTestMediumUnit,
      getValveLeakLevel,
      getValveSeatLeakTestUnitText,
      getValveHydrostaticTestValueUnitText,
      getValveHydrostaticTestTimeUnit,
      getValveTestStdUnit,
      getValveWaterPressureLevelUnit,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            var tmpUpload = []
            // 动作测试
            if (this.$refs.uploadImg1) {
              this.$refs.uploadImg1.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 附件功能测试
            if (this.$refs.accessoryTest) {
              this.$refs.accessoryTest.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 阀座泄漏测试
            if (this.$refs.refSeatLeak) {
              this.$refs.refSeatLeak.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 水压测试
            if (this.$refs.uploadImg4) {
              this.$refs.uploadImg4.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 执行机构测试
            if (this.$refs.actuatorLeakTest) {
              this.$refs.actuatorLeakTest.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }

            values.flow_id = this.flow_id
            values.current_step = this.current_step
            values.perrepair_user_id = this.$store.state.user.info.id
            values.uploads = tmpUpload
            values.not_applicable = this.not_applicable
            values.action_test_save = this.isActionSave
            values.accessory_tab_done = this.isAccessoryDone
            values.leak_test_done = this.isLeakTestDone
            values.water_test_done = this.isWaterDone
            values.actuator_test_done = this.isActuatorDone

            savePreRepairTest(values).then(res => {
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
      },
      refreshUploads () {
        queryStepData({ id: this.flow_id, current_step: this.current_step }).then(res => {
          if (res.result.step_data && res.result.step_data.length > 0) {
            const tmpData = JSON.parse(res.result.step_data[0].JSON)
            this.refreshImageList(tmpData)
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
          this.disableAll_1 = true
          this.disableAll_2 = true
          this.disableAll_3 = true
          this.disableAll_4 = true
          this.disableAll_5 = true
          this.water_not_applicable = true
          this.action_not_applicable = true
          this.form.setFieldsValue(pick({ valve_leak_test_not_applicable: '1' }, ['valve_leak_test_not_applicable']))
          this.form.setFieldsValue(pick({ actuator_leak_test_not_applicable: '1' }, ['actuator_leak_test_not_applicable']))
          this.form.setFieldsValue(pick({ accessory_test_not_applicable: '1' }, ['accessory_test_not_applicable']))
          this.form.setFieldsValue(pick({ water_press_test_not_applicable: '1' }, ['water_press_test_not_applicable']))
          this.form.setFieldsValue(pick({ action_test_not_applicable: '1' }, ['action_test_not_applicable']))
        } else {
          this.disableAll_1 = false
          this.disableAll_2 = false
          this.disableAll_3 = false
          this.disableAll_4 = false
          this.disableAll_5 = false
          this.water_not_applicable = false
          this.action_not_applicable = false
          this.form.setFieldsValue(pick({ valve_leak_test_not_applicable: '0' }, ['valve_leak_test_not_applicable']))
          this.form.setFieldsValue(pick({ actuator_leak_test_not_applicable: '0' }, ['actuator_leak_test_not_applicable']))
          this.form.setFieldsValue(pick({ accessory_test_not_applicable: '0' }, ['accessory_test_not_applicable']))
          this.form.setFieldsValue(pick({ water_press_test_not_applicable: '0' }, ['water_press_test_not_applicable']))
          this.form.setFieldsValue(pick({ action_test_not_applicable: '0' }, ['action_test_not_applicable']))
        }
      },
      tabChange (activeKey) {
        this.currentImgFlag = activeKey
      },
      seatLeakNotOk () {
        this.form.setFieldsValue(pick({ prerepair_content_1: 2 }, ['prerepair_content_1']))
      },
      ActuatorLeakNotOk () {
        this.form.setFieldsValue(pick({ prerepair_content_2: 2 }, ['prerepair_content_2']))
      },
      AccessoryLeakNotOk () {
        this.form.setFieldsValue(pick({ prerepair_content_3: 2 }, ['prerepair_content_3']))
      },
      notOk () {
        this.form.setFieldsValue(pick({ prerepair_content_5: false }, ['prerepair_memo_1']))
      },
      setFieldValue (field, value) {
        var tmpObj = {}
        tmpObj[field] = value
        this.form.setFieldsValue(pick(tmpObj, [field]))
        switch (field) { // 附件功能测试不适用
          case 'accessory_test_not_applicable': {
            if (value === '1') {
              this.disableAll_2 = true
            } else {
              this.disableAll_2 = false
            }
            break
          }
          case 'valve_leak_test_not_applicable': {
            if (value === '1') {
              this.disableAll_3 = true
            } else {
              this.disableAll_3 = false
            }
            break
          }
          case 'actuator_leak_test_not_applicable': {
            if (value === '1') {
              this.disableAll_5 = true
            } else {
              this.disableAll_5 = false
            }
            break
          }
        }
        this.checkDiskableAll()
      },
      waterNotApplicableChange (e) {
        this.water_not_applicable = e.target.checked
        this.disableAll_4 = e.target.checked
        if (e.target.checked) {
          this.form.setFieldsValue(pick({ water_press_test_not_applicable: '1' }, ['water_press_test_not_applicable']))
        } else {
          this.form.setFieldsValue(pick({ water_press_test_not_applicable: '0' }, ['water_press_test_not_applicable']))
        }
        this.checkDiskableAll()
      },
      actionNotApplicableChange (e) {
        this.action_not_applicable = e.target.checked
        this.disableAll_1 = e.target.checked
        if (e.target.checked) {
          this.form.setFieldsValue(pick({ action_test_not_applicable: '1' }, ['action_test_not_applicable']))
        } else {
          this.form.setFieldsValue(pick({ action_test_not_applicable: '0' }, ['action_test_not_applicable']))
        }
        this.checkDiskableAll()
      },
      checkDiskableAll () {
        if (this.disableAll_1 && this.disableAll_2 && this.disableAll_3 && this.disableAll_4 && this.disableAll_5) {
          this.disableAll = true
        } else {
          this.disableAll = false
        }
        this.not_applicable = this.disableAll
      },
      refreshImageList (uploadFiles) {
        var imgList1 = []
        var imgList2 = []
        var imgList3 = []
        var imgList4 = []
        var imgList5 = []
        uploadFiles.uploads.forEach(e => {
          if (e.flag === '1') {
            imgList1.push(e)
          }
        })
        uploadFiles.uploads.forEach(e => {
          if (e.flag === '2') {
            imgList2.push(e)
          }
        })
        uploadFiles.uploads.forEach(e => {
          if (e.flag === '3') {
            imgList3.push(e)
          }
        })
        uploadFiles.uploads.forEach(e => {
          if (e.flag === '4') {
            imgList4.push(e)
          }
        })
        uploadFiles.uploads.forEach(e => {
          if (e.flag === '5') {
            imgList5.push(e)
          }
        })

        setTimeout(() => {
          if (this.$refs.uploadImg1) {
            this.$refs.uploadImg1.imgFileList = imgList1
          }
          if (this.$refs.uploadImg4) {
            this.$refs.uploadImg4.imgFileList = imgList4
          }
          if (this.$refs.accessoryTest) {
            this.$refs.accessoryTest.setUploadImgData(imgList2)
          }
          if (this.$refs.refSeatLeak) {
            this.$refs.refSeatLeak.setUploadImgData(imgList3)
          }
          if (this.$refs.actuatorLeakTest) {
            this.$refs.actuatorLeakTest.setUploadImgData(imgList5)
          }
        }, 0)
      },
      saveActionTab (e) { // 动作标签完成
        this.isActionSave = true
      },
      editActionTab (e) { // 编辑动作标签
        this.isActionSave = false
      },
      accessoryDone () { // 附件标签完成
        this.isAccessoryDone = true
      },
      editAccessoryTab () { // 编辑附件标签
        this.isAccessoryDone = false
      },
      leakTestTabDone () { // 泄漏测试标签完成
        this.isLeakTestDone = true
      },
      editLeakTestTab () { // 编辑泄漏测试标签
        this.isLeakTestDone = false
      },
      waterTabDone () { // 水压测试标签完成
        this.isWaterDone = true
      },
      editWaterTab () { // 编辑水压测试标签
        this.isWaterDone = false
      },
      actuatorTabDone () { // 执行机构测试标签完成
        this.isActuatorDone = true
      },
      editActuatorTab () { // 编辑执行机构测试标签
        this.isActuatorDone = false
      }
    },
    mounted () {
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData
      this.flow_id = editData.flow_id
      this.current_step = editData.current_step
      this.showDispatchUser = true
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag

      // 获取引用数据
      getReferencePreRepairTestData({ id: this.flow_id, current_step: '(start)' }).then(res => {
        const baseInfo = res.result.step_data
        baseInfo.forEach(item => {
          switch (item.DataNum) {
            case 1: { // 基本信息
              this.valveBaseInfo = JSON.parse(item.JSON)
              break
            }
            case 2: { // 阀维修
              this.valveData = JSON.parse(item.JSON)
              this.SeatLeakTest = true
              break
            }
            case 3: { // 执行机构维修
              this.ActuatorLeakTest = true
              break
            }
            case 4: { // 附件
              this.accessoryData = JSON.parse(item.JSON)
              this.AccessoryTest = true
              break
            }
          }
        })
        // 防止表单未注册
        intoPreRepairFields.forEach(v => this.form.getFieldDecorator(v))

        if (editData.step_data.length > 0) {
          const uploadFiles = JSON.parse(editData.step_data[0].JSON)

          // 初始化日期
          if (!uploadFiles.seat_leak_test_date || uploadFiles.seat_leak_test_date.indexOf('0001-') >= 0) {
            uploadFiles.seat_leak_test_date = moment()
          }
          if (!uploadFiles.actuator_leak_test_date || uploadFiles.actuator_leak_test_date.indexOf('0001-') >= 0) {
            uploadFiles.actuator_leak_test_date = moment()
          }
          if (!uploadFiles.accessory_test_date || uploadFiles.accessory_test_date.indexOf('0001-') >= 0) {
            uploadFiles.accessory_test_date = moment()
          }
          if (!uploadFiles.leak_pressure_test_date || uploadFiles.leak_pressure_test_date.indexOf('0001-') >= 0) {
            uploadFiles.leak_pressure_test_date = moment()
          }
          if (!uploadFiles.prerepair_test_date || uploadFiles.prerepair_test_date.indexOf('0001-') >= 0) {
            uploadFiles.prerepair_test_date = moment()
          }
          // 标签操作已完成
          if (uploadFiles.action_test_save) {
            this.isActionSave = uploadFiles.action_test_save
          }
          if (uploadFiles.accessory_tab_done) {
            this.isAccessoryDone = uploadFiles.accessory_tab_done
          }
          if (uploadFiles.leak_test_done) {
            this.isLeakTestDone = uploadFiles.leak_test_done
          }
          if (uploadFiles.water_test_done) {
            this.isWaterDone = uploadFiles.water_test_done
          }
          if (uploadFiles.actuator_test_done) {
            this.isActuatorDone = uploadFiles.actuator_test_done
          }

          if (uploadFiles) {
            this.form.setFieldsValue(pick(uploadFiles, intoPreRepairFields))
            this.not_applicable = uploadFiles.not_applicable
            // 适用check加载
            if (uploadFiles.water_press_test_not_applicable === '1') {
              this.water_not_applicable = true
              this.disableAll_4 = true
            }
            if (uploadFiles.action_test_not_applicable === '1') {
              this.action_not_applicable = true
              this.disableAll_1 = true
            }
            if (uploadFiles.accessory_test_not_applicable === '1') {
              this.disableAll_2 = true
            }
            if (uploadFiles.valve_leak_test_not_applicable === '1') {
              this.disableAll_3 = true
            }
            if (uploadFiles.actuator_leak_test_not_applicable === '1') {
              this.disableAll_5 = true
            }

            // 加载上传图片
            this.refreshImageList(uploadFiles)
          }
        }
      })
    }
  }
</script>

<style>

</style>
