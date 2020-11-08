<template>
  <div>
    <a-card title="阀门拆解" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">工时(分钟)</div>
            <a-input-number
              :min="0"
              style="width:100%;"
              v-decorator="[
                'teardown_valve_total_minute',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <div class="linehight">拆解工作及发现问题</div>
            <a-textarea
              rows="6"
              v-decorator="[
                'teardown_valve_content',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <br><br>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
