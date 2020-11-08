<template>
  <div>
    <a-card title="维修附件信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-divider>定位器</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="定位器品牌">
            <a-input v-decorator="[ 'slave_locator_brand', {rules: [{ message: '请输入定位器定位器品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="定位器序列号">
            <a-input v-decorator="[ 'slave_locator_serial', {rules: [{ message: '请输入定位器序列号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="定位器型号">
            <a-input v-decorator="[ 'slave_locator_model', {rules: [{ message: '请输入定位器型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="定位器作用方式">
            <a-select
              v-decorator="[
                'slave_locator_actionmode',
                {rules: [{ message: '请选择定位器作用方式'}]}
              ]" >
              <a-select-option value="1">正作用</a-select-option>
              <a-select-option value="2">反作用</a-select-option>
              <a-select-option value="3">双作用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="输入信号范围">
            <a-select
              v-decorator="[
                'slave_input_signal_scope',
                {initialValue: '1', rules: [{ message: '请选择电磁阀品牌'}]}
              ]" >
              <a-select-option value="1">4-20mA</a-select-option>
              <a-select-option value="2">4-12mA</a-select-option>
              <a-select-option value="3">12-20mA</a-select-option>
              <a-select-option value="4">3-9 Psi</a-select-option>
              <a-select-option value="5">3-15 Psi</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="标准输出">
            <a-select
              v-decorator="[
                'slave_standard_output',
                {initialValue: '2', rules: [{ message: '请输入标准输出'}]}
              ]" >
              <a-select-option value="1">100-75-50-25-0</a-select-option>
              <a-select-option value="2">0-25-50-75-100</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>过滤减压阀</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="过滤减压阀品牌">
            <a-input v-decorator="[ 'slave_filter_valve_brand', {rules: [{ message: '请输入过滤减压阀品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="过滤减压阀型号">
            <a-input v-decorator="[ 'slave_filter_valve_model', {rules: [{ message: '请输入过滤减压阀型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>电磁阀</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀品牌1">
            <a-input v-decorator="[ 'slave_elect_valve_brand1', {rules: [{ message: '请输入电磁阀品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀型号1">
            <a-input v-decorator="[ 'slave_elect_valve_model1', {rules: [{ message: '请输入电磁阀型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀电压1">
            <a-input v-decorator="[ 'slave_elect_valve_vol1', {rules: [{ message: '请输入电磁阀电压', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀动作1">
            <a-select
              v-decorator="[
                'slave_elect_valve_active1',
                {rules: [{ message: '请选择电磁阀动作'}]}
              ]" >
              <a-select-option value="1">开</a-select-option>
              <a-select-option value="2">关</a-select-option>
              <a-select-option value="3">保位</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀品牌2">
            <a-input v-decorator="[ 'slave_elect_valve_brand2', {rules: [{ message: '请输入电磁阀品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀型号2">
            <a-input v-decorator="[ 'slave_elect_valve_model2', {rules: [{ message: '请输入电磁阀型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀电压2">
            <a-input v-decorator="[ 'slave_elect_valve_vol2', {rules: [{ message: '请输入电磁阀电压', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀动作2">
            <a-select
              v-decorator="[
                'slave_elect_valve_active2',
                {rules: [{ message: '请选择电磁阀动作'}]}
              ]" >
              <a-select-option value="1">开</a-select-option>
              <a-select-option value="2">关</a-select-option>
              <a-select-option value="3">保位</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀品牌3">
            <a-input v-decorator="[ 'slave_elect_valve_brand3', {rules: [{ message: '请输入电磁阀品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀型号3">
            <a-input v-decorator="[ 'slave_elect_valve_model3', {rules: [{ message: '请输入电磁阀型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀电压3">
            <a-input v-decorator="[ 'slave_elect_valve_vol3', {rules: [{ message: '请输入电磁阀电压', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="电磁阀动作3">
            <a-select
              v-decorator="[
                'slave_elect_valve_active3',
                {rules: [{ message: '请选择电磁阀动作'}]}
              ]" >
              <a-select-option value="1">开</a-select-option>
              <a-select-option value="2">关</a-select-option>
              <a-select-option value="3">保位</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>位置开关</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="位置开关品牌">
            <a-input v-decorator="[ 'slave_point_switch_brand', {rules: [{ message: '请输入位置开关品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="位置开关型号">
            <a-input v-decorator="[ 'slave_point_switch_model', {rules: [{ message: '请输入位置开关型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>保位/切换阀</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="保位阀品牌">
            <a-input v-decorator="[ 'slave_retaining_valve_brand', {rules: [{ message: '请输入保位阀品牌', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="保位阀型号">
            <a-input v-decorator="[ 'slave_retaining_valve_model', {rules: [{ message: '请输入电磁阀型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="保位阀设定点">
            <a-input v-decorator="[ 'slave_retaining_valve_setpoint', {rules: [{ message: '请输入保位阀设定点', whitespace: true}]} ]">
              <a-select v-decorator="[ 'slave_retaining_valve_setpoint_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  PSI
                </a-select-option>
                <a-select-option value="2">
                  BAR
                </a-select-option>
                <a-select-option value="3">
                  MPa
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="保位阀动作">
            <a-select
              v-decorator="[
                'slave_retaining_valve_active',
                {rules: [{ message: '请选择保位阀动作'}]}
              ]" >
              <a-select-option value="1">开</a-select-option>
              <a-select-option value="2">关</a-select-option>
              <a-select-option value="3">保位</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>其它附件</a-divider>
      <a-row :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="其它附件">
            <a-input v-decorator="[ 'slave_other_slave', {rules: [{ message: '请输入其它附件', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <div><br><br></div>
    </a-card>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
