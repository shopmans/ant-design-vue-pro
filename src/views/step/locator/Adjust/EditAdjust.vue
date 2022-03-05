<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="输入信号">
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
      </a-card>

      <br>

      <a-card title="死区">
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
                  'localtor_adjust_deadband_open_to_close',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'localtor_adjust_deadband_open_to_close_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
                  'localtor_adjust_deadband_close_to_open',
                  {rules: []}
                ]">
                <a-select v-decorator="[ 'localtor_adjust_deadband_close_to_open_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px" :allowClear="true">
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
                  'localtor_adjust_deadband_linearity',
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
                  'localtor_adjust_deadband_hysteresis',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>

      <a-card title="结论">
        <!-- 结论 -->
        <a-form-item label="结论">
          <a-textarea :disabled="not_applicable" :rows="5" v-decorator="['localtor_adjust_conclustion',{rules: []}]" />
        </a-form-item>
      </a-card>

      <br>
      <!-- 工时 -->
      <a-card title="工时" :headStyle="{fontWeight:'bold'}" >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'localtor_adjust_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg :disableAll="not_applicable" ref="uploadImg" :queueType="'3'" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import UploadImg from '../../modules/UploadImg'
  import { stepDone, saveStepPublic } from '@/api/step'
  import pick from 'lodash.pick'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import { getInputSignalColumns, getInputSignalData, getDeadBandColumns, getDeadBandData } from '@/api/adjust'

  const Fields = ['localtor_adjust_deadband_open_to_close', 'localtor_adjust_deadband_open_to_close_unit', 'localtor_adjust_deadband_close_to_open',
  'localtor_adjust_deadband_close_to_open_unit', 'localtor_adjust_deadband_linearity', 'localtor_adjust_deadband_hysteresis', 'localtor_adjust_conclustion',
  'localtor_adjust_total_minute']

export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      UploadImg,
      FooterToolBar,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        flowID: '',
        currentStep: '',
        repairData: {},
        inputSignalColumns: getInputSignalColumns(),
        inputSignalData: getInputSignalData(),
        deadBandColumns: getDeadBandColumns(),
        deadBandData: getDeadBandData(),
        not_applicable: false
      }
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
            values.deadBandData = this.deadBandData
            values.not_applicable = this.not_applicable

            saveStepPublic(values).then(res => {
              this.$message.info('保存成功')
            })
          }
        })
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
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
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
      naChange (e) {
        this.not_applicable = e.target.checked
      }
    },
    mounted () {
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      Fields.forEach(v => this.form.getFieldDecorator(v))

      if (editData.step_data && editData.step_data.length > 0) {
        this.adjustData = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(this.adjustData, Fields))
        if (this.adjustData.uploads) {
            this.$refs.uploadImg.imgFileList = this.adjustData.uploads
        }
        if (this.adjustData.inputSignalData) {
            this.inputSignalData = this.adjustData.inputSignalData
        }
        if (this.adjustData.deadBandData) {
            this.deadBandData = this.adjustData.deadBandData
        }
        this.not_applicable = this.adjustData.not_applicable
      }
    }
}
</script>

<style>

</style>
