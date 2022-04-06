<template>
  <div>
    <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
      <template slot="extra">
        <a-checkbox :disabled="isDone" v-model="local_not_applicable" @change="localNotApplicableChange">
          不适用
        </a-checkbox>
      </template>
      <dispatchUser :disableAll="disableAll || isDone" :flowID="flowId" :currentStep="currentStep" :flag="'2'" />
      <a-row :gutter="8">
        <a-col :span="4">
          <a-form-item>
            <div class="linehight">工时(min)</div>
            <a-input-number
              :disabled="disableAll || isDone"
              style="width:100%;"
              :min="0"
              v-decorator="[
                'actuator_leak_test_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="测试日期">
            <a-date-picker :disabled="disableAll || isDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['actuator_leak_test_date', {}]" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <br>
    <a-card title="执行机构泄漏测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">行程测试</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['actuator_leak_test_travel_is_success', { } ]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2">
                不合格
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">气密性测试</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['actuator_leak_test_air_is_success', { } ]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2">
                不合格
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">Bench Set是否正确</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['actuator_leak_test_benchset_is_success', { } ]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2">
                不合格
              </a-radio>
              <a-radio :value="99">
                N/A
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">是否合格</div>
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['actuator_leak_test_is_success', { } ]" @change="onChange">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2">
                不合格
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
            <a-radio-group :disabled="disableAll || isDone" v-decorator="['prerepair_content_2', {rules: []}]">
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
        <a-textarea :disabled="disableAll || isDone" v-decorator="['prerepair_memo_2',{rules: []}]" rows="4" />
      </a-form-item>
    </a-card>
    <!-- 文件上传 -->
    <br>
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :disableAll="disableAll || isDone" :isMobile="isMobile" :queueType="'3'" :flag="'5'" />
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
import UploadImg from '../../modules/UploadImg'

export default {
  components: {
    dispatchUser,
    UploadImg
  },
  props: {
    flowId: {
      type: String,
      default: null
    },
    currentStep: {
      type: String,
      default: null
    },
    mainForm: {
      type: Object,
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
  mounted () {
    const editData = this.$store.state.editStepData.stepEditData
    const data = JSON.parse(editData.step_data[0].JSON)
    if (data.actuator_leak_test_not_applicable === '1') {
      this.local_not_applicable = true
    }
  },
  watch: {
    disableAll (val) {
      this.local_not_applicable = val
    }
  },
  methods: {
    onChange (e) {
      if (e.target.value === 2) {
        this.$emit('notOk')
      }
    },
    localNotApplicableChange (e) {
      var tmpValue = e.target.checked ? '1' : '0'
      this.$emit('setFieldValue', 'actuator_leak_test_not_applicable', tmpValue)
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
