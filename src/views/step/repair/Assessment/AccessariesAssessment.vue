<template>
  <div>
    <a-card title="附件评估" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <template slot="extra">
        <a-checkbox :disabled="isDone" v-model="local_not_applicable" @change="accessoryNaChange">
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
        <AssessmentRow
          :disableAll="disableAll"
          :isDone="isDone"
          :rowoptions="item"
          :key="item.state"
          :selectArea="selectArea"
          :otherSelectArea="otherSelectArea" />
      </template>
      <br>
      <!-- 评估人员 -->
      <a-card title="评估人员" :headStyle="{fontWeight:'bold'}">
        <dispatchUser :disableAll="disableAll || isDone" :flowID="flowID" :currentStep="currentStep" :flag="'3'" />
      </a-card>
      <!-- 文件上传 -->
      <br>
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <uploadImg ref="uploadImg" :disableAll="disableAll || isDone" :isMobile="isMobile" :queueType="'3'" :flag="'3'" />
      </a-card>
    </a-card>
    <br>
    <a-card>
      <div style="float:right;">
        <a-button style="margin-right: 8px;" :disabled="disableAll || isDone" type="primary" @click="doneTab">操作完毕</a-button>
        <a-button :disabled="disableAll" @click="editTab">编辑</a-button>
      </div>
    </a-card>
    <br><br>
  </div>
</template>

<script>
import AssessmentRow from '../../modules/AssessmentRow'
import dispatchUser from '../../modules/DispatchUser'
import { getAccessariesASFields } from '@/api/assessment'
import uploadImg from '../../modules/UploadImg'

  const rowoptions = getAccessariesASFields()

export default {
  components: {
    AssessmentRow,
    dispatchUser,
    uploadImg
  },
  props: {
    selectArea: {
      type: Array,
      default: null
    },
    otherSelectArea: {
      type: Array,
      default: null
    },
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
      if (data.accessaries_not_applicable) {
        this.local_not_applicable = true
      }
    }
  },
  methods: {
    accessoryNaChange (value) {
      this.$emit('accessariesNaChange', value)
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
      rowoptions,
      local_not_applicable: false
    }
  }
}

</script>

<style>
</style>
