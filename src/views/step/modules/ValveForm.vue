<template>
  <div>
    <a-card :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门出厂日期">
            <a-date-picker
              style="width:100%;"
              valueFormat="YYYY-MM-DDTHH:mm:ssZ"
              v-decorator="[
                'valve_manufacture_date',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门投运日期">
            <a-date-picker
              style="width:100%;"
              valueFormat="YYYY-MM-DDTHH:mm:ssZ"
              v-decorator="[
                'valve_production_date',
                {rules: []}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>阀门信息</a-divider>
      <!-- 行1 -->
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门类型">
            <editSelect :typeData="getValveTypeList()" v-decorator="[ 'valve_type', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_type',
                  {initialValue: '', rules: [{ message: '请输入阀类型'}]}
                ]"
                style="width: 65%" />
              <a-select style="width: 35%" @change="selectValveTypeChange" :allowClear="true">
                <a-select-option v-for="item in valveTypeList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀门型号">
            <a-input
              v-decorator="[
                'valve_model',
                {rules: [{ message: '请输入阀体型号'}]}
              ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="压力等级">
            <editSelect :typeData="getValvePressureList()" v-decorator="[ 'valve_pressure_level', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_pressure_level',
                  {rules: [{}]}
                ]"
                style="width: 65%" />
              <a-select default-value="" style="width: 35%" @change="selectPressureInputChange" :allowClear="true">
                <a-select-option v-for="item in ValvePressureList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="连接方式">
            <editSelect :typeData="getValveConnectModel()" v-decorator="[ 'valve_connect_model', {rules: [{ message: ''}]} ]" />
            <!-- <a-select
              v-decorator="[
                'valve_connect_model',
                {rules: [{ message: '请选择连接方式'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">RF</a-select-option>
              <a-select-option value="2">RTJ</a-select-option>
              <a-select-option value="3">对夹</a-select-option>
              <a-select-option value="4">焊接</a-select-option>
              <a-select-option value="5">螺纹</a-select-option>
              <a-select-option value="6">其它</a-select-option>
            </a-select> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门流向">
            <editSelect :typeData="getValveFlowList()" v-decorator="[ 'valve_flow', {rules: [{ message: ''}]} ]" />
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
              <a-select v-decorator="[ 'valve_travel_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门口径">
            <a-input
              v-decorator="[
                'valve_caliber',
                {rules: [{ message: '请输入口径'}]}
              ]">
              <a-select v-decorator="[ 'valve_caliber_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option value="1">
                  inch
                </a-select-option>
                <a-select-option value="2">
                  mm
                </a-select-option>
                <a-select-option value="3">
                  N/A
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
            <editSelect :typeData="getValveTrimChar()" v-decorator="[ 'valve_flow_char', {rules: [{ message: ''}]} ]" />
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
              <a-select v-decorator="[ 'valve_rod_diameter_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀体材质">
            <editSelect :typeData="getValveMaterial()" v-decorator="[ 'valve_material', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀芯/阀球/蝶板材质">
            <editSelect :typeData="getValveCoreBallBettlefly()" v-decorator="[ 'valve_core_ball_bettlefly', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀座环/蝶阀密封圈材质">
            <editSelect :typeData="getValveSetRing()" v-decorator="[ 'valve_set_ring', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀笼/保持环材质">
            <editSelect :typeData="getValveCageRetainingRing()" v-decorator="[ 'valve_cage_retaining_ring', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀杆/阀轴材质">
            <editSelect :typeData="getValveStemAxis()" v-decorator="[ 'valve_stem_axis', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="衬套/轴承材质">
            <editSelect :typeData="getValveVillageBearing()" v-decorator="[ 'valve_village_bearing', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="垫片材质">
            <editSelect :typeData="getValveSpacerData()" v-decorator="[ 'valve_spacer', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="法兰螺栓工具">
            <a-input
              v-decorator="[
                'valve_flange_bolt_tool',
                {rules: [{ message: '请输入法兰螺栓工具'}]}
              ]">
              <a-select v-decorator="[ 'valve_flange_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
              <a-select v-decorator="[ 'valve_connect_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option value="1">
                  inch
                </a-select-option>
                <a-select-option value="2">
                  mm
                </a-select-option>
                <a-select-option value="3">
                  N/A
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀门品牌">
            <editSelect @change="selectInputChange" :typeData="getValvaBanner()" v-decorator="[ 'valve_manufacturer', {rules: [{ message: ''}]} ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item label="阀门尺寸">
            <a-input
              v-decorator="[
                'valve_size',
                {rules: [{ message: '请输入阀门尺寸'}]}
              ]">
              <a-select v-decorator="[ 'valve_size_unit', {initialValue: '1', rules: [{ message: '请选择阀尺寸单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
            label="Push down to">
            <editSelect :typeData="['Open', 'Close']" v-decorator="[ 'valve_push_done', {rules: [{ message: ''}]} ]" />
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
              <a-select v-decorator="[ 'valve_cover_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option value="1">
                  N.m
                </a-select-option>
                <a-select-option value="2">
                  Lbf.ft
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="阀盖螺栓材质">
            <editSelect :typeData="getValveCoverBoltMaterial()" v-decorator="[ 'valve_cover_bolt_material', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_cover_bolt_material',
                  {rules: [{}]}
                ]"
                style="width: 50%" />
              <a-select default-value="" style="width: 50%" @change="selectValveCoverBoltMaterialChange" :allowClear="true">
                <a-select-option v-for="item in ValveCoverBoltMaterial" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
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
              <a-select v-decorator="[ 'valve_cover_bolt_size_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
              <a-select v-decorator="[ 'valve_cover_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
            label="阀座螺栓扭矩标准值">
            <a-input
              v-decorator="[
                'valve_seat_bolt_torque',
                {rules: [{ message: '请输入阀座螺栓扭矩标准值'}]}
              ]">
              <a-select v-decorator="[ 'valve_seat_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option value="1">
                  N.m
                </a-select-option>
                <a-select-option value="2">
                  Lbf.ft
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
              <a-select v-decorator="[ 'valve_seat_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
            <editSelect :typeData="getValveFillInputList()" v-decorator="[ 'valve_fill_config', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_fill_config',
                  {rules: [{}]}
                ]"
                style="width: 50%" />
              <a-select default-value="" style="width: 50%" @change="selectValveFillInputChange" :allowClear="true">
                <a-select-option v-for="item in ValveFillInputList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
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
              <a-select v-decorator="[ 'valve_fill_bolt_tool_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
              <a-select v-decorator="[ 'valve_fill_bolt_torque_unit', {initialValue: '1', rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option value="1">
                  N.m
                </a-select-option>
                <a-select-option value="2">
                  Lbf.ft
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider>阀座泄漏测试</a-divider>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏测试标准">
            <editSelect :typeData="getValveFillInputList()" v-decorator="[ 'valve_seat_leak_test', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_seat_leak_test',
                  {rules: [{}]}
                ]"
                style="width: 65%" />
              <a-select default-value="" style="width: 35%" @change="selectValveLeakTestInputChange" :allowClear="true">
                <a-select-option v-for="item in ValveLeakTestInputList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏等级">
            <editSelect :typeData="getValveLeakLevelList()" v-decorator="[ 'valve_leak_level', {rules: [{ message: ''}]} ]" />
            <!-- <a-select
              v-decorator="[
                'valve_leak_level',
                {rules: [{ message: '请选择泄漏等级'}]}
              ]"
              :allowClear="true"
              @change="selectValveLeakLevelInputChange">
              <a-select-option v-for="item in ValveLeakLevelList" :value="item" :key="item">
                {{ item }}
              </a-select-option>
            </a-select> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="泄漏测试介质">
            <editSelect :typeData="getValveLeakTestMedium()" v-decorator="[ 'valve_leak_test_medium', {rules: [{ message: ''}]} ]" />
            <!-- <a-select v-decorator="[ 'valve_leak_test_medium', {rules: [{ message: '请选择单位'}]}]" :allowClear="true">
              <a-select-option value="1">
                水
              </a-select-option>
              <a-select-option value="2">
                压缩空气
              </a-select-option>
              <a-select-option value="3">
                氮气
              </a-select-option>
            </a-select> -->
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
              <a-select v-decorator="[ 'valve_leak_test_std_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option v-for="item in StdTestPressed" :value="item" :key="item">
                  {{ item }}
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
              <a-select v-decorator="[ 'valve_leak_test_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 120px" :allowClear="true">
                <a-select-option value="1">
                  SCFH
                </a-select-option>
                <a-select-option value="2">
                  ml/min
                </a-select-option>
                <a-select-option value="3">
                  bbl/min
                </a-select-option>
                <a-select-option value="4">
                  cc/min
                </a-select-option>
                <a-select-option value="5">
                  L/min
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
              <a-select v-decorator="[ 'valve_leak_test_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
            <editSelect :typeData="getValveTestMedium()" v-decorator="[ 'valve_test_medium', {rules: [{ message: ''}]} ]" />
            <!-- <a-select
              v-decorator="[
                'valve_test_medium',
                {rules: [{ message: '请选择泄漏等级'}]}
              ]"
              :allowClear="true" >
              <a-select-option value="1">
                水
              </a-select-option>
              <a-select-option value="2">
                气
              </a-select-option>
            </a-select> -->
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="12" :sm="24">
          <a-form-item
            label="水压测试标准">
            <editSelect :typeData="getValveTestStd()" v-decorator="[ 'valve_test_std', {rules: [{ message: ''}]} ]" />
            <!-- <a-input-group compact>
              <a-input
                v-decorator="[
                  'valve_test_std',
                  {rules: [{}]}
                ]"
                style="width: 65%" />
              <a-select default-value="" style="width: 35%" @change="selectValveStdTestInputChange" :allowClear="true">
                <a-select-option v-for="item in ValveStdTestInputList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-input-group> -->
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
              <a-select v-decorator="[ 'valve_hydrostatic_test_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
                <a-select-option v-for="item in StdTestPressed" :value="item" :key="item">
                  {{ item }}
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
              <a-select v-decorator="[ 'valve_hydrostatic_test_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
import { getValvaBanner, getValvePressureList, getValveFlowList, getValveFillInputList, getValveLeakTestInputList, getValveStdTestInputList,
getValveCoreBallBettlefly, getValveStemAxis, getValveCageRetainingRing, getValveSetRing, getValveVillageBearing, getValveSpacerData,
getValveCoverBoltMaterial, getValveTypeList, getValveLeakLevelList, getValveMaterial, getValveStdTestPressedList, getValveTrimChar,
getValveConnectModel, getValveLeakTestMedium, getValveTestMedium, getValveTestStd } from '@/api/step'
import editSelect from '@/components/EditSelect'
// import pick from 'lodash.pick'

export default {
  components: {
    editSelect
  },
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
        valveSetRingSwitch: false,
        valveSetRingSwitchValue: false,
        ValveLeakTestInputList: getValveLeakTestInputList(),
        ValveStdTestInputList: getValveStdTestInputList(),
        valveSerialData: [],
        StdTestPressed: getValveStdTestPressedList()
      }
    },
    mounted () {
      // ['valve_manufacturer'].forEach(v => this.form.getFieldDecorator(v))
    },
    methods: {
      getValveTypeList,
      getValvaBanner,
      getValvePressureList,
      getValveMaterial,
      getValveFlowList,
      getValveTrimChar,
      getValveConnectModel,
      getValveCoreBallBettlefly,
      getValveStemAxis,
      getValveCageRetainingRing,
      getValveSetRing,
      getValveVillageBearing,
      getValveSpacerData,
      getValveCoverBoltMaterial,
      getValveFillInputList,
      getValveLeakLevelList,
      getValveLeakTestMedium,
      getValveTestMedium,
      getValveTestStd,
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
      },
      valveSerialInputSwitchChange (checked) {
        this.valveSetRingSwitch = checked
        this.valveSetRingSwitchValue = checked
      },
      selectInputChange (value) {
        this.$emit('selectInputChange', { valve_manufacturer: value })
      },
      selectPressureInputChange (value) {
        this.$emit('selectInputChange', { valve_pressure_level: value })
      },
      selectValvaFlowInputChange (value) {
        this.$emit('selectInputChange', { valve_flow: value })
      },
      selectValveFillInputChange (value) {
        this.$emit('selectInputChange', { valve_fill_config: value })
      },
      selectValveCoreBallBettleflyChange (value) {
        this.$emit('selectInputChange', { valve_core_ball_bettlefly: value })
      },
      selectValveStemAxisChange (value) {
        this.$emit('selectInputChange', { valve_stem_axis: value })
      },
      selectValveCageRetainingRingChange (value) {
        this.$emit('selectInputChange', { valve_cage_retaining_ring: value })
      },
      selectValveSetRingChange (value) {
        this.$emit('selectInputChange', { valve_set_ring: value })
      },
      selectValveVillageBearingChange (value) {
        this.$emit('selectInputChange', { valve_village_bearing: value })
      },
      selectValveSpacerChange (value) {
        this.$emit('selectInputChange', { valve_spacer: value })
      },
      selectValveCoverBoltMaterialChange (value) {
        this.$emit('selectInputChange', { valve_cover_bolt_material: value })
      },
      selectValveLeakTestInputChange (value) {
        this.$emit('selectInputChange', { valve_seat_leak_test: value })
      },
      selectValveStdTestInputChange (value) {
        this.$emit('selectInputChange', { valve_test_std: value })
      },
      selectValveTypeChange (value) {
        this.$emit('selectInputChange', { valve_type: value })
      },
      selectValveLeakLevelInputChange (value) {
        this.$emit('selectInputChange', { valve_leak_level: value })
      },
      selectValveMaterialChange (value) {
        this.$emit('selectInputChange', { valve_material: value })
      }
    }
}
</script>

<style>

</style>
