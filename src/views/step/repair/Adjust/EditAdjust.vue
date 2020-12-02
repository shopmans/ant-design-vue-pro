<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <template v-if="valveControlModel === 2">
        <a-card title="调校" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
          <a-divider>开关型</a-divider>
          <a-form-item label="">
            <a-checkbox-group v-decorator="['adjust_on_off_open_close', {rules: []}]">
              <a-checkbox value="1">
                开位正常
              </a-checkbox>
              <a-checkbox value="2" style="margin-left:50px;">
                关位正常
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <br>
        </a-card>
      </template>

      <template v-if="valveControlModel === 1">
        <a-card>
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
                  <a @click="() => saveInputSignal(record.key)">保存</a>
                </span>
                <span v-else>
                  <a @click="() => editInputSignal(record.key)">编辑</a>
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
                  <a @click="() => saveDeadBand(record.key)">保存</a>
                </span>
                <span v-else>
                  <a @click="() => editDeadBand(record.key)">编辑</a>
                </span>
              </div>
            </template>
          </a-table>
          <a-row>
            <a-col :span="6">
              <a-form-item label="全开到全关(s)">
                <a-input
                  style="width:200px;"
                  :min="0"
                  v-decorator="[
                    'adjust_deadband_open_to_close',
                    {rules: []}
                  ]">
                  <a-select v-decorator="[ 'adjust_deadband_open_to_close_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
                  style="width:200px;"
                  :min="0"
                  v-decorator="[
                    'adjust_deadband_close_to_open',
                    {rules: []}
                  ]">
                  <a-select v-decorator="[ 'adjust_deadband_close_to_open_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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
            <a-radio-group v-decorator="['adjust_control_valve_conclustion', {rules: []}]">
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
            <a-input v-decorator="['adjust_control_valve_witness', {rules: []}]" style="width:200px;" />
          </a-form-item>

          <br>
          <a-divider>电磁阀</a-divider>

          <!-- 电磁阀 -->
          <a-row>
            <a-col :span="6">
              <a-form-item label="动作">
                <a-input
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
          <a-divider>保位/切换阀</a-divider>

          <!-- 保位/切换阀 -->
          <a-row>
            <a-col :span="6">
              <a-form-item label="动作">
                <a-input
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
                  style="width:200px;"
                  v-decorator="[
                    'adjust_lockup_time',
                    {rules: []}
                  ]">
                  <a-select v-decorator="[ 'adjust_lockup_time_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
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

          <!-- 位置开关 -->
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

          <!-- 结论 -->
          <br>
          <a-divider>结论</a-divider>
          <a-form-item label="结论">
            <a-radio-group v-decorator="['adjust_conclustion', {rules: []}]">
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
            <a-input v-decorator="['adjust_witness', {rules: []}]" style="width:200px;" />
          </a-form-item>
          <a-divider>备注</a-divider>
          <a-form-item label="备注">
            <a-textarea :rows="5" v-decorator="['adjust_memo',{rules: []}]" />
          </a-form-item>
          <br><br>

          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="工时(min)">
                <a-input-number
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
        <a-button style="margin-left: 8px" @click="cancelSubmit" >取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br><br>

    <!-- 文件上传 -->
    <a-card :title="$t('menu.workOrder.upload.img')" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :QueueType="3" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" />

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
  'adjust_lockup_time_unit',
  'adjust_openposition_close_inputsig', 'adjust_openposition_close_percentage', 'adjust_openposition_break_inputsig', 'adjust_openposition_break_percentage',
  'adjust_closeposition_close_inputsig', 'adjust_closeposition_close_percentage', 'adjust_closeposition_break_inputsig', 'adjust_closeposition_break_percentage',
  'adjust_control_valve_witness', 'adjust_witness']

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

      if (editData.step_data.length > 0) {
        this.$nextTick(() => {
          const installIAData = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(installIAData, adjustFields))
          this.$refs.uploadImg.imgFileList = installIAData.uploads
          if (installIAData.inputSignalData) { this.inputSignalData = installIAData.inputSignalData }
          if (installIAData.deadBandData) { this.deadBandData = installIAData.deadBandData }
        })
      }

      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
      res.result.step_data.forEach(stepItem => {
        switch (stepItem.DataNum) {
          case 1: // baseInfo
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

            saveAdjustData(values).then(res => {
              // 清空数据
              this.$store.commit('SET_STEP_EDIT_DATA', null)
              // 刷新表格
              this.$router.push({ path: '/step/steplist' })
              this.$message.info('保存成功')

              // 重置表单数据
              this.form.resetFields()
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
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
        valveControlModel: 0
      }
    }
  }
</script>

<style>

</style>
