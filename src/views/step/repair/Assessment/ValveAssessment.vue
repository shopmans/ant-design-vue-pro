<template>
  <div>
    <a-card title="阀门评估" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <template slot="extra">
        <a-checkbox v-model="local_not_applicable" @change="valveNaChange">
          不适用
        </a-checkbox>
      </template>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box">
            <a-divider>状态</a-divider>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="20">
          <div class="gutter-box">
            <a-divider>维修动作</a-divider>
          </div>
        </a-col>
      </a-row>
      <template v-for="item in rowoptions">
        <AssessmentRow :disableAll="disableAll" :rowoptions="item" :key="item.state" />
      </template>
      <br>
      <!-- 评估人员 -->
      <a-card title="评估人员" :headStyle="{fontWeight:'bold'}">
        <dispatchUser :disableAll="disableAll" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
      </a-card>
      <!-- 文件上传 -->
      <br>
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <uploadImg ref="uploadImg" :disableAll="disableAll" :isMobile="isMobile" :queueType="'3'" :flag="'1'" />
      </a-card>
    </a-card>
    <br><br>
  </div>
</template>

<script>
import AssessmentRow from '../../modules/AssessmentRow'
import { getValveASFields } from '@/api/assessment'
import dispatchUser from '../../modules/DispatchUser'
import uploadImg from '../../modules/UploadImg'

const rowoptions = getValveASFields()

export default {
  components: {
      AssessmentRow,
      dispatchUser,
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
    if (editData.step_data.length > 0) {
      const data = JSON.parse(editData.step_data[0].JSON)
      if (data.valve_not_applicable) {
        this.local_not_applicable = true
      }
    }
  },
  methods: {
    valveNaChange (value) {
      this.$emit('valveNaChange', value)
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
        rowoptions,
        local_not_applicable: false
    }
  }
}

</script>

<style>
</style>
