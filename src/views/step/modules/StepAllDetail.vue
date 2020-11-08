
<template>
  <stepAllDetailModel
    :visible="true"
    :showInModel="false"
    ref="stepDetailModel" />
</template>

<script>
import stepAllDetailModel from './StepAllDetailModel'

export default {
  components: {
    stepAllDetailModel
  },
  mounted () {
    const flowID = this.$route.params.flowID
    if (!flowID) {
      this.$message.error('获取流程ID失败')
      return
    }

    this.$refs.stepDetailModel.showSetpDetailData(flowID, '(start)')
  }
}
</script>

<style scope>
</style>
