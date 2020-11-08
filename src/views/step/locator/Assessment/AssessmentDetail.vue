<template>
  <page-header-wrapper>
    <locatorAssessmentInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import locatorAssessmentInfo from '../../modules/LocatorAssessmentInfo'

export default {
  components: {
    locatorAssessmentInfo
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
