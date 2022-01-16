<template>
  <div>
    <a-card title="执行机构拆解" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <template slot="extra">
        <a-checkbox v-model="local_not_applicable" @change="valveNaChange">
          不适用
        </a-checkbox>
      </template>
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :span="8">
          <a-form-item>
            <div class="linehight">工时(min)</div>
            <a-input-number
              :disabled="disableAll"
              :min="0"
              style="width:100%;"
              v-decorator="[
                'teardown_actuator_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <div class="linehight">拆解工作及发现问题</div>
            <a-textarea
              :disabled="disableAll"
              rows="6"
              v-decorator="[
                'teardown_actuator_content',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <br>
      <a-form-item label="拆解日期">
        <a-row>
          <a-col :span="8">
            <a-date-picker :disabled="disableAll" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['teardown_actuator_date', {}]" style="width: 100%" />
          </a-col>
        </a-row>
      </a-form-item>
      <br>
      <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
        <ExecutorUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'2'" />
      </a-card>
    </a-card>
    <!-- 文件上传 -->
    <br>
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <uploadImg ref="uploadImg" :disableAll="disableAll" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
    </a-card>
  </div>
</template>

<script>
import ExecutorUser from '../../modules/ExecutorUser'
import uploadImg from '../../modules/UploadImg'

export default {
  components: {
    ExecutorUser,
    uploadImg
  },
  props: {
    flowID: {
      type: String,
      default: ''
    },
    currentStep: {
      type: String,
      default: ''
    },
    disableAll: {
      type: Boolean,
      default: false
    },
    isMobile: {
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
    if (data.teardown_actuator_not_applicable) {
      this.local_not_applicable = true
    }
  },
  methods: {
    valveNaChange (value) {
      this.$emit('actuatorNa', value)
    },
    getUploadImgData () {
      return this.$refs.uploadImg.imgFileList
    },
    setUploadImgData (data) {
      this.$refs.uploadImg.imgFileList = data
    }
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
