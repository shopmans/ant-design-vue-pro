<template>
  <page-header-wrapper>
    <locatorRepairInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import locatorRepairInfo from '../../modules/LocatorRepairInfo'

export default {
  components: {
    locatorRepairInfo
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
