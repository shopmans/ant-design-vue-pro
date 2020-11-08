<template>
  <div>
    <a-card title="执行机构泄漏测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">行程测试是否合格</div>
            <a-radio-group v-decorator="['actuator_leak_test_travel_is_success', { } ]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">气密性测试是否合格</div>
            <a-radio-group v-decorator="['actuator_leak_test_air_is_success', { } ]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">Bench Set</div>
            <a-radio-group v-decorator="['actuator_leak_test_benchset_is_success', { } ]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">是否合格</div>
            <a-radio-group v-decorator="['actuator_leak_test_is_success', { } ]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">工时(分钟)</div>
            <a-input-number
              style="width:100%;"
              :min="0"
              v-decorator="[
                'actuator_leak_test_total_minute',
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
