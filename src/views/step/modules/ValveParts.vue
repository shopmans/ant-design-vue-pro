<template>
  <div>
    <a-card title="维修零部件信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-form-item>
        <a-radio-group v-decorator="['valve_part_type', { required: true, message: '请选择零部件' }]">
          <a-radio :value="1">阀体</a-radio>
          <a-radio :value="2">阀笼/导向/保持环</a-radio>
          <a-radio :value="3">阀座环</a-radio>
          <a-radio :value="5">阀杆/轴</a-radio>
          <a-radio :value="6">定位器</a-radio>
          <a-radio :value="7">减压阀</a-radio>
          <a-radio :value="8">过滤器</a-radio>
          <a-radio :value="9">电磁阀</a-radio>
          <a-radio :value="10">位置变送器</a-radio>
          <a-radio :value="11">电气转换器</a-radio>
          <a-radio :value="12">位置开关</a-radio>
          <a-radio :value="13">保位/切换阀</a-radio>
          <a-radio :value="14">手轮</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-card>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
