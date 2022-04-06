<template>
  <div>
    <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
      <template slot="extra">
        <a-checkbox :disabled="isDone" v-model="local_not_applicable" @change="valveNaChange">
          不适用
        </a-checkbox>
      </template>
      <dispatchUser :disableAll="disableAll || isDone" :flowID="flowID" :currentStep="currentStep" :flag="'2'" />
      <a-row class="form-row" :gutter="8">
        <a-col :span="4">
          <a-form-item>
            <div class="linehight">工时(min)</div>
            <a-input-number
              :disabled="disableAll || isDone"
              :min="0"
              style="width:100%;"
              v-decorator="[
                'teardown_actuator_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-form-item label="拆解日期">
          <a-row>
            <a-col :span="4">
              <a-date-picker :disabled="disableAll || isDone" valueFormat="YYYY-MM-DDTHH:mm:ssZ" v-decorator="['teardown_actuator_date', {}]" style="width: 100%" />
            </a-col>
          </a-row>
        </a-form-item>
      </a-row>
    </a-card>
    <br>
    <a-card title="执行机构拆解" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row class="form-row" :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <div class="linehight">拆解工作及发现问题</div>
            <a-textarea
              :disabled="disableAll || isDone"
              rows="6"
              v-decorator="[
                'teardown_actuator_content',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <!-- 文件上传 -->
    <br>
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <uploadImg2 ref="uploadImg2" :disableAll="disableAll || isDone" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
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
import dispatchUser from '../../modules/DispatchUser'
import uploadImg2 from '../../modules/UploadImg2'

export default {
  components: {
    dispatchUser,
    uploadImg2
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
    if (editData.step_data.length > 0) {
      const data = JSON.parse(editData.step_data[0].JSON)
      if (data.teardown_actuator_not_applicable) {
        this.local_not_applicable = true
      }
    }
  },
  methods: {
    valveNaChange (value) {
      this.$emit('actuatorNa', value)
    },
    getUploadImgData () {
      return this.$refs.uploadImg2.imgFileList
    },
    setUploadImgData (data) {
      this.$refs.uploadImg2.imgFileList = data
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
