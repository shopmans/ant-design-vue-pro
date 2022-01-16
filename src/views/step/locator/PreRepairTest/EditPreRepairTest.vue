<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <!-- 硬件检查 -->
      <a-card title="硬件检查" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="定位器铭牌是否齐全">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_nameplate', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="定位器等级标签是否齐全">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_grade_label', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="定位器外观是否损坏">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_exterior', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="定位器是否存在污迹">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_smudge', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="压力表量程">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_pressure_gauge_range', { }]">
                  <a-radio :value="1">
                    60 PSI
                  </a-radio>
                  <a-radio :value="2">
                    160 PSI
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="压力表是否损坏">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_pressure_gauge_yesno', { }]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="2">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="放大器类型">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_amplifier_type', { }]">
                  <a-radio :value="1">
                    A
                  </a-radio>
                  <a-radio :value="2">
                    B
                  </a-radio>
                  <a-radio :value="3">
                    C
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="接线端子电压 4mA">
                <a-input-number
                  :disabled="not_applicable"
                  style="width: 100%"
                  v-decorator="[
                    'hardware_check_locator_terminal_voltage_4ma', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="接线端子电压 20mA">
                <a-input-number
                  :disabled="not_applicable"
                  style="width: 100%"
                  v-decorator="[
                    'hardware_check_locator_terminal_voltage_20ma', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="PWB生产代码">
                <a-input
                  :disabled="not_applicable"
                  v-decorator="[
                    'hardware_check_locator_pwb_production_code', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="I/P生产代码">
                <a-input
                  :disabled="not_applicable"
                  v-decorator="[
                    'hardware_check_locator_ip_production_code', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <br>

      <!-- 电气检查 -->
      <a-card title="电气检查" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="固件版本号">
                <a-input
                  :disabled="not_applicable"
                  v-decorator="[
                    'hardware_check_locator_fireware_ver', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="HART位号">
                <a-input
                  :disabled="not_applicable"
                  v-decorator="[
                    'hardware_check_locator_hart_tag', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="仪表序列号">
                <a-input
                  :disabled="not_applicable"
                  v-decorator="[
                    'hardware_check_locator_instrument_serial', {}
                  ]" />
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="收到时控制模式">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_received_control_mode', { }]">
                  <a-radio :value="1">
                    Analog
                  </a-radio>
                  <a-radio :value="2">
                    Digital
                  </a-radio>
                  <a-radio :value="3">
                    Test
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="gutter-box">
              <a-form-item label="仪表模式">
                <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_instrument_model', { }]">
                  <a-radio :value="1">
                    In Service
                  </a-radio>
                  <a-radio :value="2">
                    Out Of Service
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="执行机构类型">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_actuator_type', { }]">
                <a-radio :value="1">
                  弹簧薄膜
                </a-radio>
                <a-radio :value="2">
                  单作用气缸带弹簧
                </a-radio>
                <a-radio :value="3">
                  双作用气缸不带弹簧
                </a-radio>
                <a-radio :value="4">
                  双作用气缸带弹簧
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="零信号状态">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_zero_signal_state', {}
                ]" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="阀门类型">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_valve_type', {}
                ]" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="行程/压力选择">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_stroke_pressure_selection', {}
                ]" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="行程传感器方向">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_stroke_sensor_direction', {}
                ]" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="输入特性">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_input_characteristics', {}
                ]" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <a-form-item label="增益设定">
              <a-input
                :disabled="not_applicable"
                v-decorator="[
                  'hardware_check_locator_gain_setting', {}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <br>
      <!--拆卸检查组件-->
      <a-card title="拆卸检查组件" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-divider>接线盒</a-divider>
          <a-col :span="6">
            <a-form-item label="接线端子电阻">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_terminal_resistance', { }]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="是否存在水迹或灰尘">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_terminal_resistance_water', { }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-divider>I/P</a-divider>
          <a-col :span="6">
            <a-form-item label="动作是否正常">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_ip_active', { }]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="是否存在水迹或灰尘">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_ip_active_water', { }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-divider>Relay</a-divider>
          <a-col :span="6">
            <a-form-item label="动作是否正常">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_relay_active', { }]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="是否存在水迹或灰尘">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_relay_active_water', { }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-divider>PWB</a-divider>
          <a-col :span="6">
            <a-form-item label="动作是否正常">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_pwb_active', { }]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="是否存在水迹或灰尘">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_pwb_active_water', { }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-divider>模块基座和后壳体</a-divider>
          <a-col :span="6">
            <a-form-item label="密封件是否正常">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_base_shell_seal', { }]">
                <a-radio :value="1">
                  正常
                </a-radio>
                <a-radio :value="2">
                  异常
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="是否存在水迹或灰尘">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_base_shell_seal_water', { }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="气源接口是否正常">
              <a-radio-group :disabled="not_applicable" v-decorator="['hardware_check_locator_air_connection', { }]">
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
      </a-card>

      <br>

      <a-card title="工时" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <!-- 工时 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'localtor_intofactorycheck_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>
      <!-- 文件上传 -->
      <a-card :title="$t('menu.workOrder.upload.img')" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" >取消</a-button>
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
import { stepDone, saveStepPublic } from '@/api/step'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import pick from 'lodash.pick'
import UploadImg from '../../modules/UploadImg'

const fields = ['hardware_check_locator_nameplate', 'hardware_check_locator_grade_label', 'hardware_check_locator_exterior', 'hardware_check_locator_smudge',
'hardware_check_locator_pressure_gauge_range', 'hardware_check_locator_pressure_gauge_yesno', 'hardware_check_locator_amplifier_type', 'hardware_check_locator_amplifier_type',
'hardware_check_locator_terminal_voltage_4ma', 'hardware_check_locator_terminal_voltage_20ma', 'hardware_check_locator_pwb_production_code',
'hardware_check_locator_ip_production_code', 'hardware_check_locator_fireware_ver', 'hardware_check_locator_hart_tag', 'hardware_check_locator_instrument_serial',
'hardware_check_locator_received_control_mode', 'hardware_check_locator_instrument_model', 'hardware_check_locator_actuator_type', 'hardware_check_locator_zero_signal_state',
'hardware_check_locator_stroke_pressure_selection', 'hardware_check_locator_stroke_sensor_direction', 'hardware_check_locator_input_characteristics',
'hardware_check_locator_gain_setting', 'hardware_check_locator_terminal_resistance', 'hardware_check_locator_terminal_resistance_water',
'hardware_check_locator_ip_active', 'hardware_check_locator_ip_active_water', 'hardware_check_locator_relay_active', 'hardware_check_locator_relay_active_water',
'hardware_check_locator_pwb_active', 'hardware_check_locator_pwb_active_water', 'hardware_check_locator_base_shell_seal', 'hardware_check_locator_base_shell_seal_water',
'hardware_check_locator_air_connection', 'localtor_intofactorycheck_total_minute', 'hardware_check_locator_valve_type']

export default {
  name: 'TearDown',
  mixins: [baseMixin],
  components: {
      FooterToolBar,
      stepAllDetailModel,
      UploadImg
  },
  mounted () {
      fields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step

      if (editData.step_data && editData.step_data.length > 0) {
        this.$nextTick(() => {
          const installIAData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installIAData, fields))
          if (installIAData.uploads) {
              this.$refs.uploadImg.imgFileList = installIAData.uploads
          }
          this.not_applicable = installIAData.not_applicable
        })
      }
    },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.flow_id = this.flowID
          values.current_step = this.currentStep
          values.intofc_user_id = this.$store.state.user.info.id
          values.uploads = this.$refs.uploadImg.imgFileList
          values.not_applicable = this.not_applicable

          saveStepPublic(values).then(res => {
            this.$message.info('保存成功')
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
    },
    naChange (e) {
      this.not_applicable = e.target.checked
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      flowID: '',
      currentStep: '',
      not_applicable: false
    }
  }
}
</script>

<style>

</style>
