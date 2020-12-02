<template>
  <div>
    <a-card title="维修阀门信息" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-divider>阀门信息</a-divider>
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀类型">
            <a-select
              @change="handleValveTypeChange"
              v-decorator="[
                'valve_type',
                {rules: [{ message: '请选择阀类型'}]}
              ]" >
              <a-select-option value="1">GLOBE balanced</a-select-option>
              <a-select-option value="2">GLOBE unbalanced</a-select-option>
              <a-select-option value="3">Butterfly</a-select-option>
              <a-select-option value="4">Ball</a-select-option>
              <a-select-option value="5">Others</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门品牌">
            <a-input
              v-decorator="[
                'valve_manufacturer',
                {rules: [{ message: '请输入阀门品牌'}]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-row>
            <a-col :span="18">
              <a-form-item
                label="阀门序列号">
                <a-select
                  ref="valveSelect"
                  show-search
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="handleValveSearch"
                  @change="selectValveSerialChange"
                  v-decorator="[ 'valve_serial', {rules: [{ required: true, message: '请输入阀门序列号'}]} ]"
                  v-if="showSerialValue"
                >
                  <a-select-option v-for="d in valveSerialData" :key="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select>
                <a-input v-if="!showSerialValue" v-decorator="[ 'valve_serial', {rules: [{ required: true, message: '请输入阀门序列号' }]} ]" ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-switch :checked="switchChecked" v-decorator="[ 'valve_serial_switch', {rules: [{ required: false }]} ]" style="margin-top:45px;margin-left:5px;" @change="valveSerialInputSwitch"></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀体型号">
            <a-input
              v-decorator="[
                'valve_model',
                {rules: [{ message: '请输入阀体型号'}]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀门尺寸">
            <a-input
              v-decorator="[
                'valve_size',
                {rules: [{ message: '请输入阀门尺寸'}]}
              ]">
              <a-select v-decorator="[ 'valve_size_unit', {initialValue: '1', rules: [{ message: '请选择阀尺寸单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="阀门材质">
            <a-select
              v-decorator="[
                'valve_material',
                {rules: [{ message: '请选择阀门材质'}]}
              ]" >
              <a-select-option value="1">WCB</a-select-option>
              <a-select-option value="2">WCC</a-select-option>
              <a-select-option value="3">WC5</a-select-option>
              <a-select-option value="4">WC6</a-select-option>
              <a-select-option value="5">WC9</a-select-option>
              <a-select-option value="6">SST</a-select-option>
              <a-select-option value="7">C3FM</a-select-option>
              <a-select-option value="8">C8FM</a-select-option>
              <a-select-option value="9">Cast</a-select-option>
              <a-select-option value="10">Iron</a-select-option>
              <a-select-option value="11">A216 WCB</a-select-option>
              <a-select-option value="13">Carbon Steel</a-select-option>
              <a-select-option value="12">None</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门压力等级">
            <a-select
              v-decorator="[
                'valve_pressure_level',
                {rules: [{ message: '请选择阀门压力等级'}]}
              ]" >
              <a-select-option value="1">class 125</a-select-option>
              <a-select-option value="2">class 150</a-select-option>
              <a-select-option value="3">class 250</a-select-option>
              <a-select-option value="4">class 300</a-select-option>
              <a-select-option value="5">class 600</a-select-option>
              <a-select-option value="6">class 900</a-select-option>
              <a-select-option value="7">class 1500</a-select-option>
              <a-select-option value="8">class 2500</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门流向">
            <template v-if="valueTypeValue == '99'">
              <a-input
                v-decorator="[
                  'not_user'
                ]" />
            </template>
            <template v-else>
              <template v-if="valueTypeValue != '5'">
                <a-select
                  v-decorator="[
                    'valve_flow',
                    {rules: [{ message: '请选择阀门流向'}]}
                  ]">
                  <a-select-option v-for="(item, index) in selectArray" :value="selectArrayKey[index]" :key="selectArrayKey[index]" >{{ item }}</a-select-option>
                </a-select>
              </template>
              <template v-else>
                <a-input
                  v-decorator="[
                    'valve_flow_input',
                    {rules: [{ message: '请选择阀门流向'}]}
                  ]" />
              </template>
            </template>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="Push down to">
            <a-select
              v-decorator="[
                'valve_push_done',
                {rules: [{ message: '请选择向下压'}]}
              ]" >
              <a-select-option value="1">Open</a-select-option>
              <a-select-option value="2">Close</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门行程">
            <a-input
              v-decorator="[
                'valve_travel',
                {rules: [{ message: '请输入阀门行程'}]}
              ]">
              <a-select v-decorator="[ 'valve_travel_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  inch
                </a-select-option>
                <a-select-option value="2">
                  mm
                </a-select-option>
                <a-select-option value="3">
                  °
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀门Cv值">
            <a-input
              v-decorator="[
                'valve_lv',
                {rules: [{ message: '请输入阀门Cv值'}]}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀内件特性">
            <a-select
              v-decorator="[
                'valve_flow_char',
                {rules: [{ message: '请选择阀内件特性'}]}
              ]" >
              <a-select-option value="1">线性</a-select-option>
              <a-select-option value="3">快开</a-select-option>
              <a-select-option value="2">等百分比</a-select-option>
              <a-select-option value="4">修正等百分比</a-select-option>
              <a-select-option value="5">定制</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀杆直径">
            <a-input
              v-decorator="[
                'valve_rod_diameter',
                {rules: [{ message: '请输入口径'}]}
              ]">
              <a-select v-decorator="[ 'valve_rod_diameter_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="口径">
            <a-input
              v-decorator="[
                'valve_caliber',
                {rules: [{ message: '请输入口径'}]}
              ]">
              <a-select v-decorator="[ 'valve_caliber_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="连接方式">
            <a-select
              v-decorator="[
                'valve_connect_model',
                {rules: [{ message: '请选择连接方式'}]}
              ]" >
              <a-select-option value="1">RF</a-select-option>
              <a-select-option value="2">RTJ</a-select-option>
              <a-select-option value="3">对夹</a-select-option>
              <a-select-option value="4">焊接</a-select-option>
              <a-select-option value="5">螺纹</a-select-option>
              <a-select-option value="6">其它</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="法兰螺栓工具">
            <a-input
              v-decorator="[
                'valve_flange_bolt_tool',
                {rules: [{ message: '请输入法兰螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_flange_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="连接夹块螺栓工具">
            <a-input
              v-decorator="[
                'valve_connect_bolt_tool',
                {rules: [{ message: '请输入连接夹块螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_connect_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="阀芯/阀球/蝶板材质">
            <a-select v-decorator="[ 'valve_core_ball_bettlefly', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                S31600
              </a-select-option>
              <a-select-option value="2">
                S41600
              </a-select-option>
              <a-select-option value="3">
                S31600/CORA-A
              </a-select-option>
              <a-select-option value="4">
                S44004
              </a-select-option>
              <a-select-option value="5">
                CF3M
              </a-select-option>
              <a-select-option value="6">
                CF8M
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀杆/阀轴材质">
            <a-select v-decorator="[ 'valve_stem_axis', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                S31600
              </a-select-option>
              <a-select-option value="2">
                S17400
              </a-select-option>
              <a-select-option value="3">
                S20910
              </a-select-option>
              <a-select-option value="4">
                17-4PH
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀笼/保持环材质">
            <a-select v-decorator="[ 'valve_cage_retaining_ring', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                S31600/CORA-A
              </a-select-option>
              <a-select-option value="2">
                S17400
              </a-select-option>
              <a-select-option value="3">
                Carbon Steel
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀座环材质">
            <a-select v-decorator="[ 'valve_set_ring', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                S31600
              </a-select-option>
              <a-select-option value="2">
                S41600
              </a-select-option>
              <a-select-option value="3">
                S42000
              </a-select-option>
              <a-select-option value="4">
                R30006
              </a-select-option>
              <a-select-option value="5">
                316SST
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="村套/轴承材质">
            <a-select v-decorator="[ 'valve_village_bearing', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                S31600
              </a-select-option>
              <a-select-option value="2">
                R30006
              </a-select-option>
              <a-select-option value="3">
                PEEK
              </a-select-option>
              <a-select-option value="4">
                316/NITRIDED
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="垫片材质">
            <a-select v-decorator="[ 'valve_spacer', {rules: [{ message: '请选择单位'}]}]">
              <a-select-option value="1">
                Graphite
              </a-select-option>
              <a-select-option value="2">
                Spiral wound gasket
              </a-select-option>
              <a-select-option value="3">
                Graphite/ Spiral wound gasket
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>阀盖</a-divider>
      <!-- 行4 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀盖螺栓扭矩标准值">
            <a-input
              v-decorator="[
                'valve_cover_bolt_torque',
                {rules: [{ message: '请输入阀盖螺栓扭矩标准值'}]}
              ]">
              <a-select v-decorator="[ 'valve_cover_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="阀盖螺栓材质">
            <a-select
              v-decorator="[
                'valve_cover_bolt_material',
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
            label="阀盖螺栓尺寸">
            <a-input
              v-decorator="[
                'valve_cover_bolt_size',
                {rules: [{ message: '阀盖螺栓尺寸'}]}
              ]">
              <a-select v-decorator="[ 'valve_cover_bolt_size_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="阀盖螺栓工具">
            <a-input
              v-decorator="[
                'valve_cover_bolt_tool',
                {rules: [{ message: '请输入阀盖螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_cover_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
      </a-row>
      <a-divider>阀座</a-divider>
      <!-- 行5 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀座泄漏测试标准">
            <a-select
              v-decorator="[
                'valve_seat_leak_test',
                {rules: [{ message: '请选择阀座泄漏测试标准'}]}
              ]" >
              <a-select-option value="1">API598</a-select-option>
              <a-select-option value="2">FCI70-2</a-select-option>
              <a-select-option value="3">FGS4L5</a-select-option>
              <a-select-option value="4">FGS4L6</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏等级">
            <a-select
              v-decorator="[
                'valve_leak_level',
                {rules: [{ message: '请选择泄漏等级'}]}
              ]" >
              <a-select-option value="1">Class Ⅱ</a-select-option>
              <a-select-option value="2">Class Ⅲ</a-select-option>
              <a-select-option value="3">Class Ⅳ</a-select-option>
              <a-select-option value="4">Class Ⅴ</a-select-option>
              <a-select-option value="5">Class Ⅵ</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀座螺栓扭矩标准值">
            <a-input
              v-decorator="[
                'valve_seat_bolt_torque',
                {rules: [{ message: '请输入阀座螺栓扭矩标准值'}]}
              ]">
              <a-select v-decorator="[ 'valve_seat_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="阀座螺栓工具">
            <a-input
              v-decorator="[
                'valve_seat_bolt_tool',
                {rules: [{ message: '请输入阀座螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_seat_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
      </a-row>
      <a-divider>填料</a-divider>
      <!-- 行6 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="填料配置">
            <a-select
              v-decorator="[
                'valve_fill_config',
                {rules: [{ message: '请选择填料配置'}]}
              ]" >
              <a-select-option value="1">PTFE/Single</a-select-option>
              <a-select-option value="2">PTFE/Double</a-select-option>
              <a-select-option value="3">COMPOSITION</a-select-option>
              <a-select-option value="4">Graphite/Single</a-select-option>
              <a-select-option value="5">Graphite/Double</a-select-option>
              <a-select-option value="6">Enviro-Seal</a-select-option>
              <a-select-option value="7">PTFE</a-select-option>
              <a-select-option value="8">Env-Seal Graph</a-select-option>
              <a-select-option value="9">Hi-Seal Graph</a-select-option>
              <a-select-option value="10">FFKM</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="填料螺栓工具">
            <a-input
              v-decorator="[
                'valve_fill_bolt_tool',
                {rules: [{ message: '请输入填料螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_fill_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="填料螺栓扭矩标准值">
            <a-input
              v-decorator="[
                'valve_fill_bolt_torque',
                {rules: [{ message: '请输入填料螺栓扭矩标准值'}]}
              ]">
              <a-select v-decorator="[ 'valve_fill_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
      </a-row>
      <a-divider>阀座测试</a-divider>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏测试介质">
            <a-select v-decorator="[ 'valve_leak_test_medium', {rules: [{ message: '请选择单位'}]}]" >
              <a-select-option value="1">
                水
              </a-select-option>
              <a-select-option value="2">
                压缩空气
              </a-select-option>
              <a-select-option value="3">
                氮气
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏标准测试压力">
            <a-input
              v-decorator="[
                'valve_leak_test_std_pressed',
                {rules: [{ message: '请输入口径'}]}
              ]">
              <a-select v-decorator="[ 'valve_leak_test_std_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="泄漏测试标准值">
            <a-input
              v-decorator="[
                'valve_leak_test_value',
                {rules: [{ message: '请输入口径'}]}
              ]">
              <a-select v-decorator="[ 'valve_leak_test_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 120px">
                <a-select-option value="1">
                  SCFH
                </a-select-option>
                <a-select-option value="2">
                  ml/min
                </a-select-option>
                <a-select-option value="3">
                  bubbles/min
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="测试时间">
            <a-input
              v-decorator="[
                'valve_leak_test_time',
                {rules: [{ message: '请输入时间'}]}
              ]">
              <a-select v-decorator="[ 'valve_leak_test_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  Min
                </a-select-option>
                <a-select-option value="2">
                  Sec
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>水压测试</a-divider>
      <!-- 行4 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="水压测试介质">
            <a-select
              v-decorator="[
                'valve_test_medium',
                {rules: [{ message: '请选择泄漏等级'}]}
              ]" >
              <a-select-option value="1">
                水
              </a-select-option>
              <a-select-option value="2">
                气
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="水压测试标准">
            <a-select
              v-decorator="[
                'valve_test_std',
                {rules: [{ message: '请选水压测试标准'}]}
              ]" >
              <a-select-option value="1">
                API598
              </a-select-option>
              <a-select-option value="2">
                FGS4LI
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="水压测试标准值">
            <a-input
              v-decorator="[
                'valve_hydrostatic_test_value',
                {rules: [{ message: '请输入水压测试标准值'}]}
              ]">
              <a-select v-decorator="[ 'valve_hydrostatic_test_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            label="水压测试时间">
            <a-input
              v-decorator="[
                'valve_hydrostatic_test_time',
                {rules: [{ message: '请输入水压测试时间'}]}
              ]">
              <a-select v-decorator="[ 'valve_hydrostatic_test_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                <a-select-option value="1">
                  Min
                </a-select-option>
                <a-select-option value="2">
                  Sec
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 行10 -->
      <div><br><br></div>
    </a-card>
  </div>
</template>

<script>
import { fetch } from '@/utils/inputSearch'
import { querySparePartsBySerial } from '@/api/spareParts'
// import pick from 'lodash.pick'

export default {
    data () {
      this.format = 'YYYY-MM-DD'
      return {
        form: this.$form.createForm(this),
        selectArray: [],
        selectArrayKey: [],
        globeValveTypeSelect: ['上', '下', '双密封环'],
        globeValveTypeSelectKey: ['1', '2', '3'],
        butterflyValveTypeSelect: ['阀板侧流向阀杆侧', '阀杆侧流向阀板侧', '双向流'],
        butterflyValveTypeSelectKey: ['4', '5', '6'],
        BallValveTypeSelect: ['正向流', '反向流', '双向流'],
        BallValveTypeSelectKey: ['7', '8', '9'],
        valueTypeValue: '1', // 决定流向字段是选择还是输入
        showSerialValue: true,
        valveSerialData: [],
        switchChecked: false
      }
    },
    mounted () {
      // ['valveSelect_id'].stepValveFields.forEach(v => this.form.getFieldDecorator(v))
    },
    methods: {
      nextStep () {
          const { form: { validateFields } } = this
          // 先校验，通过表单校验后，才进入下一步
          validateFields((err, values) => {
              if (!err) {
              this.$emit('nextStep')
              }
          })
          },
      prevStep () {
          this.$emit('prevStep')
      },
      handleValveTypeChange (value) {
        this.valueTypeValue = '99'
        this.$nextTick(() => {
          switch (value) {
            case '2':
            case '1': { // 选择的  GLOBE balanced    GLOBE unbalanced
              this.selectArray = this.globeValveTypeSelect
              this.selectArrayKey = this.globeValveTypeSelectKey
              this.valueTypeValue = '1'
              break
            }
            case '3': {
              this.selectArray = this.butterflyValveTypeSelect
              this.selectArrayKey = this.butterflyValveTypeSelectKey
              this.valueTypeValue = '1'
              break
            }
            case '4': {
              this.selectArray = this.BallValveTypeSelect
              this.selectArrayKey = this.BallValveTypeSelectKey
              this.valueTypeValue = '1'
              break
            }
            case '5': {
              this.valueTypeValue = '5'
            }
          }
        })
              // <a-select-option value="1">GLOBE balanced</a-select-option>
              // <a-select-option value="2">GLOBE unbalanced</a-select-option>
              // <a-select-option value="3">Butterfly</a-select-option>
              // <a-select-option value="4">Ball</a-select-option>
              // <a-select-option value="5">Others</a-select-option>
      },
      handleValveSearch (value) {
        this.valveSerialData.length = 0
        fetch(value, data => (this.valveSerialData = data), this.$t('input.valve.parts.search'))
      },
      selectValveSerialChange (value) {
        const that = this
        console.log(value)
        querySparePartsBySerial({ serial: value }).then(e => {
          e.valve_model = e.model
          e.valve_serial = e.serial
          console.log(e)
          that.$emit('selectValveSerialChange', e)
        })
      },
      addValveSelectData (id, text, switchValue) {
        this.valveSerialData.push({
          value: id,
          text: text
        })
        this.switchChecked = switchValue
        if (this.switchChecked) { // 开关打开，即使用纯input
          this.showSerialValue = false
        }
      },
      valveSerialInputSwitch (checked) {
        this.showSerialValue = !checked
        this.switchChecked = checked
      }
    }
}
</script>

<style>

</style>
