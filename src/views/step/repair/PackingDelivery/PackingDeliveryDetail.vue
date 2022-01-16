<template>
  <page-header-wrapper>
    <PackingDeliveryInfo :showBaseInfo="true" />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import PackingDeliveryInfo from '../../modules/PackingDeliveryInfo'

export default {
  components: {
    PackingDeliveryInfo
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
