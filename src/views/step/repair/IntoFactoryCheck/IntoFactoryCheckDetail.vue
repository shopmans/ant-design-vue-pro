<template>
  <page-header-wrapper>
    <intoFactoryInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import intoFactoryInfo from '../../modules/IntoFactoryCheckInfo'

export default {
  components: {
    intoFactoryInfo
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
