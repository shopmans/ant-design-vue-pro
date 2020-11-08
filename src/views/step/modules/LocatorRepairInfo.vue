<template>
  <div>
    <a-card :bordered="false" title="维修内容">
      <a-textarea disabled rows="5" v-model="repairData.localtor_repair_content" />
    </a-card>

    <br>

    <a-card :bordered="false" title="工时">
      <a-descriptions :column="4">
        <a-descriptions-item label="工时">{{ repairData.localtor_repair_total_minute }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'

export default {
    components: {
        UploadImgRead
    },
    data () {
        return {
            repairData: {}
        }
    },
    methods: {
    },
    mounted () {
      if (this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.info('没有执行数据')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData

      this.repairData = JSON.parse(editData.step_data[0].JSON)
      if (this.repairData.uploads) {
          this.$refs.uploadImgRead.imgFileList = this.repairData.uploads
      }
  }
}
</script>

<style scoped>
</style>
