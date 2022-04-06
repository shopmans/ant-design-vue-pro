<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <!-- 派员 -->
      <a-card title="执行人" :headStyle="{fontWeight:'bold'}">
        <dispatchUser v-if="showDispatchUser" :disableAll="disableAll" :flowID="flow_id" :currentStep="current_step" :flag="'1'" />
        <a-row :gutter="8">
          <a-col :span="4">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="disableAll"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'work_time',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="收货日期">
              <a-date-picker
                :disabled="disableAll"
                style="width:100%;"
                :format="'YYYY-MM-DD'"
                v-decorator="[
                  'receipt_date',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <br>

      <a-card title="收货" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-descriptions title="">
          <a-descriptions-item label="序号">{{ refData1.serial_number }}</a-descriptions-item>
          <a-descriptions-item label="出入厂单据号码">{{ refData1.receipt_number }}</a-descriptions-item>
          <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
          <a-descriptions-item label="合同号">{{ refData2.contract_serial }}</a-descriptions-item>
          <a-descriptions-item label="客户名称">{{ refData2.customer_name }}</a-descriptions-item>
          <a-descriptions-item label="执行机构型号">{{ actuRefData.actu_model }}</a-descriptions-item>
          <a-descriptions-item label="阀门位号">{{ refData1.tag }}</a-descriptions-item>
          <a-descriptions-item label="序列号">{{ valveRefData.valve_serial }}</a-descriptions-item>
          <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
      </a-card>
      <br>

      <!-- 已购买备件清单 -->
      <a-card title="已购买备件清单" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row class="form-row" :gutter="16">
          <a-table
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
            :loading="memberLoading"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_key_number', 'purchased_part_number', 'purchased_part_name', 'purchased_part_qty', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
              <a-input
                :disabled="disableAll"
                :key="col"
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                :placeholder="columnsPurchased[i].title"
              />
              <template v-else>{{ text }}</template>
            </template>
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <template slot="operation" slot-scope="record">
              <a-checkbox :disabled="disableAll" @change="onChange" :value="record" :default-checked="record.checked" />
            </template>
          </a-table>
        </a-row>
      </a-card>
      <!-- 文件上传 -->
      <br>
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <UploadImg ref="uploadImg" :disableAll="disableAll" :queueType="'3'" :isMobile="isMobile" />
      </a-card>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="current_step" :flowId="flow_id" />
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import { saveReceipt } from '@/api/receipt'
import { stepDone, queryStepData, getColumnsPurchased } from '@/api/step'
import selectUser from '../../modules/SelectUser'
import pick from 'lodash.pick'
import stepDetail from '../../modules/StepBaseInfo'
import stepAllDetailModel from '../../modules/StepAllDetailModel'
import dispatchUser from '../../modules/DispatchUser'
import UploadImg from '../../modules/UploadImg'
import moment from 'moment'

  const receiptFields = ['receipt_date', 'receipt_valve_serial', 'receipt_valve_factory_no', 'work_order_serial',
  'contract_serial', 'customer_name', 'valve_serial', 'not_applicable', 'work_time']

export default {
  name: 'ReceiptForm',
  mixins: [baseMixin],
  components: {
    selectUser,
    FooterToolBar,
    baseMixin,
    stepDetail,
    stepAllDetailModel,
    dispatchUser,
    UploadImg
  },
  data () {
    return {
      form: this.$form.createForm(this),
      memberLoading: false,
      flow_id: '',
      current_step: '',
      baseInfoData: null,
      refData1: {},
      refData2: {},
      valveRefData: {},
      actuRefData: {},
      // 已购清单表
      columnsPurchased: getColumnsPurchased(),
      dataPurchased: [],
      receiptPurchased: [],
      showDispatchUser: false,
      not_applicable: false,
      disableAll: false
    }
  },
  mounted () {
    const editData = this.$store.state.editStepData.stepEditData
    this.flow_id = editData.flow_id
    this.current_step = editData.current_step
    // 防止表单未注册
    receiptFields.forEach(v => this.form.getFieldDecorator(v))
    this.showDispatchUser = true
    // 供flutter刷新上传文件列表
    window.refreshUploads = this.refreshUploads

    // 读baseinfo
    queryStepData({ id: this.flow_id, current_step: '(start)' }).then(res => {
      this.refData2 = res.result.project
      this.form.setFieldsValue(pick(editData.project, receiptFields))
      let receiptData = {}
      if (editData.step_data.length > 0) {
        receiptData = JSON.parse(editData.step_data[0].JSON)
        this.$refs.uploadImg.imgFileList = receiptData.uploads
        // 填充日期
        if (!receiptData.receipt_date || receiptData.receipt_date.indexOf('0001-') >= 0) {
          this.form.setFieldsValue(pick({ 'receipt_date': moment(new Date()).format('YYYY-MM-DD') }, 'receipt_date'))
        }
      } else {
        receiptData.receipt_parts = []
      }

      this.form.setFieldsValue(pick(receiptData, receiptFields))
      this.not_applicable = receiptData.not_applicable
      this.disableAll = receiptData.not_applicable

      res.result.step_data.forEach(e => {
        // 查找 baseinfo
        if (e.DataNum === 1) {
          this.refData1 = JSON.parse(e.JSON)
          // 采购清单加checked属性
          this.dataPurchased = this.refData1.valve_purchased_parts
          this.dataPurchased.forEach(e => {
            receiptData.receipt_parts.forEach(k => {
              if (e.key === k.key) {
                e.checked = k.check
              }
            })
            // 初始化 receiptPurchased
            this.receiptPurchased.push({
              key: e.key,
              check: e.checked
            })
          })
        }
        // 查找阀
        if (e.DataNum === 2) {
          this.valveRefData = JSON.parse(e.JSON)
        }
        // 执行机构
        if (e.DataNum === 3) {
          this.actuRefData = JSON.parse(e.JSON)
        }
      })
    })

    // 查询引用数据
    // getReferenceReceipt({ FlowID: editData.flow_id }).then(res => {
    //   this.refData1 = JSON.parse(res.data[1])
    //   this.form.setFieldsValue(pick(editData.project, receiptFields))

    //   if (editData.step_data.length > 0) {
    //     // 采购列表
    //     const receiptData = JSON.parse(editData.step_data[0].JSON)
    //     this.dataPurchased = receiptData.receipt_parts
    //     // 加key值
    //     var key = 1
    //     this.dataPurchased.forEach(e => {
    //       e.key = key
    //       key++
    //     })
    //     this.$nextTick(() => {
    //       this.form.setFieldsValue(pick(receiptData, receiptFields))
    //     })
    //   }
    // })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.flow_id = this.flow_id
          values.receipt_parts = this.receiptPurchased
          values.receipt_user_id = this.$store.state.user.info.id
          values.uploads = this.$refs.uploadImg.imgFileList
          values.not_applicable = this.not_applicable

          saveReceipt(values).then(res => {
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
    handleStepDone () {
      const letThis = this
      this.$confirm({
        title: '结束流程',
        content: '确定要结束流程？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          stepDone({ id: letThis.flow_id, current_step: letThis.current_step }).then(res => {
              // 刷新表格
              letThis.$message.info('结束流程成功')
              letThis.$router.push({ path: '/step/steplist' })
          })
        }
      })
    },
    handleStepDetail () {
      this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
    },
    onChange (e) {
      const { key } = e.target.value
      const rpItem = this.receiptPurchased.find(e => e.key === key)

      if (rpItem) {
        rpItem.check = e.target.checked
      } else {
        this.receiptPurchased.push({
          key: key,
          check: e.target.checked
        })
      }
    },
    refreshUploads () {
      queryStepData({ id: this.flow_id, current_step: this.current_step }).then(res => {
        if (res.result.step_data && res.result.step_data.length > 0) {
          const tmpData = JSON.parse(res.result.step_data[0].JSON)
          this.$refs.uploadImg.imgFileList = tmpData.uploads
          this.$message.info('上传照片成功')
        }
      })
    },
    naChange (e) {
      this.not_applicable = e.target.checked
      this.disableAll = e.target.checked
    }
  }
}

</script>

<style scoped>
.linehight {
  line-height: 20px;
  padding: 0;
  margin:0
}

</style>
