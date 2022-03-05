<template>
  <page-header-wrapper>
    <PreRepairDiagInfo :showBaseInfo="true" />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import PreRepairDiagInfo from '../../modules/PreRepairDiagInfo'

export default {
  components: {
    PreRepairDiagInfo
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
