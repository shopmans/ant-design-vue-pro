<template>
  <page-header-wrapper>
    <locatorIntoFactoryInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import locatorIntoFactoryInfo from '../../modules/LocatorIntoFactoryCheckInfo'

export default {
  components: {
    locatorIntoFactoryInfo
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
