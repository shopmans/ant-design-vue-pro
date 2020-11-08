<template>
  <page-header-wrapper>
    <installActuator />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import installActuator from '../../modules/InstallActuatorInfo'

export default {
  components: {
    installActuator
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
