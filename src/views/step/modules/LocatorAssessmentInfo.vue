<template>
  <div>
    <a-card :bordered="false" title="评估内容">
      <a-textarea disabled rows="5" v-model="assessmentData.localtor_assessment_content" />
    </a-card>

    <br>

    <a-card :bordered="false" title="结论">
      <a-textarea disabled rows="5" v-model="assessmentData.localtor_assessment_conclusion" />
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
      <a-table
        :columns="columnsPurchased"
        :dataSource="dataPurchased"
        :pagination="false"
      >
        <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_key_number', 'purchased_part_number', 'purchased_part_name', 'purchased_part_qty', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columnsPurchased[i].title"
          />
          <template v-else>{{ text }}</template>
        </template>
      </a-table>
    </a-card>

    <br>

    <a-card :bordered="false" title="工时">
      <a-descriptions :column="4">
        <a-descriptions-item label="工时">{{ assessmentData.localtor_assessment_total_minute }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="检测\维修">
      <a-descriptions :column="4">
        <a-descriptions-item label="检测维修">{{ getTestOrRepairUnit(assessmentData.localtor_repair_or_test) }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <br>

    <a-card :bordered="false" title="上传图片">
      <UploadImgRead ref="uploadImgRead" />
    </a-card>
  </div>
</template>

<script>
import UploadImgRead from '../modules/UploadImgRead'
import { getYesNoSwitchUnit, getABCSwitchUnit, getLocatorActuatorTypeUnit, getLocatorInstrumentModelUnit, getLocatorReceivedControlModeUnit,
getNESwitchUnit, getColumnsPurchased, getTestOrRepairUnit } from '@/api/step'

export default {
    components: {
        UploadImgRead
    },
    data () {
        return {
            assessmentData: {},
            dataPurchased: [],
            columnsPurchased: getColumnsPurchased()
        }
    },
    methods: {
      getYesNoSwitchUnit,
      getABCSwitchUnit,
      getLocatorActuatorTypeUnit,
      getLocatorInstrumentModelUnit,
      getLocatorReceivedControlModeUnit,
      getNESwitchUnit,
      getTestOrRepairUnit
    },
    mounted () {
      this.columnsPurchased.pop()
      if (this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
        this.$message.info('没有执行数据')
        this.$router.push({ path: '/step/steplist' })
        return
      }
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData

      this.assessmentData = JSON.parse(editData.step_data[0].JSON)
      if (this.assessmentData.uploads) {
          this.$refs.uploadImgRead.imgFileList = this.assessmentData.uploads
      }
      if (this.assessmentData.purchased_parts) {
        this.dataPurchased = this.assessmentData.purchased_parts
      }
  }
}
</script>

<style scoped>
</style>
