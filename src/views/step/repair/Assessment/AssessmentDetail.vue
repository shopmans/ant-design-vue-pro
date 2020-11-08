<template>
  <page-header-wrapper>
    <AssessmentInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import AssessmentInfo from '../../modules/AssessmentInfo'

export default {
  components: {
    AssessmentInfo
  },
  methods: {
      cancelDetail () {
        this.$router.push({ path: '/step/steplist' })
      }
  }
}
</script>

<style>

</style>
