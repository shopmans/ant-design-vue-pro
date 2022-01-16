<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <!-- <template v-if="valveControlModel === 2"> -->
      <template v-if="valveControlModel === 2">
        <a-card title="调校" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
          <a-row>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item label="动作测试">
                <a-checkbox-group :disabled="not_applicable" v-decorator="['adjust_on_off_open_close', {rules: []}]">
                  <a-checkbox value="1">
                    开位正常
                  </a-checkbox>
                  <a-checkbox value="2" style="margin-left:50px;">
                    关位正常
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item label="气源压力设定值">
                <a-input
                  :disabled="not_applicable"
                  style="width:200px;"
                  v-decorator="[
                    'adjust_offon_air_pressed_set_value',
                    {rules: []}
                  ]">
                  <a-select v-decorator="[ 'adjust_offon_air_pressed_set_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
          <a-row>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">行程测试</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_leak_test_travel_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">气密性测试</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_leak_test_air_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">Bench Set</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_leak_test_benchset_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">位置开关-开</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_test_position_switch_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">位置开关-关</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_test_position_switch_close_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">保位阀动作</div>
                <a-radio-group :disabled="not_applicable" v-decorator="['adjust_test_retaining_valve_is_success', { } ]">
                  <a-radio :value="1">
                    合格
                  </a-radio>
                  <a-radio :value="2">
                    不合格
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item>
                <div class="linehight">保位阀设定点</div>
                <a-input
                  :disabled="not_applicable"
                  style="width:200px;"
                  v-decorator="[
                    'adjust_test_retaining_valve_set_point',
                    {rules: []}
                  ]">
                  <a-select v-decorator="[ 'adjust_test_retaining_valve_set_point_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
          <a-row>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item label="全关到全开(s)">
                <a-input
                  :disabled="not_applicable"
                  style="width:200px;"
                  :min="0"
                  v-decorator="[
                    'adjust_close_to_open_time',
                    {rules: []}
                  ]">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="12" :sm="24">
              <a-form-item label="全开到全关(s)">
                <a-input
                  :disabled="not_applicable"
                  style="width:200px;"
                  :min="0"
                  v-decorator="[
                    'adjust_open_to_close_time',
                    {rules: []}
                  ]">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider></a-divider>
          <!-- 结论 -->
          <a-form-item label="结论">
            <a-radio-group :disabled="not_applicable" v-decorator="['adjust_offopen_valve_conclustion', {rules: []}]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2" style="margin-left:50px;">
                不合格
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <!-- 见证人 -->
          <a-form-item label="见证人">
            <a-input :disabled="not_applicable" v-decorator="['adjust_offopen_valve_witness', {rules: []}]" style="width:200px;" />
          </a-form-item>

          <!-- 备注 -->
          <a-row>
            <a-col :span="12">
              <a-form-item label="备注">
                <a-textarea
                  :disabled="not_applicable"
                  rows="6"
                  v-decorator="[
                    'adjust_offopen_valve_test_memo',
                    {rules: []}
                  ]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </template>

      <!--
1: 定位器
2: 过滤减压阀
3: 电磁阀
4: 位置开关
5: 保位/切换阀
      -->

      <!-- <template v-if="valveControlModel === 1"> -->
      <template v-if="valveControlModel === 1 && selectArea.length>0">
        <a-card>
          <!-- ================================ 1: 定位器 ==================================== -->
          <template v-if="selectArea.indexOf('1')>=0">
            <a-divider>定位器</a-divider>
            <!-- 输入信号 -->
            <a-table :columns="inputSignalColumns" :dataSource="inputSignalData" :pagination="false" bordered>
              <template
                v-for="col in ['ma4', 'ma8', 'ma12', 'ma16', 'ma20', 'ma201', 'ma161', 'ma121', 'ma81', 'ma41']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    :disabled="not_applicable"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChangeInputSignal(e.target.value, record.key, col)"
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a :disabled="not_applicable" @click="() => saveInputSignal(record.key)">保存</a>
                  </span>
                  <span v-else>
                    <a :disabled="not_applicable" @click="() => editInputSignal(record.key)">编辑</a>
                  </span>
                </div>
              </template>
            </a-table>
            <br>
            <a-divider>死区</a-divider>
            <!-- 死区 -->
            <a-table :columns="deadBandColumns" :dataSource="deadBandData" :pagination="false" bordered>
              <template
                v-for="col in ['p0', 'p25', 'p50', 'p75', 'p100']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    :disabled="not_applicable"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChangeDeadBand(e.target.value, record.key, col)"
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a :disabled="not_applicable" @click="() => saveDeadBand(record.key)">保存</a>
                  </span>
                  <span v-else>
                    <a :disabled="not_applicable" @click="() => editDeadBand(record.key)">编辑</a>
                  </span>
                </div>
              </template>
            </a-table>
            <a-row>
              <a-col :span="6">
                <a-form-item label="全开到全关(s)">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    :min="0"
                    v-decorator="[
                      'adjust_deadband_open_to_close',
                      {rules: []}
                    ]">
                    <a-select :disabled="not_applicable" v-decorator="[ 'adjust_deadband_open_to_close_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
              <a-col :span="6">
                <a-form-item label="全关到全开(s)">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    :min="0"
                    v-decorator="[
                      'adjust_deadband_close_to_open',
                      {rules: []}
                    ]">
                    <a-select :disabled="not_applicable" v-decorator="[ 'adjust_deadband_close_to_open_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
              <a-col :span="6">
                <a-form-item label="线性">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_deadband_linearity',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="回差">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_deadband_hysteresis',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
            <br>
            <!-- 结论 -->
            <a-form-item label="结论">
              <a-radio-group :disabled="not_applicable" v-decorator="['adjust_control_valve_conclustion', {rules: []}]">
                <a-radio :value="1">
                  合格
                </a-radio>
                <a-radio :value="2" style="margin-left:50px;">
                  不合格
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <!-- 见证人 -->
            <a-form-item label="见证人">
              <a-input :disabled="not_applicable" v-decorator="['adjust_control_valve_witness', {rules: []}]" style="width:200px;" />
            </a-form-item>
          </template>

          <!-- ================================ 2: 过滤减压阀 ==================================== -->
          <template v-if="selectArea.indexOf('2')>=0">
            <a-divider>气源压力设定值</a-divider>

            <!-- 气源压力设定值 -->
            <a-row>
              <a-col :span="6">
                <a-form-item label="">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_control_air_pressed_set_value',
                      {rules: []}
                    ]">
                    <a-select :disabled="not_applicable" v-decorator="[ 'adjust_control_air_pressed_set_value_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            <br>
          </template>

          <!-- ================================ 3: 电磁阀 ==================================== -->
          <template v-if="selectArea.indexOf('3')>=0">
            <a-divider>电磁阀</a-divider>

            <!-- 电磁阀 -->
            <a-row>
              <a-col :span="6">
                <a-form-item label="动作">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_solenoid_valve_active',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="时间(秒)">
                  <a-input-number
                    :disabled="not_applicable"
                    style="width:200px;"
                    :min="0"
                    v-decorator="[
                      'adjust_solenoid_valve_time',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
            <br>
          </template>

          <!-- ================================ 4: 位置开关 ==================================== -->
          <template v-if="selectArea.indexOf('4')>=0">
            <a-divider>位置开关</a-divider>
            <a-row>
              <a-col :span="12">
                <a-row>
                  <a-divider >开位</a-divider>
                  <a-col :span="12">
                    <a-row>
                      <a-col>
                        <a-form-item label="闭合-输入信号mA">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_openposition_close_inputsig',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                      <a-col>
                        <a-form-item label="闭合-百分比%">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_openposition_close_percentage',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-row>
                      <a-col>
                        <a-form-item label="断开-输入信号mA">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_openposition_break_inputsig',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                      <a-col>
                        <a-form-item label="断开-百分比%">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_openposition_break_percentage',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
              <!-- 关位 -->
              <a-col :span="12">
                <a-row>
                  <a-divider>关位</a-divider>
                  <a-col :span="12">
                    <a-row>
                      <a-col>
                        <a-form-item label="闭合-输入信号mA">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_closeposition_close_inputsig',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                      <a-col>
                        <a-form-item label="闭合-百分比%">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_closeposition_close_percentage',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-row>
                      <a-col>
                        <a-form-item label="断开-输入信号mA">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_closeposition_break_inputsig',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                      <a-col>
                        <a-form-item label="断开-百分比%">
                          <a-input-number
                            :disabled="not_applicable"
                            :min="0"
                            style="width:200px;"
                            v-decorator="[
                              'adjust_closeposition_break_percentage',
                              {rules: []}
                            ]" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <br>
          </template>

          <!-- ================================ 5: 保位/切换阀 ==================================== -->
          <template v-if="selectArea.indexOf('5')>=0">
            <a-divider>保位/切换阀</a-divider>

            <!-- 保位/切换阀 -->
            <a-row>
              <a-col :span="6">
                <a-form-item label="动作">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_lockup_active',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="设定点">
                  <a-input
                    :disabled="not_applicable"
                    style="width:200px;"
                    v-decorator="[
                      'adjust_lockup_time',
                      {rules: []}
                    ]">
                    <a-select :disabled="not_applicable" v-decorator="[ 'adjust_lockup_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            <br>
          </template>

          <!-- 结论 -->
          <a-divider>结论</a-divider>
          <a-form-item label="结论">
            <a-radio-group :disabled="not_applicable" v-decorator="['adjust_conclustion', {rules: []}]">
              <a-radio :value="1">
                合格
              </a-radio>
              <a-radio :value="2" style="margin-left:50px;">
                不合格
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <!-- 见证人 -->
          <a-form-item label="见证人">
            <a-input :disabled="not_applicable" v-decorator="['adjust_witness', {rules: []}]" style="width:200px;" />
          </a-form-item>
          <a-divider>备注</a-divider>
          <a-form-item label="备注">
            <a-textarea :disabled="not_applicable" :rows="5" v-decorator="['adjust_memo',{rules: []}]" />
          </a-form-item>
          <br>

          <a-row :gutter="16" v-if="selectArea.length>0">
            <a-col :span="8">
              <a-form-item label="工时(min)">
                <a-input-number
                  :disabled="not_applicable"
                  style="width:100%;"
                  :min="0"
                  v-decorator="[
                    'adjust_total_minute',
                    {rules: []}
                  ]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </template>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br><br>

    <!-- 文件上传 -->
    <a-card :title="$t('menu.workOrder.upload.img')" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData } from '@/api/step'
  import { saveAdjustData, getInputSignalColumns, getInputSignalData, getDeadBandColumns, getDeadBandData } from '@/api/adjust'
  import UploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const adjustFields = ['adjust_total_minute', 'adjust_on_off_open_close', 'adjust_control_valve_conclustion',
  'adjust_deadband_open_to_close', 'adjust_deadband_close_to_open', 'adjust_deadband_linearity', 'adjust_deadband_hysteresis',
  'adjust_solenoid_valve_active', 'adjust_solenoid_valve_time', 'adjust_lockup_active', 'adjust_lockup_time',
  'adjust_conclustion', 'adjust_memo', 'adjust_deadband_open_to_close_unit', 'adjust_deadband_close_to_open_unit',
  'adjust_lockup_time_unit', 'adjust_test_active_close', 'adjust_leak_test_travel_is_success', 'adjust_leak_test_air_is_success',
  'adjust_openposition_close_inputsig', 'adjust_openposition_close_percentage', 'adjust_openposition_break_inputsig', 'adjust_openposition_break_percentage',
  'adjust_closeposition_close_inputsig', 'adjust_closeposition_close_percentage', 'adjust_closeposition_break_inputsig', 'adjust_closeposition_break_percentage',
  'adjust_control_valve_witness', 'adjust_witness', 'adjust_leak_test_benchset_is_success', 'adjust_test_position_switch_is_success',
  'adjust_test_position_switch_close_is_success', 'adjust_test_retaining_valve_is_success', 'adjust_test_retaining_valve_set_point',
  'adjust_test_retaining_valve_set_point_unit', 'adjust_close_to_open_time', 'adjust_open_to_close_time', 'adjust_offopen_valve_conclustion',
  'adjust_offopen_valve_witness', 'adjust_offopen_valve_test_memo', 'adjust_offon_air_pressed_set_value', 'adjust_offon_air_pressed_set_value_unit',
  'adjust_control_air_pressed_set_value', 'adjust_control_air_pressed_set_value_unit', 'not_applicable']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel
    },
    mounted () {
      adjustFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads

      if (editData.step_data.length > 0) {
        this.$nextTick(() => {
          const installIAData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installIAData, adjustFields))
          this.$refs.uploadImg.imgFileList = installIAData.uploads
          this.not_applicable = installIAData.not_applicable
          if (installIAData.inputSignalData) { this.inputSignalData = installIAData.inputSignalData }
          if (installIAData.deadBandData) { this.deadBandData = installIAData.deadBandData }
        })
      }

      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
      res.result.step_data.forEach(stepItem => {
        switch (stepItem.DataNum) {
          case 1: { // baseInfo
            const baseData = JSON.parse(stepItem.JSON)
            // 开关阀、调节阀数据
            if (baseData.control_model === '1') { // 调节阀
              this.valveControlModel = 1
              return
            }
            if (baseData.control_model === '2') { // 开关阀
              this.valveControlModel = 2
              return
            }

            this.$message.info('不能识别的阀类型(开关阀、调节阀)')
            break
          }
          case 4: {
            const tmpData = JSON.parse(stepItem.JSON)
            this.selectArea = tmpData.other_slave_select_area
            if (!this.selectArea) {
              this.selectArea = () => ([])
            }
            break
          }
        }
      })
    })
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            values.inputSignalData = this.inputSignalData
            values.feedBackData = this.feedBackData
            values.deadBandData = this.deadBandData
            values.not_applicable = this.not_applicable

            saveAdjustData(values).then(res => {
              this.$message.info('保存成功')
              // eslint-disable-next-line no-undef
              callFlutterBacktoList.postMessage('save_step_ok') // 告诉移动端vue页面本流程已经保存成功
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.back(-1)
      },
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
      },
      handleStepDone () {
        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flowID, current_step: letThis.currentStep }).then(res => {
                // 刷新表格
                letThis.$message.info('结束流程成功')
                letThis.$router.push({ path: '/step/steplist' })
            })
          }
        })
      },
      // 编辑输入信号
      editInputSignal (key) {
        const newData = [...this.inputSignalData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.inputSignalData = newData
        }
      },
      // 保存输入信号
      saveInputSignal (key) {
        const newData = [...this.inputSignalData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.inputSignalData = newData
        }
      },
      // 输入信号change
      handleChangeInputSignal (value, key, column) {
        const newData = [...this.inputSignalData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.inputSignalData = newData
        }
      },
      // ========================编辑位置反馈
      editFeedBack (key) {
        const newData = [...this.feedBackData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.feedBackData = newData
        }
      },
      // 保存位置反馈
      saveFeedBack (key) {
        const newData = [...this.feedBackData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.feedBackData = newData
        }
      },
      // 位置反馈change
      handleChangeFeedBack (value, key, column) {
        const newData = [...this.feedBackData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.feedBackData = newData
        }
      },
      // ========================编辑死区
      editDeadBand (key) {
        const newData = [...this.deadBandData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.deadBandData = newData
        }
      },
      // 保存位置反馈
      saveDeadBand (key) {
        const newData = [...this.deadBandData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.deadBandData = newData
        }
      },
      // 位置反馈change
      handleChangeDeadBand (value, key, column) {
        const newData = [...this.deadBandData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.deadBandData = newData
        }
      },
      refreshUploads () {
        queryStepData({ id: this.flowID, current_step: this.currentStep }).then(res => {
          if (res.result.step_data && res.result.step_data.length > 0) {
            const tmpData = JSON.parse(res.result.step_data[0].JSON)
            this.$refs.uploadImg.imgFileList = tmpData.uploads
            this.$message.info('上传照片成功')
          }
        })
      },
      naChange (e) {
        this.not_applicable = e.target.checked
      }
    },
    data () {
      return {
        inputSignalColumns: getInputSignalColumns(),
        inputSignalData: getInputSignalData(),
        deadBandColumns: getDeadBandColumns(),
        deadBandData: getDeadBandData(),
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        valveControlModel: 0,
        selectArea: [], // 新建工单附件选择的区域
        not_applicable: false
      }
    }
  }
</script>

<style>

</style>
