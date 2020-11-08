<template>
  <page-header-wrapper>
    <locatorAdjustInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import locatorAdjustInfo from '../../modules/LocatorAdjustInfo'

export default {
  components: {
    locatorAdjustInfo
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
