<template>
  <div>
    <a-card :bordered="false" title="执行信息">
      <a-descriptions title="">
        <a-descriptions-item label="执行人">{{ stepUser }}</a-descriptions-item>
        <a-descriptions-item label="结束日期">{{ stepDoneDate }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card :bordered="false">
      <a-descriptions title="收货">
        <a-descriptions-item label="收货日期">{{ receiptData.receipt_date | moment }}</a-descriptions-item>
        <a-descriptions-item label="序号">{{ receiptData.receipt_valve_factory_no }}</a-descriptions-item>
        <a-descriptions-item label="出入厂单据号码">{{ receiptData.receipt_valve_factory_no }}</a-descriptions-item>
        <a-descriptions-item label="工单号">{{ baseInfoData.work_order_serial }}</a-descriptions-item>
        <a-descriptions-item label="合同号">{{ projectData.contract_serial }}</a-descriptions-item>
        <a-descriptions-item label="客户名称">{{ projectData.customer_name }}</a-descriptions-item>
        <a-descriptions-item label="执行机构型号">{{ refActuData.actu_model }}</a-descriptions-item>
        <a-descriptions-item label="阀门位号">{{ baseInfoData.tag }}</a-descriptions-item>
        <a-descriptions-item label="序列号">{{ refVaveData.valve_serial }}</a-descriptions-item>
        <a-descriptions-item label="阀门型号">{{ refVaveData.valve_model }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="已购买备件清单">
        <a-divider style="margin-bottom: 32px">已购买备件清单</a-divider>
        <a-table
          :columns="columnsPurchased"
          :dataSource="dataPurchased"
          :pagination="false"
        >
          <template v-for="col in ['purchased_part_no', 'purchased_part_key_number', 'purchased_part_number', 'purchased_part_name', 'purchased_part_qty', 'purchased_part_memo']" :slot="col" slot-scope="text">
            <template>{{ text }}</template>
          </template>
          <template slot="purchased_confirm" slot-scope="text">
            <a-icon v-if="text === 'OK'" type="check" />
            <a-icon v-else type="close" />
          </template>
        </a-table>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script>
import { queryStepDataOnlyread, getReceiptPurchasedConfirm, getStepUser, formatDateYMD } from '@/api/step'

export default {
  data () {
    return {
        // 已购清单表
      columnsPurchased: getReceiptPurchasedConfirm(),
      dataPurchased: [],
      receiptData: {},
      refVaveData: {},
      refActuData: {},
      projectData: {},
      baseInfoData: {},
      stepUser: '',
      stepDoneDate: ''
    }
  },
  mounted () {
    if (!this.$store.state.editStepData.stepEditData || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
      this.$message.warning('当前流程没有保存数据')
      return
    }
    const stepData = this.$store.state.editStepData.stepEditData
    this.projectData = this.$store.state.editStepData.stepEditData.project
    this.receiptData = JSON.parse(this.$store.state.editStepData.stepEditData.step_data[0].JSON)
    this.stepUser = getStepUser(stepData.users)
    this.stepDoneDate = formatDateYMD(stepData.step_done_date)

    queryStepDataOnlyread({ id: stepData.flow_id, current_step: '(start)' }).then(res => {
      res.result.step_data.forEach(e => {
        // 取引用数据
        switch (e.DataNum) {
          case 1: // baseInfo
            this.baseInfoData = JSON.parse(e.JSON)
            // 采购清单确认信息
            this.dataPurchased = this.baseInfoData.valve_purchased_parts
            if (this.dataPurchased && this.dataPurchased.length <= 0) { break }
            this.dataPurchased.forEach(e => {
              this.receiptData.receipt_parts.forEach(k => {
                if (e.key === k.key) {
                  if (k.check) {
                    e.purchased_confirm = 'OK'
                  } else {
                    e.purchased_confirm = ''
                  }
                }
              })
            })
            break
          case 2: // 阀
            this.refVaveData = JSON.parse(e.JSON)
            break
          case 3: // 执行机构
            this.refActuData = JSON.parse(e.JSON)
            break
        }
      })
    })

    // getReferenceReceipt({ FlowID: this.receiptData.flow_id }).then(res => {
    //     this.referenceData = JSON.parse(res.data[0])
    //     console.log(this.referenceData)
    // })
  }
}
</script>

<style>

</style>
