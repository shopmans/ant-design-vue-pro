<template>
  <page-header-wrapper>
    <locatorPreRepairTestDetailInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import locatorPreRepairTestDetailInfo from '../../modules/LocatorPreRepairTestDetailInfo'

export default {
  components: {
    locatorPreRepairTestDetailInfo
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
