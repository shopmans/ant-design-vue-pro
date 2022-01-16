<template>
  <div>
    <a-card title="维修前诊断" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="序列号">{{ valveRefData.valve_serial }}</a-descriptions-item>
        <a-descriptions-item label="出入厂单据号码">{{ refData1.receipt_number }}</a-descriptions-item>
        <a-descriptions-item label="工单号">{{ refData1.work_order_serial }}</a-descriptions-item>
        <a-descriptions-item label="合同号">{{ refData2.contract_serial }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ refData2.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ valveRefData.valve_model }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>
    <a-card title="" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <a-descriptions title="">
        <a-descriptions-item label="诊断日期">{{ preDiagData.diag_date | formatDate }}</a-descriptions-item>
        <a-descriptions-item label="工时(min)">{{ preDiagData.work_time }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>
    <a-card title="适用" :headStyle="{fontWeight:'bold'}">
      <a-descriptions :column="4">
        <a-descriptions-item label="不适用" v-if="preDiagData.not_applicable">
          是
        </a-descriptions-item>
        <a-descriptions-item label="不适用" v-if="!preDiagData.not_applicable">
          否
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>
    <!-- 上传图片 -->
    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
    <br>
    <a-card :bordered="false" title="上传诊断报告">
      <UploadFileRead ref="uploadRead" />
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import UploadFileRead from '../modules/UploadFileRead'
import { queryStepData } from '@/api/step'
import UploadImgRead from '../modules/UploadImgRead'

export default {
  components: {
    UploadFileRead,
    UploadImgRead
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    this.preDiagData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.flowID = this.$store.state.editStepData.stepEditData.flow_id
    this.preDiagData.uploads.forEach(e => {
      if (e.queue_type === '3') {
        this.$refs.uploadImgRead.imgFileList.push(e)
      }
      if (e.queue_type === '1') {
        this.$refs.uploadRead.fileLists.push(e)
      }
    })

    queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
      this.refData2 = res.result.project
      res.result.step_data.forEach(e => {
        // 查找 baseinfo
        if (e.DataNum === 1) {
          this.refData1 = JSON.parse(e.JSON)
        }
        // 查找阀
        if (e.DataNum === 2) {
          this.valveRefData = JSON.parse(e.JSON)
        }
      })
    })
  },
  data () {
    return {
      flowID: '',
      refData1: {},
      refData2: {},
      valveRefData: {},
      preDiagData: {}
    }
  },
  filters: {
    formatDate (val) {
      return moment(val).zone('+08:00').format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
