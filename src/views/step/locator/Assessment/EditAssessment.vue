<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card title="评估内容">
        <!-- 结论 -->
        <a-form-item label="评估内容">
          <a-textarea :disabled="not_applicable" :rows="5" v-decorator="['localtor_assessment_content',{rules: []}]" />
        </a-form-item>
      </a-card>

      <br>
      <a-card title="结论">
        <!-- 结论 -->
        <a-form-item label="结论">
          <a-textarea :disabled="not_applicable" :rows="5" v-decorator="['localtor_assessment_conclusion',{rules: []}]" />
        </a-form-item>
      </a-card>

      <br>

      <!-- 建议更换零件 -->
      <a-card title="建议更换零件" :headStyle="{fontWeight:'bold'}" >
        <!-- <a-descriptions title="">
              <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
              <a-descriptions-item label="合同号">{{ refData2.contract_serial }}</a-descriptions-item>
              <a-descriptions-item label="客户名称">{{ refData2.customer_name }}</a-descriptions-item>
              <a-descriptions-item label="执行机构型号"></a-descriptions-item>
              <a-descriptions-item label="阀门位号">{{ refData1.tag }}</a-descriptions-item>
              <a-descriptions-item label="序列号"></a-descriptions-item>
              <a-descriptions-item label="阀体型号"></a-descriptions-item>
            </a-descriptions>
            <a-divider style="margin-bottom: 32px">备件清单</a-divider> -->
        <a-row class="form-row" :gutter="16">
          <a-table
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
            :loading="memberLoading"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_key_number', 'purchased_part_number', 'purchased_part_name', 'purchased_part_qty', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
              <a-input
                :disabled="not_applicable"
                :key="col"
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                :placeholder="columnsPurchased[i].title"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{ text }}</template>
            </template>
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <template slot="operation" slot-scope="text, record">
              <template v-if="record.editable">
                <span v-if="record.isNew">
                  <a :disabled="not_applicable" @click="saveRow(record)">添加</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                    <a :disabled="not_applicable">删除</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a :disabled="not_applicable" @click="saveRow(record)">保存</a>
                  <a-divider type="vertical" />
                  <a :disabled="not_applicable" @click="cancel(record.key)">返回</a>
                </span>
              </template>
              <span v-else>
                <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                  <a :disabled="not_applicable">删除</a>
                </a-popconfirm>
              </span>
            </template>
          </a-table>
          <a-row>
            <a-col :span="24"><a-button :disabled="not_applicable" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
          </a-row>
        </a-row>
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
                  'localtor_assessment_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>
      <!-- 检测\维修 -->
      <a-card title="检测\维修" :headStyle="{fontWeight:'bold'}" >
        <a-form-item label="检测\维修">
          <a-radio-group :disabled="not_applicable" v-decorator="['localtor_repair_or_test', {rules: [{ required: true, message: '请选择定位器流程‘检测’或‘维修’'}]}]">
            <a-radio :value="1">
              检测
            </a-radio>
            <a-radio :value="2">
              维修
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-card>

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
  import { stepDone, saveStepPublic, getColumnsPurchased, queryStepDataOnlyread } from '@/api/step'
  import pick from 'lodash.pick'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const assessmentFields = ['localtor_assessment_content', 'localtor_assessment_conclusion', 'localtor_assessment_total_minute', 'localtor_repair_or_test']

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
        editable: true,
        isNew: true,
        dataPurchased: [],
        columnsPurchased: getColumnsPurchased(),
        memberLoading: false,
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
            values.purchased_parts = this.dataPurchased
            values.not_applicable = this.not_applicable

            saveStepPublic(values).then(res => {
              this.$message.info('保存成功')
            })
          }
        })
      },
      newPartMember () {
        const length = this.dataPurchased.length
        this.dataPurchased.push({
          key: length === 0 ? '1' : (parseInt(this.dataPurchased[length - 1].key) + 1).toString(),
          purchased_part_no: '',
          purchased_part_key_number: '',
          purchased_part_number: '',
          purchased_part_name: '',
          purchased_part_qty: '',
          purchased_part_memo: '',
          editable: true,
          isNew: true
        })
      },
      handleChange (value, key, column) {
        const newData = [...this.dataPurchased]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.dataPurchased = newData
        }
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
      },
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
        // })
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
      saveRow (record) {
        const { key } = record
        const target = this.dataPurchased.find(item => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      naChange (e) {
        this.not_applicable = e.target.checked
      }
    },
    mounted () {
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      this.showDispatchUser = true
      assessmentFields.forEach(v => this.form.getFieldDecorator(v))

      if (editData.step_data && editData.step_data.length > 0) {
        const assessmentData = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(assessmentData, assessmentFields))
        if (assessmentData.uploads) {
            this.$refs.uploadImg.imgFileList = assessmentData.uploads
        }
        this.not_applicable = assessmentData.not_applicable
        if (assessmentData.purchased_parts) {
          // 没有建议更换零件清单时加载(start) 步骤清单内容
          if (assessmentData.purchased_parts.length === 0) {
            queryStepDataOnlyread({ id: this.flowID, current_step: '(start)' }).then(res => {
              if (res.result.step_data && res.result.step_data.length > 0) {
                const tmpData = JSON.parse(res.result.step_data[0].JSON)
                this.dataPurchased = tmpData.valve_purchased_parts
              }
            })
          }
          this.dataPurchased = assessmentData.purchased_parts
        }
      }
    }
}
</script>

<style>

</style>
