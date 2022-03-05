<template>
  <page-header-wrapper>
    <intoFactoryInfo />
    <br>
    <div style="float:right;">
      <a-button type="primary" @click="cancelDetail">返回</a-button>
    </div>
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
        this.$router.back(-1)
      }
  }
}
</script>

<style>

</style>
