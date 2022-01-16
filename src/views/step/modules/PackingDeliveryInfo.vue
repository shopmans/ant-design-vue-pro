<template>
  <div>
    <a-card title="完成日期" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="完成日期">{{ packingDeliveryData.package_delivery_done_date | moment }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card title="工时" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="工时(min)">{{ packingDeliveryData.work_time }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="packingDeliveryData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!packingDeliveryData.not_applicable">
          否
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadFileRead from '../modules/UploadFileRead'
import UploadImgRead from '../modules/UploadImgRead'

export default {
  components: {
    UploadFileRead,
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.packingDeliveryData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.$refs.uploadImgRead.imgFileList = this.packingDeliveryData.uploads
  },
  data () {
    return {
      packingDeliveryData: {}
    }
  }
}
</script>

<style>

</style>
