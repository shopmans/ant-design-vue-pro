<template>
  <page-header-wrapper>
    <receiptInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import receiptInfo from '../../modules/ReceiptInfo'

export default {
  components: {
    receiptInfo
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
