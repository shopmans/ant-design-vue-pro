<template>
  <page-header-wrapper>
    <preRepairTestDetailInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import preRepairTestDetailInfo from '../../modules/TearDownInfo'

export default {
  components: {
    preRepairTestDetailInfo
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
