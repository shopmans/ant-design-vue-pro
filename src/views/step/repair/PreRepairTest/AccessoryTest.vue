<template>
  <div>
    <a-card title="附件功能测试" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">定位器(4mA 12mA 20mA)</div>
            <a-radio-group v-decorator="['accessory_locator_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
              <!-- <a-input v-decorator="[ 'accessory_test_locator', {rules: []} ]" /> -->
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">过滤减压阀</div>
            <a-radio-group v-decorator="['accessory_test_filter_reducing_valve_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">位置开关</div>
            <a-radio-group v-decorator="['accessory_test_position_switch_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 行2 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">电磁阀</div>
            <a-radio-group v-decorator="['accessory_test_elec_valve_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">气动放大器</div>
            <a-radio-group v-decorator="['accessory_test_pneumatic_amplifier_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">保位/切换阀</div>
            <a-radio-group v-decorator="['accessory_test_retaining_valve_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 行3 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item>
            <div class="linehight">其它</div>
            <a-radio-group v-decorator="['accessory_test_other_is_success', { } ]">
              <a-radio :value="1">
                正常
              </a-radio>
              <a-radio :value="2">
                异常
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col>
          <a-form-item>
            <div class="linehight">备注</div>
            <a-textarea
              rows="6"
              v-decorator="[
                'accessory_test_memo',
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
