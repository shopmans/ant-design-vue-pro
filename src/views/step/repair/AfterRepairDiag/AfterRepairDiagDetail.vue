<template>
  <page-header-wrapper>
    <AfterRepairDiagInfo :showBaseInfo="true" />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import AfterRepairDiagInfo from '../../modules/AfterRepairDiagInfo'

export default {
  components: {
    AfterRepairDiagInfo
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
