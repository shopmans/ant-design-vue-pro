
<template>
  <page-header-wrapper>
    <stepAllDetailModel
      :visible="true"
      :showInModel="false"
      ref="stepDetailModel" />
    <br>
    <div style="float: right">
      <a-button v-if:="showButton" type="primary" @click="cancelDetail">取消</a-button>
    </div>
  </page-header-wrapper>
</template>

<script>
import stepAllDetailModel from './StepAllDetailModel'

export default {
  components: {
    stepAllDetailModel
  },
  data () {
    return {
      showButton: false
    }
  },
  mounted () {
    const flowID = this.$route.params.flowID
    if (!flowID) {
      this.$message.error('获取流程ID失败')
      return
    }

    if (this.$route.params.cancelButton) {
      this.showButton = true
    }

    this.$refs.stepDetailModel.showSetpDetailData(flowID, '(start)')
  },
  methods: {
    cancelDetail () {
      this.pageDataStack.popPageData(this.$store)
      this.$router.back(-1)
    }
  }
}
</script>

<style scope>
</style>
