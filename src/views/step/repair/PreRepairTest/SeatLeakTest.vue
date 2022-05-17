<template>
  <div>
    <!-- 执行人 -->
    <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
      <template slot="extra">
        <a-checkbox :disabled="isDone" v-model="local_not_applicable" @change="localNotApplicableChange">
          不适用
        </a-checkbox>
      </template>
      <dispatchUser :disableAll="disableAll || isDone" :flowID="flowId" :currentStep="currentStep" :flag="'1'" />
      <a-row :gutter="8">
        <a-col :span="4">
          <a-form-item>
            <div class="linehight">工时(min)</div>
            <a-input-number
              :disabled="disableAll || isDone"
              :min="0"
              style="width:100%;"
              v-decorator="[
                'seat_leak_test_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="测试日期">
            <a-date-picker :disabled="disableAll || isDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['seat_leak_test_date', {}]" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <br>
    <a-card title="阀座泄漏测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="阀座泄漏等级">{{ valveData.valve_leak_level }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试介质">{{ getValveTestMediumUnit(valveData.valve_leak_test_medium) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏标准测试压力">{{ getValveHydrostaticTestValueUnitText(valveData.valve_leak_test_std_pressed, valveData.valve_leak_test_std_pressed_unit) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试时间">{{ getValveHydrostaticTestTimeUnitText(valveData.valve_leak_test_time, valveData.valve_leak_test_time_unit) }}</a-descriptions-item>
        <a-descriptions-item label="泄漏测试标准值">{{ getValveSeatLeakTestUnitText(valveData.valve_leak_test_value, valveData.valve_leak_test_value_unit) }}</a-descriptions-item>
      </a-descriptions>
      <a-divider></a-divider>
      <a-row class="form-row" :gutter="36">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">阀座泄漏实际测试介质</div>
            <a-select :disabled="disableAll || isDone" v-decorator="[ 'seat_leak_test_real_medium', {rules: [{ message: '请选择介质'}]}]" :allowClear="true">
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
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">实际测试压力</div>
            <a-input
              :disabled="disableAll || isDone"
              v-decorator="[
                'seat_leak_test_real_pressed',
                {rules: []}
              ]">
              <a-select :disabled="disableAll || isDone" v-decorator="[ 'seat_leak_test_real_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  Psig
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
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">实际测试值</div>
            <a-input :disabled="disableAll || isDone" v-decorator="[ 'seat_leak_test_real_value', {} ]">
              <a-select :disabled="disableAll || isDone" v-decorator="[ 'seat_leak_test_real_value_unit', {rules: [{ message: ''}]} ]" slot="addonAfter" style="width: 120px" >
                <a-select-option value="1">SCFH</a-select-option>
                <a-select-option value="2">ml/min</a-select-option>
                <a-select-option value="3">bbl/min</a-select-option>
                <a-select-option value="4">cc/min</a-select-option>
                <a-select-option value="5">L/min</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="36">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">实际测试时间(分钟)</div>
            <a-input-number
              :disabled="disableAll || isDone"
              style="width:200px;"
              :min="0"
              v-decorator="[
                'seat_leak_test_test_real_time',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">是否合格</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['seat_leak_test_is_success', {} ]" @change="onChange">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">见证人</div>
            <a-input
              :disabled="disableAll || isDone"
              style="width:100%;"
              v-decorator="[
                'seat_leak_test_witness',
                {rules: []}
              ]" />
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
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['prerepair_content_1', {rules: []}]">
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
        <a-textarea :disabled="disableAll || isDone" v-decorator="['prerepair_memo_1',{rules: []}]" rows="4" />
      </a-form-item>
    </a-card>
    <!-- 文件上传 -->
    <br>
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :disableAll="disableAll || isDone" :queueType="'3'" :isMobile="isMobile" :flag="'3'" />
    </a-card>
    <br>
    <a-card>
      <div style="float:right;">
        <a-button style="margin-right: 8px;" :disabled="disableAll || isDone" type="primary" @click="doneTab">操作完毕</a-button>
        <a-button :disabled="disableAll" @click="editTab">编辑</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import dispatchUser from '@/views/step/modules/DispatchUser'
import { getValveLeakLevel, getValveSeatLeakTestUnitText, getValveTestMediumUnit, getValveHydrostaticTestValueUnitText,
getValveHydrostaticTestTimeUnitText } from '@/api/step'
import UploadImg from '../../modules/UploadImg'

export default {
  components: {
    dispatchUser,
    UploadImg
  },
  props: {
    valveData: {
      type: Object,
      default: null
    },
    flowId: {
      type: String,
      default: null
    },
    currentStep: {
      type: String,
      default: null
    },
    disableAll: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    disableAll (val) {
      this.local_not_applicable = val
    }
  },
  mounted () {
    const editData = this.$store.state.editStepData.stepEditData
    const data = JSON.parse(editData.step_data[0].JSON)
    if (data.valve_leak_test_not_applicable === '1') {
      this.local_not_applicable = true
    }
  },
  methods: {
    getValveLeakLevel,
    getValveSeatLeakTestUnitText,
    getValveTestMediumUnit,
    getValveHydrostaticTestValueUnitText,
    getValveHydrostaticTestTimeUnitText,
    onChange (e) {
      if (e.target.value === 2) {
        this.$emit('notOk')
      }
    },
    localNotApplicableChange (e) {
      var tmpValue = e.target.checked ? '1' : '0'
      this.$emit('setFieldValue', 'valve_leak_test_not_applicable', tmpValue)
    },
    getUploadImgData () {
      return this.$refs.uploadImg.imgFileList
    },
    setUploadImgData (data) {
      this.$refs.uploadImg.imgFileList = data
    },
    doneTab () { this.$emit('done') },
    editTab () { this.$emit('edit') }
  },
  data () {
    return {
      local_not_applicable: false
    }
  }
}
</script>

<style>

</style>
