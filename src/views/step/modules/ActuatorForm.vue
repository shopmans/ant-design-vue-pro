<template>
  <div>
    <a-card title="维修执行要构信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="执行机构品牌">
            <a-input
              v-decorator="[
                'actu_manufacturer',
                {rules: [{ message: '请输入执行机构品牌'}]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="类型">
            <a-select
              v-decorator="[
                'actu_type',
                {rules: [{ message: '请选择类型'}]}
              ]" >
              <a-select-option value="1">弹簧薄膜</a-select-option>
              <a-select-option value="2">齿轮齿条</a-select-option>
              <a-select-option value="3">拔叉</a-select-option>
              <a-select-option value="5">旋转</a-select-option>
              <a-select-option value="4">其它</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="作用方式">
            <a-select
              v-decorator="[
                'actu_use_mode',
                {rules: [{ message: '请选择作用方式'}]}
              ]" >
              <a-select-option value="1">单作用</a-select-option>
              <a-select-option value="2">双作用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="序列号">
            <a-input v-decorator="[ 'actuator_serial', {rules: [{ message: '请输入序列号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="型号">
            <a-input v-decorator="[ 'actu_model', {rules: [{ message: '请输入型号', whitespace: true}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="尺寸">
            <a-input
              v-decorator="[
                'actu_size',
                {rules: [{ message: '请输入尺寸'}]}
              ]">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="动作方式">
            <a-select
              v-decorator="[
                'actu_action_mode',
                {rules: [{ message: '请选择动作方式'}]}
              ]" >
              <a-select-option value="1">PDTC</a-select-option>
              <a-select-option value="2">PDTO</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="弹簧设置压力">
            <a-input
              v-decorator="[
                'actu_spring_set_pressure',
                {rules: [{ message: '请输入弹簧设置压力'}]}
              ]">
              <a-select v-decorator="[ 'actu_spring_set_pressure_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 100px">
                <a-select-option value="1">
                  PSI
                </a-select-option>
                <a-select-option value="2">
                  BAR
                </a-select-option>
                <a-select-option value="3">
                  kg/cm2
                </a-select-option>
                <a-select-option value="4">
                  Kpa
                </a-select-option>
                <a-select-option value="5">
                  KG
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="故障失效">
            <a-select
              v-decorator="[
                'actu_failure',
                {rules: [{ message: '请选择故障失效'}]}
              ]" >
              <a-select-option value="1">Open</a-select-option>
              <a-select-option value="2">Close</a-select-option>
              <a-select-option value="3">Lock</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="安装位置">
            <a-select
              v-decorator="[
                'actu_install_point',
                {initialValue: '3', rules: [{ message: '请选择安装位置'}]}
              ]" >
              <a-select-option value="1">左手1位(LH1)</a-select-option>
              <a-select-option value="2">左手2位(LH2)</a-select-option>
              <a-select-option value="3">左手3位(LH3)</a-select-option>
              <a-select-option value="4">左手4位(LH4)</a-select-option>
              <a-select-option value="5">右手1位(RH1)</a-select-option>
              <a-select-option value="6">右手2位(RH2)</a-select-option>
              <a-select-option value="7">右手3位(RH3)</a-select-option>
              <a-select-option value="8">右手4位(RH4)</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="膜盖/缸盖螺栓工具">
            <a-row :gutter="0">
              <a-col :span="8">
                <a-input
                  v-decorator="[
                    'actu_cover_bolt_tool',
                    {rules: [{ message: '请输入膜盖/缸盖螺栓工具'}]}
                  ]"></a-input>
              </a-col>
              <a-col :span="8">
                <a-select
                  v-decorator="[
                    'actu_cover_bolt_tool_unit',
                    {rules: [{ message: '请选择单位'}]}
                  ]" >
                  <a-select-option value="1">inch</a-select-option>
                  <a-select-option value="2">mm</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="8">
                <a-select
                  v-decorator="[
                    'actu_cover_bolt_tool_item',
                    {rules: [{ message: '请选择安装位置'}]}
                  ]" >
                  <a-select-option value="1">呆扳手</a-select-option>
                  <a-select-option value="2">内六角</a-select-option>
                  <a-select-option value="3">套筒</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="膜盖/缸盖螺栓扭矩标准值">
            <a-input
              v-decorator="[
                'actu_cover_bolt_torque',
                {rules: [{ message: '请输入阀盖螺栓扭矩标准值'}]}
              ]">
              <a-select v-decorator="[ 'actu_cover_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  N-M
                </a-select-option>
                <a-select-option value="2">
                  Lbt-ft
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="膜盖/缸盖螺栓材质">
            <a-select
              v-decorator="[
                'actu_cover_bolt_material',
                {rules: [{ message: '请输入阀盖螺栓材质'}]}
              ]" >
              <a-select-option value="1">SST(不锈钢)</a-select-option>
              <a-select-option value="2">B7(碳钢)</a-select-option>
              <a-select-option value="3">B8(碳钢)</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="膜盖/缸盖螺栓尺寸">
            <a-input
              v-decorator="[
                'actu_cover_bolt_size',
                {rules: [{ message: '请输入阀盖螺栓尺寸'}]}
              ]">
              <a-select v-decorator="[ 'actu_cover_bolt_size_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  inch
                </a-select-option>
                <a-select-option value="2">
                  mm
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="气源压力">
            <a-input
              v-decorator="[
                'actu_air_pressed',
                {rules: [{ message: '请输入气源压力'}]}
              ]">
              <a-select v-decorator="[ 'actu_air_pressed_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
