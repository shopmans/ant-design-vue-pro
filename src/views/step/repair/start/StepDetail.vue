<template>
  <page-header-wrapper>
    <baseInfo />
    <br>
    <div style="float:right">
      <a-button type="primary" @click="cancelDetail">返回</a-button>
    </div>
  </page-header-wrapper>
</template>

<script>
import baseInfo from '../../modules/StepBaseInfo'

export default {
  components: {
    baseInfo
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
