<template>
  <page-header-wrapper>
    <preRepairTestDetailInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import preRepairTestDetailInfo from '../../modules/PreRepairTestDetailInfo'

export default {
  components: {
    preRepairTestDetailInfo
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
